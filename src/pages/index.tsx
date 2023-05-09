import Image from 'next/image';
import styles from './index.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center p-2`}>
      <h1 className='uppercase font-black text-center mb-16 font-fira-code'>
        Hi, I&apos;m Thom
      </h1>
      <div className='border-indigo-800 backgroundGlass border-2 px-9 rounded-lg max-w-3xl w-11/12 flex justify-center items-center py-16'>
        <div>
          <p className='text-lg'>
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
    </main>
  );
}
