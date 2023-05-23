import { FC } from 'react';

interface Props {
  tagName: string;
  borderColor?: string;
}

const BlogTag: FC<Props> = ({ tagName, borderColor }) => {
  const border = borderColor ? borderColor : 'border-sky-300';
  return (
    <span className={`rounded-full ${border}  border-2 block max-w-min `}>
      <span className='flex shrink-0 items-center justify-center rounded-full bg-black/90 px-3 py-1 tracking-wider text-sky-300 font-semibold whitespace-nowrap text-xs '>
        {tagName}
      </span>
    </span>
  );
};

export default BlogTag;
