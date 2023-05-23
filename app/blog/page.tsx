import Link from "next/link";
import { MetaData, convertDate, getAllPostsMeta } from "@/lib/posts";

export default async function Blog() {
  const posts: MetaData[] = await getAllPostsMeta();

  if (!posts) return <div>Loading...</div>;

  return (
    <main>
      <h1>All Blog Posts</h1>
      <ul>
        {posts.map((post: MetaData) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <h2>{post.title}</h2>
              <p>
                {post.author} - {convertDate(post.date)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
