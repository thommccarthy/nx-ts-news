import BlogCard from '@/components/blogs/BlogCard';
import { InferGetStaticPropsType, NextPage } from 'next';
import { readPostsInfo } from '../../../lib/helper';
import { PostApiResponse } from '../../../utils/types';

export const getStaticProps = async () => {
  const postInfo: PostApiResponse = readPostsInfo();

  // Sort posts by date in descending order
  postInfo.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB.getTime() - dateA.getTime();
  });

  // Return the blog posts data as props for the Blogs component
  return {
    props: { posts: postInfo },
  };
};

// Define a type alias for the props of the Blogs component based on the return value of the getStaticProps function
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<Props> = ({ posts }) => {
  return (
    <ul className='max-w-5xl mx-auto p-5 space-y-9'>
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          desc={post.meta}
          slug={post.slug}
          date={post.date}
          tags={post.tags}
        />
      ))}
    </ul>
  );
};

// Export the Blogs component as the default export
export default Blogs;
