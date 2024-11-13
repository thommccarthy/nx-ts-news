import BlogTag from '@/components/blogs/BlogTag';
import ExternalLink from '@/components/global/utility/ExternalLink';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

const About: React.FC = () => {
  const techILike: string[] = [
    'React Js',
    'Vue Js',
    'Next.js',
    'Gatsby',
    'TypeScript',
    'Tailwind CSS',
    'Node JS',
    'Figma',
    'WAI-ARIA',
    '.NET',
    'Storybook',
  ];

  return (
    <>
      <NextSeo
        title='About Me | Thom McCarthy'
        description="I'm Thom, a UX Engineer from West Philadelphia, crafting responsive, scalable, and       aesthetically pleasing web interfaces with a strong emphasis on accessibility."
        canonical='https://thommccarthy.dev/about'
      />
      <div className='max-w-5xl mx-auto p-4'>
        <h1 className='font-black text-center mb-4 md:mb-9 font-fira-code retro'>
          About Me
        </h1>
        <div className='border-indigo-800 backgroundGlass border-2 px-3 md:px-9 rounded-lg max-w-5xl mx-auto w-100 flex justify-center items-center py-6 md:py-14  shadow-indigo-500 shadow-lg mb-6 md:mb-12'>
          <div className='text-center md:text-left font-bold'>
            <Image
              src='/assets/index/Thom_headshot.jpg'
              alt=''
              width={200}
              height={200}
              className={`rounded-full block mx-auto bgGradientImg md:float-right my-5 px-3`}
            />
            <p className='text-paragraph'>
              I’m Thom, a <span className='font-bold'>UX Engineer</span> based
              in West Philadelphia, passionate about designing responsive,
              scalable, and visually captivating web interfaces with a strong
              commitment to accessibility and usability.
            </p>
            <p className='text-paragraph'>
              In my current role as a{' '}
              <span className='font-bold'>UX Engineer</span> at{' '}
              <ExternalLink
                href='https://stratapt.com'
                className='font-bold decoration-sky-300 whitespace-nowrap'
              >
                StrataPT
              </ExternalLink>
              , a leading provider of medical EMR software, I collaborate with a
              multidisciplinary team to drive the development and optimization
              of our enterprise software, client-facing portals, and internal{' '}
              <span className='whitespace-nowrap'>workflow tools.</span>
            </p>
            <p className='text-paragraph'>
              By partnering closely with designers and project managers, I
              ensure the delivery of high-impact, user-centric products. My
              expertise spans client and server-side development, wireframing,
              prototyping, and validating technical feasibility. I’m dedicated
              to enhancing the visual aesthetics and functional performance of
              our platforms, continuously refining user experiences to align
              with business objectives.
            </p>

            <h2 className='mt-5 text-lg md:text-xl font-normal font-fira-code'>
              Some of my current favorite tech includes:
            </h2>
            <ul className='flex justify-center gap-3 flex-wrap text-white mt-6 mx-auto px-5 md:px-10 max-w-3xl'>
              {techILike.map((tech) => (
                <li key={tech}>
                  <BlogTag tagName={tech} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
