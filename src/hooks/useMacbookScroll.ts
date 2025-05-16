
import { useEffect, RefObject } from 'react';

interface MacbookScrollOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const useMacbookScroll = (
  ref: RefObject<HTMLElement>,
  options: MacbookScrollOptions = {}
) => {
  const { threshold = 0.2, rootMargin = '0px', once = true } = options;

  useEffect(() => {
    const element = ref.current;
    
    if (!element) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('in-view');
            if (once) observer.unobserve(element);
          } else if (!once) {
            element.classList.remove('in-view');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [ref, threshold, rootMargin, once]);
};
