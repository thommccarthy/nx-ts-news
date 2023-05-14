import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className='backgroundGlass py-5 border-b-4 border-b-pink-500 shadow-lg shadow-indigo-500'>
      <div className='max-w-4xl mx-auto flex justify-between px-3'>
        <ul className='flex gap-6 '>
          <li>
            <a
              href='https://github.com/thommccarthy'
              referrerPolicy='no-referrer'
              target='_blank'
              title='Github | Thom McCarthy'
              aria-label='Github'
            >
              <FaGithub className='text-5xl text-white' />
            </a>
          </li>
          <li>
            <a
              href='https://www.linkedin.com/in/thom-mccarthy-6a9a1780/'
              referrerPolicy='no-referrer'
              target='_blank'
              title='LinkedIn | Thom McCarthy'
              aria-label='LinkedIn'
            >
              <FaLinkedin className='text-5xl text-white' />
            </a>
          </li>
        </ul>
        <nav aria-label='footer'>
          <ul className='flex justify-end'>
            <li className='mb-8 mr-3'>
              <Link href='/blogs' className='custom-nav-link text-lg'>
                Blog
              </Link>
            </li>
            <li className='mb-8'>
              <Link href='/about' className='custom-nav-link text-lg'>
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className='text-center px-3'>
        &copy; {new Date().getFullYear()} Thom McCarthy. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
