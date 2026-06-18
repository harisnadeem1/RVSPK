// src/components/MarketCarousel.jsx
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState, useCallback } from "react"

const items = [
  { title: "Indices", desc: "Track global market performance", image: "/hero/indices.png" },
  { title: "Energy", desc: "Oil, gas & energy commodities", image: "/hero/energy.png" },
  { title: "Metals", desc: "Gold, silver & precious metals", image: "/hero/metal.png" },
  { title: "Oil", desc: "Crude oil global trading markets", image: "/hero/oil.png" },
  { title: "COTS", desc: "Commodity trading opportunities", image: "/hero/cots-3.png" },
  { title: "Agriculture", desc: "Wheat, rice, cotton & crops", image: "/hero/agriculture.png" },
  { title: "Financials", desc: "Currencies & financial instruments", image: "/hero/financials.png" },
  { title: "EWR", desc: "Global economic indicators", image: "/hero/ewr.png" },
]

export default function MarketCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    const interval = setInterval(() => emblaApi.scrollNext(), 4500)
    return () => {
      clearInterval(interval)
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="w-full">
      <div className="rounded-2xl sm:rounded-3xl border border-white/15 bg-white/8 backdrop-blur-xl shadow-2xl shadow-black/20 p-2.5 sm:p-3 md:p-4">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {items.map((item, i) => {
              const isActive = i === selectedIndex
              return (
                <div key={i} className="flex-[0_0_100%] min-w-0">
                  <div
                    className={`
                      rounded-2xl p-4 sm:p-5 md:p-6 text-center transition-all duration-500
                      ${isActive ? "opacity-100 scale-100" : "opacity-50 scale-95"}
                    `}
                  >
                    <div className="mx-auto mb-4 flex h-28 w-28 sm:h-40 sm:w-40 md:h-48 md:w-48 items-center justify-center rounded-2xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain drop-shadow-2xl rounded-2xl"
                      />
                    </div>

                    <h3 className="text-primary-foreground font-bold text-lg sm:text-xl md:text-2xl tracking-tight">
                      {item.title}
                    </h3>

                    <div className="mx-auto mt-3 mb-3 w-8 sm:w-10 h-[2px] rounded-full bg-accent" />

                    <p className="text-primary-foreground/75 text-xs sm:text-sm md:text-[15px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-3 sm:mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-6 sm:w-7 h-2 bg-accent"
                  : "w-2 h-2 bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}