import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Star, MapPin, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Ahmed Raza",
    location: "Lahore, Pakistan",
    title: "Excellent Trading Experience",
    text: "Very professional service and smooth execution. I feel confident trading through Right Vision Securities.",
    initials: "AR",
  },
  {
    name: "Sara Khan",
    location: "Karachi, Pakistan",
    title: "Highly Trustworthy Platform",
    text: "Transparent and reliable platform. Their support team is always responsive and helpful.",
    initials: "SK",
  },
  {
    name: "Usman Ali",
    location: "Islamabad, Pakistan",
    title: "Best Brokerage Service",
    text: "One of the most trustworthy brokerage services I've used in Pakistan.",
    initials: "UA",
  },
  {
    name: "Hassan Tariq",
    location: "Faisalabad, Pakistan",
    title: "Smooth Account Setup",
    text: "Account opening process was smooth and well-guided. Highly recommended.",
    initials: "HT",
  },
  {
    name: "Ayesha Malik",
    location: "Multan, Pakistan",
    title: "Professional Support",
    text: "Clear communication and professional handling of client queries.",
    initials: "AM",
  },
  {
    name: "Bilal Shah",
    location: "Rawalpindi, Pakistan",
    title: "Fast Execution",
    text: "Excellent execution speed and proper risk management support.",
    initials: "BS",
  },
  {
    name: "Nida Fatima",
    location: "Lahore, Pakistan",
    title: "Very Satisfied",
    text: "Very satisfied with their services. Everything is transparent and well managed.",
    initials: "NF",
  },
]

function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", dragFree: true },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()))
  }, [emblaApi])

  return (
    <section className="section-spacing bg-muted">
      <div className="container-custom px-4 sm:px-6">

        {/* Section Header — matches your site's pattern exactly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
            Client Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            What our clients say
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Trusted by traders and investors across Pakistan
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden -mx-3" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="flex-none w-[85%] sm:w-[55%] lg:w-[38%] px-3"
              >
                <div className="h-full bg-blue-50/60 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-blue-100 hover:bg-blue-50 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col">

                  {/* Top row: stars + quote icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 text-accent fill-accent" />
                      ))}
                    </div>
                    <div className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                      <Quote className="h-3.5 w-3.5 text-accent" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Review text */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                    "{item.text}"
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-blue-100 mb-4" />

                  {/* Footer: avatar + name + location */}
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-foreground">
                        {item.initials}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-foreground">
                        {item.name}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8 px-1 flex-wrap gap-4">

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                  index === selectedIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              aria-label="Previous"
              className="h-10 w-10 rounded-xl border border-blue-100 bg-blue-50/60 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md text-foreground flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next"
              className="h-10 w-10 rounded-xl border border-blue-100 bg-blue-50/60 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md text-foreground flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}

export default TestimonialCarousel