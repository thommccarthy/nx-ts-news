import Image from 'next/image';
import styles from './index.module.css';
import Link from 'next/link';
import LatestPostsHome from '@/components/index/LatestPostsHome';
import { FC } from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import { readPostsInfo } from '../../lib/helper';
import { PostApiResponse } from '../../utils/types';
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

const Home: FC<Props> = ({ posts }) => {
  return (
    <div className={`flex min-h-screen  flex-col p-4 mx-auto`}>
      <h1 className=' font-black text-center mb-1 md:mb-3 font-fira-code'>
        <span className='retro'>Thom McCarthy</span>
      </h1>
      <h2 className='font-normal text-center mb-8 md:mb-12'>UX Engineer</h2>
      {/* about */}
      <div className='border-indigo-800 backgroundGlass border-2 px-3 md:px-9 rounded-lg max-w-4xl mx-auto w-100 flex justify-center items-center py-16  shadow-indigo-500 shadow-lg mb-6 md:mb-12'>
        <div className='text-center md:text-left'>
          <p className='text-xl font-bold md:pr-5'>
            I{`'`}m a Web <span className='text-yellow-500'>UX Engineer</span>{' '}
            based in <span>West Philadelphia</span>
            <br />
            <br />I build and design responsive, scalable, robust and accessible
            web interfaces. On occasion I will write{' '}
            <span className='whitespace-nowrap'>about it.</span>
            <br />
          </p>
          <div className='mt-4'>
            <Link
              href='/about'
              className='mt-2 custom-link-2 text-2xl font-medium'
            >
              About Me
            </Link>
          </div>
        </div>
        <Image
          src='/assets/index/Thom_headshot.jpg'
          alt=''
          width={200}
          height={200}
          className={`rounded-full hidden sm:block ${styles.bgGradientImg}`}
        />
      </div>
      <RainbowDivider />

      <LatestPostsHome posts={posts} />
    </div>
  );
};

export default Home;
