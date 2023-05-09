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
