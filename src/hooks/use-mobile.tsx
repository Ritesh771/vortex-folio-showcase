
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Function to check if the device is mobile
    const checkIfMobile = () => {
      // Check device width
      const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT
      
      // Check for touch capabilities as additional indicator for mobile devices
      const hasTouch = 'ontouchstart' in window || 
                      navigator.maxTouchPoints > 0 ||
                      // @ts-ignore
                      (navigator.msMaxTouchPoints > 0)
      
      // Set mobile state
      setIsMobile(isMobileWidth || hasTouch)
    }

    // Initial check
    checkIfMobile()

    // Add listeners for changes
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Use newer addEventListener if available, otherwise use older compatibility method
    if (mql.addEventListener) {
      mql.addEventListener("change", checkIfMobile)
    } else {
      // @ts-ignore - For older browser compatibility
      mql.addListener(checkIfMobile)
    }
    
    // Also listen to resize events
    window.addEventListener('resize', checkIfMobile, { passive: true })

    // Cleanup listeners
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkIfMobile)
      } else {
        // @ts-ignore - For older browser compatibility
        mql.removeListener(checkIfMobile)
      }
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  return isMobile
}
