import Link from 'next/link';
import { FC } from 'react';

interface Props {
  title: string;
  desc: string;
  slug: string;
}

const BlogCard: FC<Props> = ({ title, desc, slug }): JSX.Element => {
  return (
    <Link href={'/blogs/' + slug}>
      <li className='bg-green-100 p-3 rounded'>
        <h2 className='text-4xl text-gray-950 font-bold mb-3'>{title}</h2>
        <p className='text-xl text-gray-600'>{desc}</p>
      </li>
    </Link>
  );
};

export default BlogCard;
