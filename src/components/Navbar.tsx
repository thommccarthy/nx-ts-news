import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className='border-t-yellow-200 d-block border-t-4 glassWrapper sticky top-0 z-50 mb-5 md:mb-11'>
      <nav className='mx-auto py-6 px-3 flex justify-between align-sub max-w-4xl'>
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
        <button
          type='button'
          className='text-yellow-200 hover:text-yellow-400 focus:outline-none focus:text-yellow-400 sm:hidden'
          onClick={toggleMenu}
        >
          <svg
            viewBox='0 0 20 20'
            fill='currentColor'
            className={`${isOpen ? 'hidden' : 'block'} menu w-6 h-6`}
          >
            <path
              fillRule='evenodd'
              d='M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm1 5a1 1 0 100 2h14a1 1 0 100-2H3z'
              clipRule='evenodd'
            />
          </svg>
          <svg
            viewBox='0 0 20 20'
            fill='currentColor'
            className={`${isOpen ? 'block' : 'hidden'} close w-6 h-6`}
          >
            <path
              fillRule='evenodd'
              d='M10 9a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm-6 1a1 1 0 011-1h3a1 1 0 110 2H5a1 1 0 01-1-1zm11 1a1 1 0 100 2H5a1 1 0 100-2h10zm-1 4a1 1 0 100 2H6a1 1 0 100-2h4zm-1-8a1 1 0 100 2H6a1 1 0 100-2h4z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        <ul className='sm:flex align-baseline gap-4 hidden'>
          <li className='mb-0 pb-0 '>
            <Link
              href='/blogs'
              className='text-lg custom-nav-link custom-nav-link--header'
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href='/about'
              className='text-lg custom-nav-link custom-nav-link--header'
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full z-40 bg-black '>
          <nav className='pt-10 px-6 sm:hidden'>
            <button
              type='button'
              className='text-yellow-200 hover:text-yellow-400 focus:outline-none focus:text-yellow-400 absolute top-4 right-4'
              onClick={toggleMenu}
            >
              <svg
                viewBox='0 0 20 20'
                fill='currentColor'
                className='close w-6 h-6'
              >
                <path
                  fillRule='evenodd'
                  d='M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z'
                />
              </svg>
            </button>
            <ul className='text-center text-2xl mt-24'>
              <li className='mb-8'>
                <Link
                  href='/blogs'
                  className='text-lg custom-nav-link custom-nav-link--header'
                >
                  Blog
                </Link>
              </li>
              <li className='mb-8'>
                <Link
                  href='/about'
                  className='text-lg custom-nav-link custom-nav-link--header'
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
