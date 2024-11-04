"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { HERO_IMAGE } from "../../../constant";
export default function HeroComponent() {
  return (
    <div className="min-h-screen  relative px-4 md:px-8">
      <div className="absolute top-0 left-0 text-[40rem] font-serif text-gray-50/20 select-none pointer-events-none leading-none">
        P
      </div>
      <div className="flex justify-center">
        <Image
          src={
            "https://res.cloudinary.com/du1bbws62/image/upload/v1730345138/er5z3iq9h5dgirh1s0va.png"
          }
          alt="prakash raz's logo"
          className="object-contain"
          width={200}
          height={200}
        />
        </div>
      <div className="max-w-7xl mx-auto pt-32 md:pt-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6">
              Prakash
              <br />
              Raz
              <br />
              Shrestha
            </h1>
            <div className="space-y-2 text-gray-600">
              <p className="text-lg">Potrait Artist.</p>
              <p className="text-lg">Software Developer.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:col-span-1"
          >
            <div className="relative aspect-[3/4] shadow-2xl">
              <Image
                src={HERO_IMAGE}
                alt="painting work by prakash raz shrestha"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="relative">
              <div className="w-12 h-0.5 bg-red-500 mb-6"></div>
              <p className="text-gray-600 leading-relaxed">
              &ldquo;Art enables us to find ourselves and lose ourselves at the same time.&rdquo; – Thomas Merton
              
              </p>
            </div>
          </motion.div>
        </div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center hidden md:block"
        >
          <button
            className="group flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <span className="text-sm uppercase tracking-wider mb-2">
              Explore More
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
      </div>
    </div>
  );
}
