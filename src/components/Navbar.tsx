import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <div className='border-t-yellow-200 d-block border-t-4 mb-14 glassWrapper sticky top-0'>
      <nav className='mx-auto py-6 px-3 flex justify-between align-sub max-w-6xl'>
        <Link
          href='/'
          className='font-space-mono font-black text-2xl'
          title='Thom McCarthy | Home'
        >
          <Image
            src='/assets/global/web-blog-logo.svg'
            alt='Thom McCarthy'
            width={250}
            height={250}
          />
        </Link>
        <ul className='flex align-baseline gap-4'>
          <li className='mb-0 pb-0 '>
            <Link href='/blogs' className='text-lg custom-nav-link'>
              Blog
            </Link>
          </li>
          <li>
            <Link href='/about' className='text-lg custom-nav-link'>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
