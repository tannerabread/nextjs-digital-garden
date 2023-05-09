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
  return allPostsData
    .sort((a: PostData, b: PostData) => {
      return a.date < b.date ? 1 : -1;
    })
    .map((post: PostData) => {
      const convertedDate: string = new Date(post.date).toLocaleString();
      return {
        ...post,
        date: convertedDate,
      };
    });
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
