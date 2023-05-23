import React from 'react';

const About: React.FC = () => {
  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-6xl my-10 text-center retro'>About Me</h1>
      {/* about */}
      <div className='border-indigo-800 backgroundGlass border-2 px-3 md:px-9 rounded-lg max-w-4xl w-100 flex justify-center items-center py-16  shadow-indigo-500 shadow-lg mb-6 md:mb-12 text-xl font-bold '>
        <div className='text-center md:text-left text-xl font-bold'>
          <p className='text-xl font-bold md:pr-5'>
            I{`'`}m a Web <span className='text-yellow-500'>UX Engineer</span>{' '}
            based in <span>West Philadelphia</span>
            <br />
            <br />I build and design responsive, scalable and robustly
            accessible web interfaces. On occasion I will write{' '}
            <span className='whitespace-nowrap'>about it.</span>
            <br />
          </p>
          <h2 className='text-xl mt-5 font-fira-code'>
            Some of my favorite tech includes:
          </h2>
          <ul className='flex justify-center gap-3 flex-wrap text-white mt-6 mx-auto px-10'>
            <li>
              <span className='rounded-full border-indigo-500 border-2 block'>
                <span className='flex shrink-0 items-center justify-center rounded-full bg-black/90 px-4 py-1 tracking-wider text-white text-sm font-semibold'>
                  React
                </span>
              </span>
            </li>
            <li>
              <span className='rounded-full border-pink-500 border-2 block'>
                <span className='flex shrink-0 items-center justify-center rounded-full bg-black/90 px-4 py-1 tracking-wider text-white text-sm font-semibold'>
                  Gatsby
                </span>
              </span>
            </li>
            <li>
              <span className='rounded-full border-indigo-500 border-2 block'>
                <span className='flex shrink-0 items-center justify-center rounded-full bg-black/90 px-4 py-1 tracking-wider text-white text-sm font-semibold'>
                  Next.js
                </span>
              </span>
            </li>
            <li>
              <span className='rounded-full border-pink-500 border-2 block'>
                <span className='flex shrink-0 items-center justify-center rounded-full bg-black/90 px-4 py-1 tracking-wider text-white text-sm font-semibold'>
                  Figma
                </span>
              </span>
            </li>
            <li>
              <span className='rounded-full border-indigo-500 border-2 block'>
                <span className='flex shrink-0 items-center justify-center rounded-full bg-black/90 px-4 py-1 tracking-wider text-white text-sm font-semibold'>
                  Tailwind CSS
                </span>
              </span>
            </li>
            <li>
              <span className='rounded-full border-pink-500 border-2 block'>
                <span className='flex shrink-0 items-center justify-center rounded-full bg-black/90 px-4 py-1 tracking-wider text-white text-sm font-semibold'>
                  Typescript
                </span>
              </span>
            </li>
            <li>
              <span className='rounded-full border-indigo-500 border-2 block'>
                <span className='flex shrink-0 items-center justify-center rounded-full bg-black/90 px-4 py-1 tracking-wider text-white text-sm font-semibold'>
                  Storybook
                </span>
              </span>
            </li>
            <li>
              <span className='rounded-full border-pink-500 border-2 block'>
                <span className='flex shrink-0 items-center justify-center rounded-full bg-black/90 px-4 py-1 tracking-wider text-white text-sm font-semibold'>
                  GraphQL
                </span>
              </span>
            </li>
            <li>
              <span className='rounded-full border-indigo-500 border-2 block'>
                <span className='flex shrink-0 items-center justify-center rounded-full bg-black/90 px-4 py-1 tracking-wider text-white text-sm font-semibold'>
                  Postgres
                </span>
              </span>
            </li>
            <li>
              <span className='rounded-full border-pink-500 border-2 block'>
                <span className='flex shrink-0 items-center justify-center rounded-full bg-black/90 px-4 py-1 tracking-wider text-white text-sm font-semibold'>
                  Postgres
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
