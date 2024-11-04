"use client";

import { motion } from "framer-motion";
import VideoShowcase from "../video-case/video-showcase";

export default function AboutComponent() {
  return (
    <section className="relative overflow-hidden  py-24">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute left-0 bottom-0 h-full w-full"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0 800C300 600 400 400 1200 600V800H0Z"
            fill="#84cc16"
            fillOpacity="0.2"
          />
          <motion.path
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            d="M1200 800C900 600 800 400 0 600V800H1200Z"
            fill="#f97316"
            fillOpacity="0.2"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* About Content */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif font-medium mb-8 leading-tight"
          >
            &ldquo;Art is the silent expression of the soul, a language that
            speaks without words, yet touches hearts across time and
            space.&rdquo;
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-gray-600"
          >
            <p>
              Hi, I’m Prakash Raz Shrestha—a portrait artist and self-taught
              developer from Nepal. Art has been a significant part of my life,
              and I love capturing people’s emotions and stories through my
              portraits. Alongside my artistic journey, I’ve developed a passion
              for coding and building applications, merging creativity and
              technology to bring unique ideas to life. On this website, you’ll
              find a collection of my art pieces, each crafted with dedication
              and attention to detail.
              <br />
              Whether you’re an art enthusiast or just
              curious to see my work, I hope you enjoy exploring my gallery.
              Feel free to reach out if you’re interested in custom portraits or
              have any questions. Thank you for visiting—I’m thrilled to share
              my art with you!
            </p>
          
          </motion.div>
          <VideoShowcase />
        </div>
      </div>
    </section>
  );
}
