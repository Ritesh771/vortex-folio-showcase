
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile" 

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    
    // Enhanced options for better mobile experience
    const enhancedOpts: CarouselOptions = {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
      dragFree: isMobile ? true : opts?.dragFree,
      containScroll: isMobile ? "trimSnaps" : opts?.containScroll,
      loop: opts?.loop || false,
      inViewThreshold: isMobile ? 0.7 : opts?.inViewThreshold || 0.5,
      align: isMobile ? "start" : opts?.align || "center",
    }
    
    const [carouselRef, api] = useEmblaCarousel(enhancedOpts, plugins)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )
    
    // Handle touch swipe for better mobile responsiveness
    const handleTouchStart = React.useCallback(() => {
      // Pause any auto-scroll if implemented
      document.body.style.overscrollBehavior = "none"
    }, [])
    
    const handleTouchEnd = React.useCallback(() => {
      // Resume auto-scroll if implemented
      document.body.style.overscrollBehavior = "auto"
    }, [])

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])
    
    // Apply smooth momentum scrolling for better mobile UX
    React.useEffect(() => {
      if (!api) return
      
      if (carouselRef && isMobile) {
        // Set smoother options for mobile
        api.reInit({
          ...enhancedOpts,
          dragFree: true,
        })
      }
      
      return () => {
        // Clean up any event listeners if needed
      }
    }, [api, carouselRef, isMobile, enhancedOpts])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts: enhancedOpts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()
  const isMobile = useIsMobile()

  return (
    <div ref={carouselRef} className={cn("overflow-hidden", isMobile ? "scrollable" : "")} style={{ WebkitOverflowScrolling: 'touch' }}>
      <div
        ref={ref}
        className={cn(
          "flex will-change-transform",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        style={{ 
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  const isMobile = useIsMobile()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        isMobile ? "transition-transform duration-300 ease-out" : "",
        className
      )}
      style={{ 
        touchAction: 'pan-y',
        WebkitTapHighlightColor: 'transparent'
      }}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()
  const isMobile = useIsMobile()

  // Adjust button position for mobile
  const mobileClass = isMobile ? 
    "opacity-70 h-8 w-8 -left-2 bg-white/80 shadow-md border-0" : 
    "h-8 w-8 -left-12"

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute rounded-full",
        orientation === "horizontal"
          ? `${mobileClass} top-1/2 -translate-y-1/2`
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()
  const isMobile = useIsMobile()
  
  // Adjust button position for mobile
  const mobileClass = isMobile ? 
    "opacity-70 h-8 w-8 -right-2 bg-white/80 shadow-md border-0" : 
    "h-8 w-8 -right-12"

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute rounded-full",
        orientation === "horizontal"
          ? `${mobileClass} top-1/2 -translate-y-1/2`
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
