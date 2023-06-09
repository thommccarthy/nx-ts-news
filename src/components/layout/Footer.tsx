import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface Props {
  getLinkAriaCurrent: (path: string) => 'page' | undefined;
}

const Footer: React.FC<Props> = ({ getLinkAriaCurrent }) => {
  return (
    <footer className='backgroundGlass py-5'>
      <div className='max-w-4xl mx-auto flex justify-center items-center md:justify-between px-3 py-10 flex-col md:flex-row'>
        <ul className='flex gap-6 mb-4 md:mb-0'>
          <li>
            <a
              href='https://github.com/thommccarthy'
              referrerPolicy='no-referrer'
              target='_blank'
              title='Github | Thom McCarthy'
              aria-label='Github'
            >
              <FaGithub className='text-3xl md:text-5xl text-white hover:text-sky-300 transition-all' />
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
              <FaLinkedin className='text-3xl md:text-5xl text-white hover:text-sky-300 transition-all' />
            </a>
          </li>
        </ul>
        <nav aria-label='footer'>
          <ul className='flex justify-end'>
            <li className=' mr-3'>
              <Link
                href='/blogs'
                className='custom-nav-link text-lg'
                aria-current={getLinkAriaCurrent('/blogs')}
              >
                Blog
              </Link>
            </li>
            <li className=''>
              <Link
                href='/about'
                className='custom-nav-link text-lg'
                aria-current={getLinkAriaCurrent('/about')}
              >
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
