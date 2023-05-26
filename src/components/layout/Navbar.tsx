import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MobileMenu } from './MobileMenu';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
  };

  useEffect(() => {
    if (hasInteracted) {
      if (isOpen) {
        closeRef.current?.focus();
      } else {
        openRef.current?.focus();
      }
    }
  }, [isOpen, hasInteracted]);

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
          className='text-yellow-200 hover:text-yellow-300 focus:outline-sky-300 sm:hidden mobile-menu-button'
          onClick={toggleMenu}
          aria-controls='mobile-nav'
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label='Toggle Menu'
          ref={openRef}
        >
          <svg
            viewBox='0 0 20 20'
            fill='currentColor'
            className={`${isOpen ? 'hidden' : 'block'} menu w-7 h-7`}
            aria-hidden='true'
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
            aria-hidden='true'
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
        <MobileMenu
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          openRef={openRef}
          closeRef={closeRef}
        />
      )}
    </div>
  );
};

export default Navbar;
