
import { useEffect, useRef } from 'react';
import { useIsMobile } from './use-mobile';

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
  const isMobile = useIsMobile();
  
  const {
    animationClass = 'animate-fade-in',
    threshold = isMobile ? 0.05 : 0.1,
    rootMargin = isMobile ? '0px 0px -20px 0px' : '0px',
    once = true,
    selector = '.animate-on-scroll',
    delay = 0,
    stagger = false,
    staggerDelay = isMobile ? 75 : 100,
    duration = isMobile ? 600 : 800,
    easing = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    direction = 'up',
    intensity = 1,
    distance = isMobile ? '20px' : '30px',
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const animatingElementsRef = useRef<Set<Element>>(new Set());
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    // Reduce animation intensity on mobile for better performance
    const mobileAdjustedIntensity = isMobile ? intensity * 0.8 : intensity;
    const mobileAdjustedDistance = isMobile ? 
      (parseInt(distance) * 0.7) + 'px' : 
      distance;
    
    // Helper to set initial styles based on animation direction
    const setInitialStyles = (element: HTMLElement) => {
      let transform = '';
      
      switch(direction) {
        case 'up':
          transform = `translateY(${mobileAdjustedDistance})`;
          break;
        case 'down':
          transform = `translateY(-${mobileAdjustedDistance})`;
          break;
        case 'left':
          transform = `translateX(${mobileAdjustedDistance})`;
          break;
        case 'right':
          transform = `translateX(-${mobileAdjustedDistance})`;
          break;
        case 'scale':
          transform = `scale(0.${Math.floor(8 + mobileAdjustedIntensity * 10)})`;
          break;
        case 'rotate':
          transform = `rotate(${90 * mobileAdjustedIntensity}deg)`;
          break;
        case 'flip':
          transform = `perspective(500px) rotateY(${90 * mobileAdjustedIntensity}deg)`;
          break;
        default:
          transform = `translateY(${mobileAdjustedDistance})`;
      }
      
      element.style.opacity = '0';
      element.style.transform = transform;
      element.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
      element.style.willChange = 'opacity, transform';
      element.style.visibility = 'hidden';
      
      // Add GPU acceleration for smoother animations
      element.style.backfaceVisibility = 'hidden';
      element.style.webkitBackfaceVisibility = 'hidden';
      
      // On mobile, use transform: translateZ(0) for hardware acceleration
      if (isMobile) {
        element.style.transform = `${transform} translateZ(0)`;
      }
    };

    // Helper to animate the element with optimization for mobile
    const animateElement = (element: HTMLElement, delayMs: number = 0) => {
      // If we're already animating this element, don't restart the animation
      if (animatingElementsRef.current.has(element)) {
        return;
      }
      
      // Mark element as animating
      animatingElementsRef.current.add(element);
      
      // Use requestAnimationFrame for smoother animations
      requestAnimationFrame(() => {
        setTimeout(() => {
          // Set all styles at once to avoid multiple reflows
          Object.assign(element.style, {
            opacity: '1',
            transform: 'translate(0, 0) scale(1) rotate(0) rotateY(0)' + (isMobile ? ' translateZ(0)' : ''),
            visibility: 'visible'
          });
          
          if (animationClass) {
            element.classList.add(animationClass);
          }
          
          // Clean up after animation completes
          setTimeout(() => {
            if (once) {
              // Clean up styles for better performance after animation completes
              element.style.willChange = 'auto';
              
              // Remove from tracking set
              animatingElementsRef.current.delete(element);
            }
          }, duration + 100);
        }, delayMs);
      });
    };

    const setupObserver = () => {
      // Optimize intersection observer options for mobile
      const observerOptions = {
        threshold,
        rootMargin,
      };
      
      // Create a new observer with performance optimizations
      observerRef.current = new IntersectionObserver(
        (entries) => {
          // Process all entries in a single animation frame
          requestAnimationFrame(() => {
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
                animatingElementsRef.current.delete(entry.target);
              }
            });
          });
        },
        observerOptions
      );
      
      // Batch DOM operations for better performance
      const setupElements = () => {
        // Get all elements matching the selector
        const targetElements = document.querySelectorAll(selector);
        
        // Process elements in chunks for better performance on mobile
        const processElementsInChunks = (elements: NodeListOf<Element>) => {
          const elementsArray = Array.from(elements);
          const chunkSize = isMobile ? 5 : 10;
          
          for (let i = 0; i < elementsArray.length; i += chunkSize) {
            const chunk = elementsArray.slice(i, i + chunkSize);
            
            setTimeout(() => {
              chunk.forEach(el => {
                setInitialStyles(el as HTMLElement);
                observerRef.current?.observe(el);
              });
            }, i > 0 ? 10 : 0);
          }
        };
        
        processElementsInChunks(targetElements);
      };
      
      // Setup elements with a small delay to allow the page to render first
      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(() => setupElements());
      } else {
        setTimeout(setupElements, 10);
      }
    };
    
    // Set up the observer
    setupObserver();
    
    // Set up a mutation observer to detect new elements with mobile optimizations
    mutationObserverRef.current = new MutationObserver((mutations) => {
      let newElements: HTMLElement[] = [];
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              // Check if the node itself matches the selector
              if (node.matches(selector)) {
                newElements.push(node);
              }
              
              // Check if any of its children match the selector
              const childElements = node.querySelectorAll(selector);
              childElements.forEach((child) => {
                newElements.push(child as HTMLElement);
              });
            }
          });
        }
      });
      
      // Process new elements in the next animation frame
      if (newElements.length > 0) {
        requestAnimationFrame(() => {
          newElements.forEach((element) => {
            if (!animatingElementsRef.current.has(element)) {
              setInitialStyles(element);
              observerRef.current?.observe(element);
            }
          });
        });
      }
    });
    
    // Start observing with lower frequency on mobile to save resources
    mutationObserverRef.current.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
        mutationObserverRef.current = null;
      }
      
      animatingElementsRef.current.clear();
    };
  }, [animationClass, threshold, rootMargin, once, selector, delay, stagger, staggerDelay, duration, easing, direction, intensity, distance, isMobile]);

  return observerRef;
};
