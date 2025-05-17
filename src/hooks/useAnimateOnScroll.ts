
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
  duration?: number;
  easing?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate' | 'flip';
  intensity?: number;
  distance?: string;
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
    duration = 800,
    easing = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    direction = 'up',
    intensity = 1,
    distance = '30px',
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Helper to set initial styles based on animation direction
    const setInitialStyles = (element: HTMLElement) => {
      let transform = '';
      
      switch(direction) {
        case 'up':
          transform = `translateY(${distance})`;
          break;
        case 'down':
          transform = `translateY(-${distance})`;
          break;
        case 'left':
          transform = `translateX(${distance})`;
          break;
        case 'right':
          transform = `translateX(-${distance})`;
          break;
        case 'scale':
          transform = `scale(0.${8 + intensity})`;
          break;
        case 'rotate':
          transform = `rotate(${90 * intensity}deg)`;
          break;
        case 'flip':
          transform = `perspective(500px) rotateY(${90 * intensity}deg)`;
          break;
        default:
          transform = `translateY(${distance})`;
      }
      
      element.style.opacity = '0';
      element.style.transform = transform;
      element.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
      element.style.willChange = 'opacity, transform';
      element.style.visibility = 'hidden';
    };

    // Helper to animate the element
    const animateElement = (element: HTMLElement, delayMs: number = 0) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0) scale(1) rotate(0) rotateY(0)';
        element.style.visibility = 'visible';
        
        if (animationClass) {
          element.classList.add(animationClass);
        }
      }, delayMs);
    };

    const setupObserver = () => {
      // Create a new observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              const baseDelay = delay + (stagger ? index * staggerDelay : 0);
              
              animateElement(element, baseDelay);
              
              if (once) {
                observerRef.current?.unobserve(entry.target);
              }
            } else if (!once) {
              // Reset when out of view if once is false
              setInitialStyles(entry.target as HTMLElement);
              entry.target.classList.remove(animationClass || '');
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );
      
      // Get all elements matching the selector
      const targetElements = document.querySelectorAll(selector);
      
      // Set initial styles
      targetElements.forEach((el) => {
        setInitialStyles(el as HTMLElement);
      });
      
      // Observe elements
      targetElements.forEach((el) => {
        observerRef.current?.observe(el);
      });
    };
    
    // Set up the observer
    setupObserver();
    
    // Set up a mutation observer to detect when new elements are added to the DOM
    // This is especially useful for the tab switching scenario
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any of the added nodes match our selector or contain elements that do
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              // Check if the node itself matches the selector
              if (node.matches(selector)) {
                setInitialStyles(node);
                observerRef.current?.observe(node);
              }
              
              // Check if any of its children match the selector
              const childElements = node.querySelectorAll(selector);
              childElements.forEach((child) => {
                setInitialStyles(child as HTMLElement);
                observerRef.current?.observe(child);
              });
            }
          });
        }
      });
    });
    
    // Start observing the entire document body for new elements
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observerRef.current) {
        const targetElements = document.querySelectorAll(selector);
        targetElements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      
      mutationObserver.disconnect();
    };
  }, [animationClass, threshold, rootMargin, once, selector, delay, stagger, staggerDelay, duration, easing, direction, intensity, distance]);

  return observerRef;
};
