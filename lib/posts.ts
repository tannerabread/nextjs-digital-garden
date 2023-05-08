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
