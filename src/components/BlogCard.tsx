import Link from 'next/link';
import { FC } from 'react';

interface Props {
  title: string;
  desc: string;
  slug: string;
}

const BlogCard: FC<Props> = ({ title, desc, slug }): JSX.Element => {
  return (
    <li className=' border-yellow-200 border-2 p-7 rounded mb-5'>
      <Link href={'/blogs/' + slug}>
        <h2 className='font-bold mb-3'>{title}</h2>
        <p className='text-xl'>{desc}</p>{' '}
      </Link>
    </li>
  );
};

export default BlogCard;
