import { useMemo } from 'react';

// Define type for the options
type OptionsType = {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
  day?: 'numeric' | '2-digit';
};

// Default options
const defaultOptions: OptionsType = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

// Custom hook
const useFormattedDate = (
  date: string,
  options: OptionsType = defaultOptions
) => {
  const formattedDate = useMemo(() => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-US', options);
  }, [date, options]);

  return formattedDate;
};

export default useFormattedDate;
