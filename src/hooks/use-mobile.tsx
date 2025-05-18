
import * as React from "react"

// More granular breakpoint definitions
export const BREAKPOINTS = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

export type Breakpoint = keyof typeof BREAKPOINTS

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
    
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md)
    }

    // Run once initially
    updateIsMobile()

    // Modern event listener API
    mql.addEventListener("change", updateIsMobile)
    
    // Also listen for resize events for smoother transitions
    window.addEventListener("resize", updateIsMobile, { passive: true })
    
    return () => {
      mql.removeEventListener("change", updateIsMobile)
      window.removeEventListener("resize", updateIsMobile)
    }
  }, [])

  // Return false as default when SSR (null state)
  return isMobile === null ? false : isMobile
}

export function useBreakpoint(breakpoint: Breakpoint) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`)
    
    const updateBreakpoint = () => {
      setIsAboveBreakpoint(window.innerWidth >= BREAKPOINTS[breakpoint])
    }

    // Run once initially
    updateBreakpoint()

    // Modern event listener API
    mql.addEventListener("change", updateBreakpoint)
    
    return () => {
      mql.removeEventListener("change", updateBreakpoint)
    }
  }, [breakpoint])

  // Return false as default when SSR (null state)
  return isAboveBreakpoint === null ? false : isAboveBreakpoint
}

export function useResponsiveValue<T>(values: Record<Breakpoint, T>) {
  const [currentValue, setCurrentValue] = React.useState<T | null>(null)
  
  React.useEffect(() => {
    const getValueForCurrentBreakpoint = () => {
      const width = window.innerWidth
      
      // Find the largest breakpoint that is smaller than the current width
      const breakpoints = Object.keys(BREAKPOINTS).reverse() as Breakpoint[]
      
      for (const bp of breakpoints) {
        if (width >= BREAKPOINTS[bp]) {
          return values[bp]
        }
      }
      
      // Default to smallest breakpoint value
      return values.xs
    }
    
    const updateValue = () => {
      setCurrentValue(getValueForCurrentBreakpoint())
    }
    
    // Run once initially
    updateValue()
    
    // Listen for resize with debouncing for performance
    let timeout: ReturnType<typeof setTimeout>
    
    const debouncedUpdateValue = () => {
      clearTimeout(timeout)
      timeout = setTimeout(updateValue, 100)
    }
    
    window.addEventListener("resize", debouncedUpdateValue, { passive: true })
    
    return () => {
      window.removeEventListener("resize", debouncedUpdateValue)
      clearTimeout(timeout)
    }
  }, [values])
  
  // If SSR or not initialized yet, return the smallest breakpoint value
  return currentValue === null ? values.xs : currentValue
}
