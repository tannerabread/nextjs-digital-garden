---
title: Create a Fully Functional Next.js Digital Garden - Part 3 - Syntax Highlighting and Basic Styling
date: May 9, 2023
author: Bannon Tanner
---

## Introduction

After the previous post, several issues were identified with the blog app, such as rendering errors in the console, displaying all blog posts on every individual blog page, lacking custom styling, and an overall unpolished appearance due to the absence of applied default styling.


## Transitioning to Remark

To resolve the rendering errors in the console, a switch from the `react-markdown` package to the `remark` library was made. This change required some refactoring of the application and the introduction of new dependencies.

```bash
npm install remark remark-html
```

Rather than transforming the markdown string within the posts dynamic file, the application will now convert it directly within the posts utility function, returning a string of properly formatted HTML.

The three remark packages ()`remark`, `remark-html`, and `remark-gfm`) should be imported into the `lib/posts.ts` file. Subsequently, a new function, `convertContentToHtml`, should be added to the bottom of the file:

```ts
// lib/posts.ts

import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

// ...

function convertContentToHtml(content: string): string {
  return remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .processSync(content)
    .toString();
}
```

This new function can be employed to convert the markdown content prior to returning it. The returned `postData` should be updated to include the converted content.

```ts
// lib/posts.ts

// ...
// parse the post front-matter
const { data, content } = matter(fileContents);
const convertedContent: string = convertContentToHtml(content);

const postData: PostData = {
  id,
  date: data.date,
  ...data,
  content: convertedContent,
};

return postData;
// ...
```

As the utility function now returns a formatted HTML string instead of a markdown string, an adjustment to the dynamic posts page is required.

The imports for `react-markdown` and `remark-gfm` should be removed from the dynamic page. Additionally, the `<ReactMarkdown ...` line of the JSX should be replaced with the following:

```ts
// app/blog/[id]/page.tsx

<div dangerouslySetInnerHTML={{ __html: content }}></div>
```

With these changes, the application will no longer display console rendering errors, allowing for the continued development of additional features.


## Adding Styling

