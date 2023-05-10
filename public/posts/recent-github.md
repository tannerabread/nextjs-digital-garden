---
title: Create a Fully Functional Next.js Digital Garden - Part 6 - GitHub Activity Tracking
date: 2023-05-10T15:26:00-05:00
author: Bannon Tanner
---

## Introduction

This post will outline the process of tracking recent GitHub activity on the portfolio page and adding links to open source contributions.

## Adding GitHub Information to the Portfolio Page

The portfolio page will leverage [`async`/`await` in Server Components](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#asyncawait-in-server-components) and [dynamic data fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#dynamic-data-fetching) to obtain the repositories on each request.

The GitHub [GraphQL API](https://docs.github.com/en/graphql) will be employed to return the last 10 updated repositories. As authentication is required, a [personal access token for GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token) must be generated, and [environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) configured.

Additionally, the following code should be added to `.gitignore`:

```sh
# env
.env*
```

Opting for GraphQL will yield superior results over the REST API. To explore the GitHub GraphQL API, try the [Apollo GraphQL Sandbox](https://studio.apollographql.com/sandbox/explorer?) and insert the previously generated personal access token into the `Authorization` header as "Bearer <access_token>" using the endpoint "https://api.github.com/graphql".

Upon completion, the portfolio page code should resemble the following:

```ts
// app/portfolio/page.tsx

import Link from "next/link";

interface ghRepo {
  name: string;
  url: string;
  updatedAt: string;
}
interface ghResponse {
  followers: number;
  following: number;
  repos: ghRepo[];
}

export default async function Portfolio() {
  const response = await getGithub();
  const { followers, following, repos } = response;

  return (
    <div>
      <h1>Portfolio</h1>
      <h2>Recently Updated GitHub Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.name}>
            <Link href={repo.url} target="_blank" rel="noopener noreferrer">
              {repo.name} - {String(new Date(repo.updatedAt).toLocaleString())}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Open Source Contributions</h2>
      <div>
        <Link href="https://github.com/issues?q=is%3Aopen+is%3Aissue+author%3Atannerabread+archived%3Afalse+">
          Created Issues
        </Link>
      </div>
      <div>
        <Link href="https://github.com/issues?q=is%3Aopen+is%3Aissue+assignee%3Atannerabread+archived%3Afalse+">
          Assigned Issues
        </Link>
      </div>
      <div>
        <Link href="https://github.com/issues?q=is%3Aopen+is%3Aissue+mentions%3Atannerabread+archived%3Afalse+">
          Mentioned Issues
        </Link>
      </div>
    </div>
  );
}

async function getGithub(): Promise<ghResponse> {
  const query = `query GetGitHub($login: String!, $orderBy: RepositoryOrder, $first: Int, $ownerAffiliations: [RepositoryAffiliation]) {
    user(login: $login) {
      login
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(orderBy: $orderBy, first: $first, ownerAffiliations: $ownerAffiliations) {
        nodes {
          name
          url
          updatedAt
        }
      }
    }
  }`;
  const variables = {
    login: "tannerabread",
    orderBy: {
      field: "UPDATED_AT",
      direction: "DESC",
    },
    first: 10,
    ownerAffiliations: ["OWNER"],
  };

  const response = await fetch("https://api.github.com/graphql", {
    cache: "no-store",
    method: "POST",
    headers: {
      // Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();

  return {
    followers: data.data.user.followers.totalCount,
    following: data.data.user.following.totalCount,
    repos: data.data.user.repositories.nodes,
  };
}
```


## Updating Styling for Links

As hyperlinks are now present in multiple locations on the website, it is crucial to improve their appearance.

To achieve this, remove bullet points and padding from the `ul` elements, and eliminate text decoration from `a` elements.

```css
/* app/globals.css */

a[href] {
  text-decoration: none;
}

ul {
  list-style-type: none;
  padding-left: 0;
}
```


## Add Environment Variables to Vercel via CLI

For the GitHub fetch to work in the production application, the environment variables must be added to Vercel. This is simple to do through the Vercel CLI:

```bash
vercel env add
```

This command will prompt for the environment variable name (`GITHUB_TOKEN`), the value, and which environments it should be added to. For this feature, the variable has been added to all environments.

Push the recent developments to GitHub to auto-deploy to Vercel:

```bash
git add .
git commit -m "added github repository and contribution information"
git push
```


## Conclusion

This blog post has explored the use of the GitHub GraphQL API to track recent GitHub activity and provide links to open source contributions. The fetch API was employed without caching results to ensure that data fetching occurs with each page request, thus providing the most up-to-date information. The use of Vercel environment variables, configured via the Vercel CLI, ensured the secure handling of sensitive data such as the GitHub personal access token. Enhancements in the styling of hyperlinks across the website have further improved user experience.

Explore the [current state of the project](https://bannon.cloud/blog) and the [repository](https://github.com/tannerabread/nextjs-digital-garden).
