import Link from 'next/link';
import { FC, useRef, KeyboardEvent } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface Props {
  toggleMenu: () => void;
  isOpen: boolean;
  openRef: React.RefObject<HTMLButtonElement>;
  closeRef: React.RefObject<HTMLButtonElement>;
}

export const MobileMenu: FC<Props> = ({
  toggleMenu,
  isOpen,
  openRef,
  closeRef,
}) => {
  const lastLinkRef = useRef<HTMLAnchorElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, toggleMenu);

  const handleKeyDown = useFocusTrap(closeRef, lastLinkRef);

  return (
    <div
      className='fixed top-5 right-1 z-40 bg-indigo-900 border-indigo-500 border-2 shadow-indigo-500 shadow-md rounded-md min-h-24'
      id='mobile-nav'
      onKeyDown={handleKeyDown}
      ref={menuRef}
    >
      <nav className='pt-10 px-6 sm:hidden' aria-label='mobile-primary'>
        <button
          type='button'
          className='text-yellow-200 hover:text-yellow-300 focus:outline-sky-300  absolute top-4 right-4'
          onClick={toggleMenu}
          aria-controls='mobile-nav'
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label='Close Menu'
          ref={closeRef}
        >
          <svg
            viewBox='0 0 20 20'
            fill='currentColor'
            className='close w-6 h-6'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z'
            />
          </svg>
        </button>
        <ul className='text-center text-2xl'>
          <li className='mb-8'>
            <Link
              href='/'
              className='text-lg custom-nav-link custom-nav-link--header'
              onClick={toggleMenu}
              title='Thom McCarthy | Home'
            >
              Home
            </Link>
          </li>
          <li className='mb-8'>
            <Link
              href='/blogs'
              className='text-lg custom-nav-link custom-nav-link--header'
              onClick={toggleMenu}
              title='Thom McCarthy | Blog'
            >
              Blog
            </Link>
          </li>
          <li className='mb-8'>
            <Link
              href='/about'
              className='text-lg custom-nav-link custom-nav-link--header'
              ref={lastLinkRef}
              onClick={toggleMenu}
              title='Thom McCarthy | About'
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
