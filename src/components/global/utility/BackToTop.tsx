import { FC } from 'react';
import { FiArrowUpCircle } from 'react-icons/fi';

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
      className='mx-auto block text-sky-100 hover:text-sky-300 text-center mt-16 px-2 py-1 font-bold'
      onClick={scrollToTop}
      aria-label='Back To Top'
    >
      <FiArrowUpCircle className='text-center block mx-auto text-3xl mb-2 font-bold' />
      Back To Top
    </button>
  );
};

export default BackToTop;
