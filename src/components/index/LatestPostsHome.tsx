import { FC } from 'react';
import BlogCard from '../blogs/BlogCard';
import { PostApiResponse } from '../../../utils/types';
import Link from 'next/link';

interface Props {
  posts: PostApiResponse;
}

const LatestPostsHome: FC<Props> = ({ posts }) => {
  return (
    <div className='mb-5'>
      <h2 className='text-center mb-8 md:mb-12'>Latest Posts</h2>
      <ul className='max-w-5xl mx-auto my-9 grid grid-cols-1 md:grid-cols-2 gap-4'>
        {posts.slice(0, 3).map((post, index) => (
          <li
            key={post.slug}
            className={`${index === 0 ? 'md:col-span-2' : ''}`}
          >
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
      <Link
        href='/blogs'
        className='backgroundGlass font-bold text-xl mx-auto flex py-4 px-7 mb-14 rounded-lg max-w-max border-2 border-indigo-500 hover:border-sky-300 hover:bottom-10
        hover:text-sky-300 shadow-indigo-900 shadow-md transition-all duration-300 ease-in-out'
      >
        See All Posts &rarr;
      </Link>
    </div>
  );
};

export default LatestPostsHome;
