import Image from 'next/image';
import styles from './index.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={`flex min-h-screen flex-col p-2 max-w-4xl mx-auto`}>
      <h1 className=' font-black text-center mb-16 font-fira-code'>
        Thom McCarthy
        <br /> <span className='font-thin'>UI Engineer</span>
      </h1>
      <div className='border-indigo-800 backgroundGlass border-2 px-4 md:px-9 rounded-lg max-w-4xl w-100 flex justify-center items-center py-16  shadow-indigo-500 shadow-lg mb-6 md:mb-12'>
        <div className='text-center md:text-left'>
          <p className='text-lg md:pr-5'>
            I{`'`}m a <strong>UI Engineer</strong> based in{' '}
            <strong>West Philadelphia</strong>
            <br />
            <br />I build thoughful, empathetic and robustly accessible web
            interfaces. <br />
          </p>
          <p className='mt-4'>
            <Link href='/about' className='mt-2 text-xl font-bold'>
              About Me
            </Link>
          </p>
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
        <div className='bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-500 bg-clip-text text-4xl text-transparent dark:from-yellow-300 dark:via-pink-400 dark:to-cyan-400 sm:text-6xl'>
          ··············
        </div>
      </div>

      <h2 className='text-center'>Latest Posts</h2>
    </div>
  );
}
