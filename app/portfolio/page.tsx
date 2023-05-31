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
      <h1>GitHub Stats</h1>
      <div className="inline-container">
        <Link href="https://github.com/tannerabread?tab=followers">
          Followers: {followers}
        </Link>
        <Link href="https://github.com/tannerabread?tab=following">
          Following: {following}
        </Link>
      </div>
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