To enhance the aesthetic appeal of the blog application, a simple dark theme [available on GitHub](https://gist.github.com/ZachSaucier/8295d9dc926d7064ff0d4f3f04b35b55) will be incorporated. This will involve replacing the default global styles and refining the styling throughout the project. The complete contents of the CSS file will not be replicated here, but the following additions should be made:

```css
.main {
  max-width: 768px;
  margin: 0 auto;
  padding 20px 0;
}

pre {
  overflow-x: scroll;
  padding: 10px;
}

code {
  font-weight: 700;
}
```

These modifications will apply basic styling at a global level. However, the dynamic blog page requires the application of additional styles from the CSS.

Alter the return statement of the `Post` component to incorporate a few classNames from the CSS and remove the placeholder classNames added previously:

```ts
// app/blog/[id]/page.tsx

return (
  <div key={id} className="main">
    <h1>{title}</h1>
    <h3>
      {author} - {date}
    </h3>
    <div
      className="simple-container"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  </div>
);
```

As the `react-markdown` package is no longer used, it can be safely removed.

```bash
npm remove react-markdown
```


## Implementing Syntax Highlighting

To improve the reading experience and make the code examples more visually appealing, syntax highlighting will be added using `remark-shiki` and [`shiki`](https://github.com/shikijs/shiki). Install and import the dependencies, then add the plugin to the remark function chain in the `convertContentToHtml` function within the posts utility file.

```bash
npm install remark-shiki shiki
```

```ts
// lib/posts.ts

// ...other imports
import * as shiki from "shiki";
import withShiki from "@stefanprobst/remark-shiki";

// ...

function convertContentToHtml(content: string): string {
  const highlighter = await shiki.getHighlighter({ theme: "dracula-soft" });

  return remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .use(withShiki, { highlighter })
    .processSync(content)
    .toString();
}
```

The text editor should immediately start complaining because the `getHighlighter` function is asynchronous and the convert function is not. This forces the conversion of functions in this file to asynchronous ones, returning [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). This will involve refactoring the `getSortedPostsData` function and `convertContentToHtml` function.

```ts
// lib/posts.ts

// ...imports and interface

export async function getSortedPostsData(): Promise<PostData[]> {
  // read files from /app/posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsDataPromises: Promise<PostData>[] = fileNames.map(
    async (fileName: string) => {
      const id: string = fileName.replace(/\.md$/, "");

      // read markdown file as string
      const fullPath: string = path.join(postsDirectory, fileName);
      const fileContents: string = fs.readFileSync(fullPath, "utf8");

      // parse the post front-matter
      const { data, content } = matter(fileContents);
      const convertedContent: string = await convertContentToHtml(content);

      const postData: PostData = {
        id,
        date: data.date,
        ...data,
        content: convertedContent,
      };

      return postData;
    }
  );

  // wait for all promises to resolve
  const allPostsData = await Promise.all(allPostsDataPromises);

  // sort posts by date
  return allPostsData.sort((a: PostData, b: PostData) =>
    a.date < b.date ? 1 : -1
  );
}

async function convertContentToHtml(content: string): Promise<string> {
  const highlighter = await shiki.getHighlighter({ theme: "dracula-soft" });

  return remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .use(withShiki, { highlighter })
    .processSync(content)
    .toString();
}
```

This modification also necessitates converting all calls to the `getSortedPostsData` function to asynchronous ones. Transform any components that are not already asynchronous and use `await` when calling the function. In the dynamic `Post` component, the `generateStaticParams` function, and the `Blog` component, alter the call as follows:

```diff
- const posts: PostData[] = getSortedPostsData();
+ const posts: PostData[] = await getSortedPostsData();
```

Now any code rendered in a blog post will be highlighted with an eye-catching ["dracula-soft" syntax highlighting](https://draculatheme.com/visual-studio-code).


## Fixing Dynamic Page

Previously, the dynamic page was mapping through all posts and displaying them in reverse-date order simultaneously. The code has been updated to find the desired post based on the `id` returned from `generateStaticParams`. 

Additionally, it is helpful to destructure the desired properties in the dynamic posts page. As such, the `PostData` type has been refined, with more properties added for improved typing in both the dynamic page and the posts utility function.

Following these changes, the completed components and utility function should appear as follows:

```ts
// lib/posts.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import * as shiki from "shiki";
import withShiki from "@stefanprobst/remark-shiki";

const postsDirectory: string = path.join(process.cwd(), "public/posts");

export interface PostData {
  id: string;
  title: string;
  author: string;
  date: string;
  [key: string]: any;
  content: string;
}

export async function getSortedPostsData(): Promise<PostData[]> {
  // read files from /app/posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsDataPromises: Promise<PostData>[] = fileNames.map(
    async (fileName: string) => {
      const id: string = fileName.replace(/\.md$/, "");

      // read markdown file as string
      const fullPath: string = path.join(postsDirectory, fileName);
      const fileContents: string = fs.readFileSync(fullPath, "utf8");

      // parse the post front-matter
      const { data, content } = matter(fileContents);
      const convertedContent: string = await convertContentToHtml(content);

      const postData: PostData = {
        id,
        title: data.title,
        author: data.author,
        date: data.date,
        ...data,
        content: convertedContent,
      };

      return postData;
    }
  );

  // wait for all promises to resolve
  const allPostsData = await Promise.all(allPostsDataPromises);

  // sort posts by date
  return allPostsData.sort((a: PostData, b: PostData) =>
    a.date < b.date ? 1 : -1
  );
}

async function convertContentToHtml(content: string): Promise<string> {
  const highlighter = await shiki.getHighlighter({ theme: "dracula-soft" });

  return remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .use(withShiki, { highlighter })
    .processSync(content)
    .toString();
}

```

```ts
// app/blog/[id]/page.tsx

import { getSortedPostsData, PostData } from "@/lib/posts";

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = params;
  const posts: PostData[] = await getSortedPostsData();
  const { title, author, date, content } = posts.find(
    (post) => post.id === id
  ) as PostData;

  if (!posts) return <div>Loading...</div>;

  return (
    <div key={id} className="main">
      <h1>{title}</h1>
      <h3>
        {author} - {date}
      </h3>
      <div
        className="simple-container"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}

// generate route segments
export async function generateStaticParams() {
  const posts: PostData[] = await getSortedPostsData();

  return posts.map((post) => ({
    id: post.id,
  }));
}

```

```ts
// app/blog/page.tsx

import Link from "next/link";
import { getSortedPostsData, PostData } from "@/lib/posts";

export default async function Blog() {
  const posts: PostData[] = await getSortedPostsData();

  return (
    <main>
      <h1>All Blog Posts</h1>
      <ul>
        {posts.map(({ id, title, author, date }) => (
          <li key={id}>
            <Link href={`/blog/${id}`}>
              <h2>{title}</h2>
              <p>{author} - {date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
```


## Conclusion

In summary, a series of enhancements were made to the blog application. First, the react-markdown package was replaced with the remark library, resolving console rendering errors and streamlining the markdown conversion process. Next, a simple dark theme was applied to improve the overall aesthetics, and the project underwent a CSS refactoring process. Subsequently, syntax highlighting was introduced via remark-shiki and shiki to make code examples more visually appealing. Lastly, the dynamic page was adjusted to display the desired post based on the returned ID from generateStaticParams, and the PostData type was refined for better typing.

These improvements have not only elevated the visual appearance and functionality of the blog application but have also laid a solid foundation for future development and feature additions.

Check out the [current state of the project](https://bannon.cloud/blog) and the [repository](https://github.com/tannerabread/nextjs-digital-garden).