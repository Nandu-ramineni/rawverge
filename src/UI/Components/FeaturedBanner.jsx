import React, { useCallback, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from 'react-router-dom'
const FeaturedBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Banner slides data
  const bannerSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mobileImage: "https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?q=80&w=1080&auto=format&fit=crop",
      title: "Summer Style Fest",
      subtitle: "50-80% OFF on all summer collections",
      primaryCta: {
        text: "SHOP WOMEN",
        link: "/category/women",
      },
      secondaryCta: {
        text: "SHOP MEN",
        link: "/category/men",
      },
      textColor: "light",
      position: "left",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mobileImage: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1080&auto=format&fit=crop",
      title: "New Season Arrivals",
      subtitle: "Refresh your wardrobe with the latest trends",
      primaryCta: {
        text: "EXPLORE NOW",
        link: "/category/new-arrivals",
      },
      textColor: "dark",
      position: "left",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1624192647570-1131acc12ccf?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      mobileImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1080&auto=format&fit=crop",
      title: "Luxury Collection",
      subtitle: "Exclusive designer pieces at special prices",
      primaryCta: {
        text: "SHOP LUXURY",
        link: "/category/luxury",
      },
      textColor: "light",
      position: "center",
    },
  ]

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Auto-advance slides
  

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, bannerSlides.length])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, bannerSlides.length])

  const goToSlide = useCallback(
    (index) => {
      if (isAnimating || index === currentSlide) return
      setIsAnimating(true)
      setCurrentSlide(index)
      setTimeout(() => setIsAnimating(false), 500)
    },
    [isAnimating, currentSlide],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 3000)
    return () => clearInterval(interval)
  }, [currentSlide, nextSlide])
  // Get current slide data
  const slide = bannerSlides[currentSlide]

  // Position classes based on slide position preference
  const getPositionClasses = (position) => {
    switch (position) {
      case "left":
        return "items-start text-left left-[10%]"
      case "right":
        return "items-end text-right right-[10%]"
      case "center":
      default:
        return "items-center text-center left-1/2 -translate-x-1/2"
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="relative w-full h-[60vh] md:h-[85vh]">
        {/* Responsive Image */}
        <img
          src={isMobile ? slide.mobileImage : slide.image}
          alt={slide.title}
          className="w-full h-full object-cover   transition-transform duration-500 ease-out scale-105"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 ${slide.textColor === "light"
              ? "bg-gradient-to-r from-black/60 to-transparent"
              : "bg-gradient-to-r from-white/60 to-transparent"
            }`}
        ></div>


        {/* Content */}
        <div
          className={`absolute top-1/2 z-20 -translate-y-1/2 flex flex-col ${getPositionClasses(
            slide.position
          )} space-y-4 p-4 md:p-0 max-w-[90%] md:max-w-xl`}
        >
          <h1
            className={`text-3xl md:text-6xl font-bold leading-tight ${slide.textColor === "light" ? "text-white" : "text-gray-900"
              }`}
          >
            {slide.title}
          </h1>
          <p
            className={`text-base md:text-xl ${slide.textColor === "light" ? "text-gray-200" : "text-gray-700"
              }`}
          >
            {slide.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className={`rounded-full px-6 text-sm md:text-base ${slide.textColor === "light"
                  ? "bg-white text-gray-900 hover:bg-gray-100"
                  : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
            >
              <Link to={slide.primaryCta.link}>{slide.primaryCta.text}</Link>
            </Button>
            {slide.secondaryCta && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className={`rounded-full px-6 text-sm md:text-base ${slide.textColor === "light"
                    ? " text-white bg-white/10"
                    : "border-gray-900 text-gray-900 hover:bg-gray-100"
                  }`}
              >
                <Link to={slide.secondaryCta.link}>{slide.secondaryCta.text}</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute z-20 left-3 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute z-20 right-3 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>
      </div>
    </div>

  )
}


export default FeaturedBanner
