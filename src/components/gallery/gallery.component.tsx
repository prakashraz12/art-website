"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

interface GalleryItem {
  id: string;
  imageUrl: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530576/opbbddatby1wcl7wphai.jpg",
  },
  {
    id: "2",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530576/lvdue8gbp4wuyi0qtzcd.jpg",
  },
  {
    id: "3",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530575/m1jxtgnpknhvv3lxkrxr.jpg",
  },
  {
    id: "4",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530573/qrg7frlodlzvgtt5c7jl.jpg",
  },
  {
    id: "5",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530572/f2r5exajp2mbko8io6yv.jpg",
  },
  {
    id: "6",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530572/bplvwkbsmaucg0wdx71g.jpg",
  },
  {
    id: "7",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530570/gx1bheov7y7eeovchc3f.jpg",
  },
  {
    id: "8",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530568/nmgdypy0jglubknzqiyu.png",
  },
  {
    id: "9",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530566/wuwegfx0skesxeehpn08.jpg",
  },
  {
    id: "10",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530565/ks0cp5jkxuj6n0drl5rl.jpg",
  },
  {
    id: "11",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530564/txfbavy0jgqmogrt5fv9.jpg",
  },
  {
    id: "12",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530565/cwqclxakaljjhacg0le0.jpg",
  },
  {
    id: "13",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530562/v4ozqiqoegwovddnhgp1.jpg",
  },
  {
    id: "29",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530560/bm8smhmt5zwxu8tdzceh.jpg",
  },
  {
    id: "14",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730550223/xlp5jfylnxycmdydxuae.jpg",
  },
  {
    id: "15",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730550223/zcapsz70pe8ftjilp5ip.jpg",
  },
  {
    id: "16",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530569/taa03sdx1f0ypjfcqbhq.jpg",
  },
  {
    id: "17",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530561/lbfu1yxshlhvkq6pnfpv.jpg",
  },
  {
    id: "18",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530556/xafkivke0m3wpok6hjek.jpg",
  },
  {
    id: "19",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530554/jra2usdo9b2l8j0fukvk.jpg",
  },
  {
    id: "20",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530551/wgryh5ybgwrls7tiygr8.jpg",
  },
  {
    id: "21",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530550/g9hgqfztklkk0ezsywie.jpg",
  },
  {
    id: "23",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530550/agwuft2zznoc1ec3tode.jpg",
  },
  {
    id: "24",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530547/rtsllajwgsknsishmgsm.jpg",
  },
  {
    id: "25",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530546/qnnxkrxs63nb9x3fjnpn.jpg",
  },
  {
    id: "26",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530505/riixpmqykryvbsl6tdr9.jpg",
  },
  {
    id: "27",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530504/vhkcaaygtd8rxqez1xkx.jpg",
  },
  {
    id: "22",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530505/yeezlzlul1lfyg1gelea.jpg",
  },
  {
    id: "28",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530579/mnhhazpggvkhdvd8prkp.jpg",
  },
  {
    id: "29",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730554581/kygsdrqc3w004u7rig8l.jpg",
  },
  {
    id: "30",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730554580/h00egtmfzwc5pp3prqxx.jpg",
  },
  {
    id: "31",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730554580/sfqo6ltvvnhkobtxzahi.jpg",
  },
  {
    id: "32",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730554580/yxa3gwhhecwto29qlyg1.jpg",
  },
  {
    id: "33",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730554580/tuh4ies9qtcm5hqkimsh.jpg",
  },
  {
    id: "34",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730554580/casgz3d2qjjdw7wlrbds.jpg",
  },
  {
    id: "35",
    imageUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530579/vi07bneliwo4ixe0by50.jpg",
  },
];

export default function EnhancedAnimatedGallery() {
  const [visibleItems, setVisibleItems] = useState(4);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const loadMore = () => {
    setVisibleItems((prevVisible) =>
      Math.min(prevVisible + 4, galleryItems.length)
    );
  };

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenIndex(null);
  };

  const navigateFullscreen = (direction: "prev" | "next") => {
    if (fullscreenIndex === null) return;
    const newIndex =
      direction === "prev"
        ? (fullscreenIndex - 1 + visibleItems) % visibleItems
        : (fullscreenIndex + 1) % visibleItems;
    setFullscreenIndex(newIndex);
  };

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
            This is my artwork collection, made from different mediums.
          </motion.p>
        </div>
      </div>
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"
      >
        <AnimatePresence>
          {galleryItems.slice(0, visibleItems).map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openFullscreen(index)}
              className="cursor-pointer relative overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={item.imageUrl}
                alt={item.id}
                width={300}
                height={200}
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
         <button
            className="group flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors"
            onClick={loadMore}
          >
            <span className="text-sm uppercase tracking-wider mb-2">
              Load More
            </span>
            <motion.div
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {fullscreenIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={closeFullscreen}
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeFullscreen}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="w-8 h-8" />
              </button>
              <button
                onClick={() => navigateFullscreen("prev")}
                className="absolute left-4 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>
              <button
                onClick={() => navigateFullscreen("next")}
                className="absolute right-4 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="w-12 h-12" />
              </button>
              <motion.div
                key={fullscreenIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center"
              >
                <Image
                  src={galleryItems[fullscreenIndex].imageUrl}
                  alt={galleryItems[fullscreenIndex].id}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
