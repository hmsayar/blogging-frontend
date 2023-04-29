import { useEffect,RefObject } from 'react';

export default function useClickOutside(ref: RefObject<HTMLElement>, handler: () => void){
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
        if (ref.current && event.target instanceof Node && !ref.current.contains(event.target)) {
          handler();
        }
      };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

