'use client'

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Expand, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ArtworkDetail from "./art-work-detail.component"

interface GalleryItem {
  id: string
  title: string
  description: string
  imageUrl: string
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Abstract Harmony",
    description: "A vibrant exploration of color and form.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530576/opbbddatby1wcl7wphai.jpg",
  },
  {
    id: "2",
    title: "Urban Rhythm",
    description: "Capturing the pulse of city life through abstract strokes.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530576/lvdue8gbp4wuyi0qtzcd.jpg",
  },
  {
    id: "3",
    title: "Serene Whispers",
    description: "Soft hues blend to create a calming atmosphere.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530575/m1jxtgnpknhvv3lxkrxr.jpg",
  },
  {
    id: "4",
    title: "Cosmic Dance",
    description: "An energetic piece inspired by the movement of celestial bodies.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530573/qrg7frlodlzvgtt5c7jl.jpg",
  },
  {
    id: "5",
    title: "Echoes of Nature",
    description: "Abstract interpretation of natural landscapes and textures.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530572/f2r5exajp2mbko8io6yv.jpg",
  },
  {
    id: "6",
    title: "Emotional Spectrum",
    description: "A journey through the colors of human emotions.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530572/bplvwkbsmaucg0wdx71g.jpg",
  },
  {
    id: "7",
    title: "Vibrant Fusion",
    description: "A bold mix of colors creating an energetic composition.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530570/gx1bheov7y7eeovchc3f.jpg",
  },
  {
    id: "8",
    title: "Geometric Harmony",
    description: "Exploring the balance between shapes and hues.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530568/nmgdypy0jglubknzqiyu.png",
  },
  {
    id: "9",
    title: "Ethereal Dreams",
    description: "A dreamy landscape of soft colors and fluid forms.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530566/wuwegfx0skesxeehpn08.jpg",
  },
  {
    id: "10",
    title: "Textured Reflections",
    description: "An exploration of texture and light in abstract form.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530565/ks0cp5jkxuj6n0drl5rl.jpg",
  },
  {
    id: "11",
    title: "Urban Abstractions",
    description: "City life reimagined through an abstract lens.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530564/txfbavy0jgqmogrt5fv9.jpg",
  },
  {
    id: "12",
    title: "Chromatic Symphony",
    description: "A harmonious blend of colors creating a visual melody.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530565/cwqclxakaljjhacg0le0.jpg",
  },
  {
    id: "13",
    title: "Organic Fluidity",
    description: "Smooth, flowing forms inspired by nature's patterns.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530562/v4ozqiqoegwovddnhgp1.jpg",
  },
  {
    id: "14",
    title: "Celestial Whispers",
    description: "An abstract interpretation of cosmic phenomena.",
    imageUrl: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530560/bm8smhmt5zwxu8tdzceh.jpg",
  },
]

export default function EnhancedAnimatedGallery() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState(10)

  const loadMore = () => {
    setVisibleItems(prevVisible => Math.min(prevVisible + 4, galleryItems.length))
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-start mb-12">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif mb-4"
          >
            Artwork Collections
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
      </div>
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <AnimatePresence>
          {galleryItems.slice(0, visibleItems).map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedId(item.id)}
              className="cursor-pointer relative overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <Expand className="text-white w-10 h-10" />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visibleItems < galleryItems.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Button onClick={loadMore} size="lg" className="bg-black text-white hover:bg-gray-800">
            Load More
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={selectedId}
              className="bg-white p-6 max-w-3xl w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
              {galleryItems.find((item) => item.id === selectedId) && (
                <>
                  <ArtworkDetail/>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}