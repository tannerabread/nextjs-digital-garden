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
