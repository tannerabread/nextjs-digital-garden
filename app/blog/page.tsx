import Link from "next/link";
import { getSortedPostsData, PostData } from "@/lib/posts";

export default function Blog() {
  const posts: PostData[] = getSortedPostsData();

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
