import Image from 'next/image';
import { FC } from 'react';

interface Props {
  src: string;
  alt: string;
  [key: string]: any;
}

const NextImage: FC<Props> = ({ src, alt, ...props }) => {
  return (
    <Image
      loading='lazy'
      width={1000}
      height={1000}
      src={src}
      alt={alt}
      {...props}
    />
  );
};

export default NextImage;
