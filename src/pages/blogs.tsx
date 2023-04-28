import BlogCard from '@/components/BlogCard';
import { NextPage } from 'next';

interface Props {}

const Blogs: NextPage<Props> = () => {
  return (
    <ul className='max-w-3xl mx-auto p-5 space-y-4'>
      <BlogCard
        title='Blog 1'
        desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
      />
      <BlogCard
        title='Blog 2'
        desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
      />
      <BlogCard
        title='Blog 3'
        desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
      />
      <BlogCard
        title='Blog 4'
        desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
      />
      <BlogCard
        title='Blog 5'
        desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
      />
    </ul>
  );
};

export default Blogs;
