import React from 'react';

export default function RainbowDivider() {
  return (
    <div
      className='aria-hidden my-6 flex h-full w-full select-none items-center justify-center sm:my-4 '
      aria-hidden='true'
    >
      <div className='bg-gradient-to-r  bg-clip-text text-3xl text-transparent from-yellow-300 via-pink-400 to-cyan-400 sm:text-5xl'>
        ··············
      </div>
    </div>
  );
}
