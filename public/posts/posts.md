---
title: Create a Fully Functional Next.js Digital Garden - Part 2 - Markdown Blog
date: May 8, 2023
author: Bannon Tanner
---

## Introduction

In order to develop and document this project incrementally, incorporating a blog is essential. To seamlessly integrate a blog into the Next.js application, several infrastructure components are necessary, including a folder for storing markdown files, a page listing all blog posts, a slug for displaying individual posts, and a utility function for converting markdown files into a browser-readable format.

Upon completion of this step, the application's folder structure and associated files should resemble the following:

```
digital-garden/
|-- app/
|   |-- blog/
|       |-- [id]/
|           |-- page.tsx
|       |-- page.tsx
|   |-- layout.tsx
|   |-- page.tsx
|-- lib/
|   |-- posts.ts
|-- public/
|   |-- posts/
```

Next.js leverages folders to define URL routes, which simplifies routing in comparison to a standard React application. URL segments directly correspond to the folder structure. For instance, to create a route such as `<your-domain>.com/some/nested/route`, you would simply define a nested folder structure to match.

This application utilizes the Next.js `app` router, meaning that any folders within in the `app` folder will route to a URL route as long as a `page.tsx` file is associated with them. The `page.tsx` file is what renders the route publicly accessible.

The above folder structure will generate home (`/`), blog (`/blog`), and individual blog posts (`/blog/[id]`) routes. The `/blog/[id]` route is dynamic and will display a page for every post that matches the route.


## Developing the Utility Function

First, the application requires a utility function to fetch all static posts from the server. Create a `lib` folder and a `posts.ts` file:

```bash
mkdir lib
touch lib/posts.ts
```

Utilize the [Node.js Runtime](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes#nodejs-runtime) to read static files from the project using Node.js APIs. The utility function will return a list of all raw markdown files found on the server, along with metadata for each.

Install the `gray-matter` package to convert front-matter into data that can be sent back with the post data.

```bash
npm install gray-matter
```

The posts utility function will retrieve all posts from the server, along with their metadata, and return that information to the caller.

```ts
// lib/posts.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory: string = path.join(process.cwd(), "public/posts");

export interface PostData {
  id: string;
  date: string;
  [key: string]: any;
  content: string;
}

export function getSortedPostsData(): PostData[] {
  // read files from /app/posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames.map((fileName: string) => {
    const id: string = fileName.replace(/\.md$/, "");

    // read markdown file as string
    const fullPath: string = path.join(postsDirectory, fileName);
    const fileContents: string = fs.readFileSync(fullPath, "utf8");

    // parse the post front-matter
    const { data, content } = matter(fileContents);

    const postData: PostData = {
      id,
      date: data.date,
      ...data,
      content,
    };

    return postData;
  });

  // sort posts by date
  return allPostsData.sort((a: PostData, b: PostData) =>
    a.date < b.date ? 1 : -1
  );
}

```

With this implementation, the application can now access files within the `posts` directory and efficiently organize them by the date specified in each posts's metadata.


## Implementing Posts Homepage and Dynamic Posts Pages

The project necessitates the creation of routes for both the posts homepage and a dynamic route that corresponds to individual posts.

```bash
mkdir app/blog
mkdir app/blog/\[id\]
touch app/blog/page.tsx
touch app/blog/\[id\]/page.tsx
```

The post utility function facilitates the generation of all existing posts during the build process. This information can be utilized to render the posts homepage more rapidly.

```ts
// app/blog/page.tsx

import Link from "next/link";
import { getSortedPostsData, PostData } from "@/lib/posts";

export default function Blog() {
  const posts: PostData[] = getSortedPostsData();

  return (
    <main>
      <h1>My Blog Homepage</h1>
      <ul>
        {posts.map(({ id, title, date }) => (
          <li key={id}>
            <Link href={`/blog/${id}`}>
              <h2>{title}</h2>
              <p>{date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

```

To test this functionality, create a new folder within the public directory and a file to hold some sample markdown.

```bash
mkdir public/posts
touch public/posts/test.md
```

```md
---
title: Test Post
date: May 8, 2023
author: Test Author
---

# Test Post Title

Hello from markdown

```js
test.code.block();
```

Note that 3 additional backticks should be added at the end of that code block to end the block.

The [posts homepage](`http://localhost:3000/blog`) will display the title, date, and author of the copied post.

The application now requires a method to showcase individual posts and convert the markdown content into HTML. By implementing a dynamic route, a single function can be written to accommodate every post. Utilize `react-markdown` and `react-gfm` to transform the markdown into HTML while incorporating GitHub flavored markdown features. The `generateStaticParams` function can be employed to process a list of potential routes and generate dynamic segments during the build phase.

```ts
// app/blog/[id]/page.tsx

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSortedPostsData, PostData } from "@/lib/posts";

export default function Post() {
  const posts: PostData[] = getSortedPostsData();

  if (!posts) return <div>Loading...</div>;

  return posts.map(({ id, title, author, date, content }) => (
    <div key={id}>
      <h1 className="post-title">{title}</h1>
      <h3 className="post-byline">
        {author} - {date}
      </h3>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  ));
}

// generate route segments
export async function generateStaticParams() {
  const posts = getSortedPostsData();

  return posts.map((post) => ({
    id: post.id,
  }));
}

```

Push the changes to the repository to trigger the Vercel build process and update the deployed production application.

```bash
git add .
git commit -m "added blog functionality"
git push
```


## Conclusion

This post focused on the integration of a markdown blog into our digital garden. By setting up a well-organized folder structure, implementing a utility function, and designing a dynamic route page, the application is now capable of rendering a blog homepage and individual blog posts. The use of GitHub flavored markdown features further enhances the readability and overall aesthetics of the blog posts. With this foundation in place, you are now equipped to develop and expand your Next.js digital garden, tailoring it to your specific needs and preferences.
