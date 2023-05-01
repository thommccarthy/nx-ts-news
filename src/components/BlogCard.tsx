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
      <li className=' border-yellow-200 border-2 p-7 rounded mb-5'>
        <h2 className='text-4xl font-bold mb-3'>{title}</h2>
        <p className='text-xl'>{desc}</p>
      </li>
    </Link>
  );
};

export default BlogCard;
