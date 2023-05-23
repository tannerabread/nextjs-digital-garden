import dynamic from "next/dynamic";
import { convertDate, getAllPostsMeta, getPageData } from "@/lib/posts";
import { SocialShare } from "@/components/SocialShare";

export default async function Post({ params }: { params: { id: string } }) {
  const { id } = params;

  const { meta } = await getPageData(`${id}.mdx`);
  const { title, author, date } = meta;
  const convertedDate = convertDate(date);

  const Post = dynamic(() => import(`../posts/${id}.mdx`));

  if (!Post) return <div>Loading...</div>;

  return (
    <div key={id}>
      <h1>{title}</h1>
      <h3>
        {author} - {convertedDate}
      </h3>
      <Post />
      <SocialShare url={`${process.env.SITE_URL}/blog/${id}`} title={title} />
    </div>
  );
}

// generate route segments
export async function generateStaticParams() {
  const posts = await getAllPostsMeta();

  return posts;
}
