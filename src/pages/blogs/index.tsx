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
    <>
      <h1 className=' font-black text-center mb-4 md:mb-9 font-fira-code'>
        <span className='retro'>Blog</span>
      </h1>
      <div
        className='backgroundGlass font-bold text-xl mx-auto flex justify-center  py-8 px-7 mt-10 mb-14 rounded-lg max-w-3xl border-2 border-sky-300  hover:bottom-10
         shadow-indigo-900 shadow-lg transition-all duration-300 ease-in-out'
      >
        <p className='text-center font-semibold'>
          I write about modern web development, design and tooling, with an
          emphasis on functional and accessible UX principals.
        </p>
      </div>
      <div
        className='aria-hidden my-6 flex h-full w-full select-none items-center justify-center sm:my-4'
        aria-hidden='true'
      >
        <div className='bg-gradient-to-r  bg-clip-text text-4xl text-transparent from-yellow-300 via-pink-400 to-cyan-400 sm:text-6xl'>
          ··············
        </div>
      </div>
      <ul className='max-w-5xl flex flex-col mx-auto p-5 gap-4'>
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
    </>
  );
};

// Export the Blogs component as the default export
export default Blogs;
