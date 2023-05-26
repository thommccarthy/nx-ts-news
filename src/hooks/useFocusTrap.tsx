import { KeyboardEvent, RefObject } from 'react';

export function useFocusTrap(
  firstElementRef: RefObject<HTMLElement>,
  lastElementRef: RefObject<HTMLElement>
) {
  const handleBackwardTab = (e: KeyboardEvent) => {
    if (document.activeElement === firstElementRef.current) {
      e.preventDefault();
      lastElementRef.current?.focus();
    }
  };

  const handleForwardTab = (e: KeyboardEvent) => {
    if (document.activeElement === lastElementRef.current) {
      e.preventDefault();
      firstElementRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      // Shift + Tab
      if (e.shiftKey) {
        handleBackwardTab(e);
      } else {
        // Tab
        handleForwardTab(e);
      }
    }
  };

  return handleKeyDown;
}
