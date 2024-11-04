"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            playsInline
          >
            <source
              src="https://res.cloudinary.com/du1bbws62/video/upload/v1730718270/fjw0zcymny4bwqdvi7xn.mov"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <Button
              onClick={togglePlay}
              size="lg"
              className="rounded-full w-20 h-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-black transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10" />
              ) : (
                <Play className="w-10 h-10 ml-1" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
