
import { useEffect } from 'react';

interface AnimateOnScrollOptions {
  animationClass?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  selector?: string;
}

export const useAnimateOnScroll = (options: AnimateOnScrollOptions = {}) => {
  const {
    animationClass = 'animate-fade-in',
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
    selector = '.animate-on-scroll',
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove(animationClass);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [animationClass, threshold, rootMargin, once, selector]);
};
