'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Artwork {
  id: string
  title: string
  category: string
  price: number
  image: string
}

const artworks: Artwork[] = [
  {
    id: "1",
    title: "Starry Night",
    category: "Sticks",
    price: 640.00,
    image: "https://res.cloudinary.com/du1bbws62/image/upload/v1730521620/m7jjioy2ftb05t4fbx8l.png",
  },
  {
    id: "2",
    title: "Majesty",
    category: "Sticks",
    price: 400.00,
    image: "https://res.cloudinary.com/du1bbws62/image/upload/v1730521619/zbt84akyprdfta3hx63i.jpg",
  },
  {
    id: "3",
    title: "Analogue",
    category: "Abstract",
    price: 800.00,
    image: "/placeholder.svg?height=600&width=600",
  },
  {
    id: "4",
    title: "Meena Harbor",
    category: "Abstract",
    price: 640.00,
    image: "/placeholder.svg?height=600&width=600",
  },
]

export default function LatestArtwork() {
  return (
    <section className="py-16 bg-[#f5f7f7]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif mb-4"
            >
              Latest artwork
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 max-w-2xl"
            >
              Tempor ac tincidunt feugiat dignissim quis sed donec cursus ornare
              varius sed sagittis nibh.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/artwork"
              className="text-sm font-medium inline-flex items-center hover:text-gray-900 transition-colors"
            >
              VIEW ALL
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">{artwork.category}</div>
                <h3 className="text-xl font-medium">{artwork.title}</h3>
                <div className="text-lg font-medium">
                  ${artwork.price.toFixed(2)}
                </div>
                <Button
                  className="w-full group/button hover:bg-black"
                  size="lg"
                >
                  <span className="mr-2">ADD TO CART</span>
                  <ShoppingCart className="w-4 h-4 transition-transform group-hover/button:scale-110" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}