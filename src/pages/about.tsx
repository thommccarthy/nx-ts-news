import BlogTag from '@/components/blogs/BlogTag';
import ExternalLink from '@/components/global/utility/ExternalLink';
import React from 'react';

const About: React.FC = () => {
  const techILike: string[] = [
    'Next.js',
    'Gatsby',
    'TypeScript',
    'Tailwind CSS',
    'Node JS',
    'Laravel',
    'Figma',
    'WAI-ARIA',
    'Storybook',
  ];

  return (
    <div className='max-w-5xl mx-auto p-4'>
      <h1 className='font-black text-center mb-4 md:mb-9 font-fira-code retro'>
        About Me
      </h1>

      <div className='border-indigo-800 backgroundGlass border-2 px-3 md:px-9 rounded-lg max-w-5xl mx-auto w-100 flex justify-center items-center py-6 md:py-14  shadow-indigo-500 shadow-lg mb-6 md:mb-12'>
        <div className='text-center md:text-left font-bold'>
          <p className='text-paragraph'>
            I&apos;m Thom, a <span className='font-bold'>UX Engineer</span> from
            West Philadelphia, crafting responsive, scalable, and aesthetically
            pleasing web interfaces with a strong emphasis on accessibility.
          </p>
          <p className='text-paragraph'>
            In my current role as a{' '}
            <span className='font-bold'>Front-End Developer</span> at{' '}
            <ExternalLink
              href='https://rockybrands.com'
              className='font-bold decoration-sky-300 whitespace-nowrap'
            >
              Rocky Brands
            </ExternalLink>
            , I collaborate with a dynamic team to build and sustain our
            e-commerce platforms, corporate portfolio sites, and internal{' '}
            <span className='whitespace-nowrap'>workflow tools.</span>
          </p>
          <p className='text-paragraph'>
            Collaborating with designers and project managers, I focus on
            delivering high-performance products with excellent user experience.
            My role involves advising on design decisions, validating
            feasibility, and enhancing the visual appeal of our products.
          </p>

          <h2 className='mt-5 text-lg md:text-xl font-normal font-fira-code'>
            Some of my current favorite tech includes:
          </h2>
          <ul className='flex justify-center gap-3 flex-wrap text-white mt-6 mx-auto px-10 max-w-3xl'>
            {techILike.map((tech) => (
              <li key={tech}>
                <BlogTag tagName={tech} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
