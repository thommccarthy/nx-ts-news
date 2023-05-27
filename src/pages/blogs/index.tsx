import BlogCard from '@/components/blogs/BlogCard';
import { InferGetStaticPropsType, NextPage } from 'next';
import { readPostsInfo } from '../../../lib/helper';
import { PostApiResponse } from '../../../utils/types';
import RainbowDivider from '@/components/global/decorative/RainbowDivider';

export const getStaticProps = async () => {
  const postInfo: PostApiResponse = readPostsInfo();

  postInfo.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB.getTime() - dateA.getTime();
  });

  return {
    props: { posts: postInfo },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blogs: NextPage<Props> = ({ posts }) => {
  return (
    <div className='p-5'>
      <h1 className=' font-black text-center mb-4 md:mb-9 font-fira-code'>
        <span className='retro'>Blog</span>
      </h1>
      <div
        className='backgroundGlass font-bold text-xl mx-auto flex justify-center py-4 md:py-6 px-5 mt-5 mb-9 rounded-lg max-w-3xl border-2 border-sky-300  hover:bottom-10
         shadow-indigo-900 shadow-lg transition-all duration-300 ease-in-out '
      >
        <p className='text-center font-normal'>
          Exploring web development and design, I craft functional and
          accessible experiences. Occasionally, I write about my latest
          learnings, reinforcing and{' '}
          <span className='whitespace-nowrap'>sharing knowledge.</span>
        </p>
      </div>
      <RainbowDivider />
      <ul className='max-w-5xl flex flex-col mx-auto py-5 mb-14 gap-4'>
        {posts.map((post) => (
          <li key={post.slug}>
            <BlogCard
              title={post.title}
              desc={post.meta}
              slug={post.slug}
              date={post.date}
              tags={post.tags}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the Blogs component as the default export
export default Blogs;
