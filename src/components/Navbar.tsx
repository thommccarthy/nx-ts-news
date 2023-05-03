import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className='max-w-4xl mx-auto py-4 px-3 flex justify-between align-sub'>
      <Link
        href='/'
        className='font-space-mono font-black text-2xl'
        title='Thom McCarthy | Home'
      >
        <span className='font-space-mono font-black text-2xl'>Thom</span>{' '}
        McCarthy
      </Link>
      <ul className='flex align-baseline gap-4'>
        <li className='mb-0 pb-0'>
          <Link href='/blogs' className='text-lg'>
            Blog
          </Link>
        </li>
        <li>
          <Link href='/about' className='text-lg'>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
