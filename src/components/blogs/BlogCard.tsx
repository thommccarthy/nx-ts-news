import Link from 'next/link';
import { FC, useState } from 'react';
import BlogTag from './BlogTag';

interface Props {
  title: string;
  desc: string;
  slug: string;
  date: string;
  tags: string[];
}

const BlogCard: FC<Props> = ({
  title,
  desc,
  slug,
  date,
  tags,
}): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li>
      <Link href={'/blogs/' + slug} aria-label={title}>
        <div
          className=' border-pink-600 hover:border-seascape focus:border-seascape hover:bottom-10 border-2 px-3 py-7 md:p-7 mb-5 rounded-xl backgroundGlass shadow-indigo-500 shadow-lg transition-all duration-300 ease-in-out'
          style={{
            transform: isHovered ? 'translateY(-5px)' : 'translateY(0px)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          <h2 className='font-bold mb-3 text-center md:text-left  text-2xl md:text-3xl'>
            {title}
          </h2>
          <ul className='tags flex justify-center md:justify-start gap-2 mb-5'>
            {tags.map((tag) => (
              <li key={tag}>
                <BlogTag tagName={tag} />
              </li>
            ))}
          </ul>
          <p className='md:text-xl'>{desc}</p>{' '}
        </div>
      </Link>
    </li>
  );
};

export default BlogCard;
