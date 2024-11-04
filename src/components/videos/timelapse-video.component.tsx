"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  PlayIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoItem {
  id: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const videoItems: VideoItem[] = [
  {
    id: "1",
    thumbnailUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530573/qrg7frlodlzvgtt5c7jl.jpg",
    videoUrl:
      "https://res.cloudinary.com/du1bbws62/video/upload/v1730555284/srjhmbdlu21adsm2qldz.mp4",
  },
  {
    id: "2",
    thumbnailUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530554/jra2usdo9b2l8j0fukvk.jpg",
    videoUrl:
      "https://res.cloudinary.com/du1bbws62/video/upload/v1730714857/rwkbtophjhxlxigzqfed.mp4",
  },
  {
    id: "3",
    thumbnailUrl:
      "https://res.cloudinary.com/du1bbws62/image/upload/v1730530503/fojetixvbtyyobgzc4z8.jpg",
    videoUrl:
      "https://youtu.be/H7_yY3yr-jE?list=RDJVUQDE8vLxw",
  },
];

export default function VideoGallery() {
  const [visibleItems, setVisibleItems] = useState(8);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const popupVideoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadMore = () => {
    setVisibleItems((prevVisible) =>
      Math.min(prevVisible + 4, videoItems.length)
    );
  };

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
    setIsPlaying(true);
    setIsMuted(false);
  };

  const closeFullscreen = () => {
    setFullscreenIndex(null);
    setIsPlaying(false);
    setIsMuted(true);
  };

  const navigateFullscreen = (direction: "prev" | "next") => {
    if (fullscreenIndex === null) return;
    const newIndex =
      direction === "prev"
        ? (fullscreenIndex - 1 + visibleItems) % visibleItems
        : (fullscreenIndex + 1) % visibleItems;
    setFullscreenIndex(newIndex);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseEnter = (index: number) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(index);
      setIsPopupVisible(true);
    }, 500); // Delay of 500ms before showing the popup
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredIndex(null);
    setIsPopupVisible(false);
  };

  useEffect(() => {
    if (isPopupVisible && popupVideoRef.current) {
      popupVideoRef.current.play();
    }
  }, [isPopupVisible]);

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
            Video Collections
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 max-w-2xl"
          >
            Explore our curated collection of mesmerizing video art. Hover over
            each thumbnail to preview the video.
          </motion.p>
        </div>
      </div>
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        <AnimatePresence>
          {videoItems.slice(0, visibleItems).map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cursor-pointer relative overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05 }}
              onClick={() => openFullscreen(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.thumbnailUrl}
                  alt={item.id}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
               <PlayIcon className="text-white"/>
              </div>
              {hoveredIndex === index && isPopupVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-black"
                >
                  <video
                    ref={popupVideoRef}
                    src={item.videoUrl}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visibleItems < videoItems.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Button
            onClick={loadMore}
            size="lg"
            className="bg-black text-white hover:bg-gray-800"
          >
            Load More
          </Button>
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
                <video
                  ref={videoRef}
                  src={videoItems[fullscreenIndex].videoUrl}
                  className="max-w-full max-h-full object-contain"
                  autoPlay
                  loop
                  muted={isMuted}
                  onClick={togglePlayPause}
                />
              </motion.div>
             
              <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 z-10"
                >
                  {isMuted ? (
                    <VolumeX className="w-8 h-8" />
                  ) : (
                    <Volume2 className="w-8 h-8" />
                  )}
                </button>
                <button
                  onClick={togglePlayPause}
                  className="text-white hover:text-gray-300 z-10"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
