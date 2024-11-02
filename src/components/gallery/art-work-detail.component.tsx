"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Minus, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ArtworkImage {
  id: string;
  url: string;
  alt: string;
}

const artworkImages: ArtworkImage[] = [
  {
    id: "1",
    url: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530566/wuwegfx0skesxeehpn08.jpg",
    alt: "Analogue - Main View",
  },
  {
    id: "2",
    url: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530565/ks0cp5jkxuj6n0drl5rl.jpg",
    alt: "Analogue - Detail View 1",
  },
  {
    id: "3",
    url: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530564/txfbavy0jgqmogrt5fv9.jpg",
    alt: "Analogue - Detail View 2",
  },
  {
    id: "4",
    url: "https://res.cloudinary.com/du1bbws62/image/upload/v1730530562/v4ozqiqoegwovddnhgp1.jpg",
    alt: "Analogue - Detail View 3",
  },
];

const mediums = ["Pencil", "Charcoal", "Acrylic", "Oil Paint"];

export default function ArtworkDetail() {
  const [selectedImage, setSelectedImage] = useState(artworkImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/abstract" className="hover:text-gray-900">
          Abstract
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Analogue</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              fill
              className="object-cover"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-4">
            {artworkImages.map((image) => (
              <motion.button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedImage.id === image.id ? "ring-2 ring-black" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <Badge variant="secondary" className="mb-2">
            Abstract
          </Badge>
          <h1 className="text-4xl font-bold">Analogue</h1>
          <p className="text-3xl font-bold">$800.00</p>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Artist</h3>
              <p className="mt-1">John Alvin</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Mediums Used
              </h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {mediums.map((medium) => (
                  <Badge key={medium} variant="outline">
                    {medium}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Completed</h3>
              <p className="mt-1">October 2023</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <p className="mt-1 text-gray-600">
                Diam praesent urna ullamcorper orci cursus integer ullamcorper
                enim ac lorem scelerisque faucibus dignissim eget sapien
                fermentum sit facilisis augue at sollicitudin nulla vestibulum
                facilisi hendrerit.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-center min-w-[3rem]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button className="flex-1">Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                width={1200}
                height={1200}
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
