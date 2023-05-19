import { notFound } from "next/navigation";
import { getSortedPostsData, PostData } from "@/lib/posts";
import { SocialShare } from "@/components/SocialShare";

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log({ id })
  const posts: PostData[] = await getSortedPostsData();
  const post = posts.find(
    (post) => post.id === id
  ) as PostData;

  if (!posts) return <div>Loading...</div>;
  if (!post) { notFound() }

  const { title, author, date, content } = post;

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
      <SocialShare url={`https://bannon.cloud/blog/${id}`} title={title} />
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
