import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import {
  LineChart,
  Zap,
  Gem,
  Droplets,
  ArrowLeftRight,
  Leaf,
  Banknote,
  Globe
} from 'lucide-react'

const items = [
  { label: 'Indices', Icon: LineChart },
  { label: 'Energy', Icon: Zap },
  { label: 'Metals', Icon: Gem },
  { label: 'Oil', Icon: Droplets },
  { label: 'COTS', Icon: ArrowLeftRight },
  { label: 'Agriculture', Icon: Leaf },
  { label: 'Financials', Icon: Banknote },
  { label: 'EWR', Icon: Globe }
]

export default function MarketCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)

    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div className="mt-10 sm:mt-16">

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">

          {items.map((item, i) => (
            <div
              key={i}
              className="flex-[0_0_auto]"
            >
              <div className="flex items-center gap-2 px-5 py-3 rounded-full
                bg-white/10 border border-white/20 backdrop-blur-md
                text-white hover:bg-white/20 transition-all cursor-pointer
                min-w-[140px] justify-center"
              >
                <item.Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === selectedIndex
                ? 'w-6 bg-white'
                : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>

    </div>
  )
}