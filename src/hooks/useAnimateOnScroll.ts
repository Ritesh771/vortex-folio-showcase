
import { useEffect, useRef } from 'react';

interface AnimateOnScrollOptions {
  animationClass?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  selector?: string;
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

export const useAnimateOnScroll = (options: AnimateOnScrollOptions = {}) => {
  const {
    animationClass = 'animate-fade-in',
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
    selector = '.animate-on-scroll',
    delay = 0,
    stagger = false,
    staggerDelay = 100,
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const baseDelay = delay + (stagger ? index * staggerDelay : 0);
            
            setTimeout(() => {
              element.classList.add(animationClass);
              element.style.visibility = 'visible';
            }, baseDelay);
            
            if (once) {
              observerRef.current?.unobserve(entry.target);
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
    elements.forEach((el) => {
      // Set initial visibility to hidden to prevent flash
      (el as HTMLElement).style.visibility = 'hidden';
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        elements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
        observerRef.current = null;
      }
    };
  }, [animationClass, threshold, rootMargin, once, selector, delay, stagger, staggerDelay]);

  return observerRef;
};
