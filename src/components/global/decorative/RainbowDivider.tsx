import { FC, useState } from 'react';

interface Props {
  size?: string;
}

const RainbowDivider: FC<Props> = ({ size }) => {
  return (
    <div
      className='aria-hidden my-6 flex h-full w-full select-none items-center justify-center sm:my-4 '
      aria-hidden='true'
    >
      <div className='bg-gradient-to-r  bg-clip-text text-3xl text-transparent from-yellow-200 via-pink-400 to-sky-300 sm:text-5xl'>
        ··············
      </div>
    </div>
  );
};

export default RainbowDivider;
