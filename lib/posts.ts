import fs from "fs";
import path from "path";

export interface MetaData {
  [key: string]: any;
}

const postsDirectory: string = path.join(process.cwd(), "app/blog/posts");
const fileNames: string[] = fs.readdirSync(postsDirectory);

export async function getPageData(id: string): Promise<MetaData> {
  const { meta } = require(`@/app/blog/posts/${id}`);
  const postData: MetaData = {
    meta: { ...meta, id: id.replace(/\.mdx/, "") },
  };
  return postData;
}

export async function getAllPostsMeta(): Promise<MetaData[]> {
  let posts = [];

  for (const file of fileNames) {
    const { meta } = await getPageData(file);
    posts.push(meta);
  }
  posts.sort((a: MetaData, b: MetaData) => {
    return a.date < b.date ? 1 : -1;
  });
  return posts;
}

export function convertDate(date: string): string {
  return new Date(date).toDateString();
}
