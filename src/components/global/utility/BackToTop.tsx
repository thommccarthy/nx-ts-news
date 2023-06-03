import { FC } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';

type Props = {
  refToScrollTo: React.RefObject<HTMLElement>;
};

const BackToTop: FC<Props> = ({ refToScrollTo }) => {
  const scrollToTop = () => {
    refToScrollTo.current?.scrollIntoView({ behavior: 'smooth' });
    refToScrollTo.current?.focus();
  };

  return (
    <button
      className='mx-auto block text-sky-300 hover:text-sky-200 text-center mt-16 px-2 py-1'
      onClick={scrollToTop}
      aria-label='Back To Top'
    >
      <BsArrowUpCircle className='text-center block mx-auto text-2xl mb-3' />
      Back To Top
    </button>
  );
};

export default BackToTop;
