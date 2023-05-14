import Image from 'next/image';
import styles from './index.module.css';
import Link from 'next/link';
import LatestNewsHome from '@/components/index/LatestNewsHome';

export default function Home() {
  return (
    <div className={`flex min-h-screen flex-col p-2 max-w-4xl mx-auto`}>
      <h1 className=' font-black text-center mb-1 md:mb-3 font-fira-code'>
        <span className='retro'>Thom McCarthy</span>
      </h1>
      <h2 className='font-normal text-center mb-8 md:mb-12'>UX Engineer</h2>
      <div className='border-indigo-800 backgroundGlass border-2 px-3 md:px-9 rounded-lg max-w-4xl w-100 flex justify-center items-center py-16  shadow-indigo-500 shadow-lg mb-6 md:mb-12'>
        <div className='text-center md:text-left'>
          <p className='text-xl font-bold md:pr-5'>
            I{`'`}m a Web <span className='text-yellow-500'>UX Engineer</span>{' '}
            based in <span>West Philadelphia</span>
            <br />
            <br />I build and design responsive, scalable and robustly
            accessible web interfaces. On occasion I will write{' '}
            <span className='whitespace-nowrap'>about it.</span>
            <br />
          </p>
          <div className='mt-4'>
            <Link
              href='/about'
              className='mt-2 custom-link-2 text-2xl font-bold'
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
      <div
        className='aria-hidden my-6 flex h-full w-full select-none items-center justify-center sm:my-4'
        aria-hidden='true'
      >
        <div className='bg-gradient-to-r  bg-clip-text text-4xl text-transparent from-yellow-300 via-pink-400 to-cyan-400 sm:text-6xl'>
          ··············
        </div>
      </div>

      <LatestNewsHome />
    </div>
  );
}
