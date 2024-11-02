'use client'

import { motion } from "framer-motion"
import { Instagram, Facebook, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutComponent() {
  return (
    <section className="relative overflow-hidden bg-[#f5f7f7] py-24">
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
            The energy I put into aliquet cursus er integer urna, vestibulum cras bibendum
            diam sem eros amet malesuada.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-gray-600"
          >
            <p>
              Imperdiet quis sollicitudin vulputate velit id eget donec sed adipiscing
              turpis tristique aenean nulla dolor eu in habitasse vestibulum, blandit sem
              sed tempus.
            </p>
            <p>
              Malesuada id lorem non magna tortor duis sit blandit pulvinar enim turpis
              dui purus augue nec, eget sit sapien aliquam iaculis at erat sit porttitor
              massa tristique feugiat aliquam pellentesque vulputate tincidunt augue at
              duis mauris dictum urna amet ut quisque
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <Button
              variant="link"
              className="text-gray-900 font-medium group"
            >
              READ MORE
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Social Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold mb-2">
              <Instagram className="w-6 h-6 text-[#E4405F]" />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                1.8M+
              </motion.span>
            </div>
            <p className="text-sm text-gray-600 uppercase tracking-wider">Followers</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold mb-2">
              <svg className="w-6 h-6 text-[#34526f]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.512 17.18c-.096-.141-.19-.277-.282-.411a7.232 7.232 0 0 0-.874-1.025c-.063-.062-.114-.13-.176-.192-.062-.063-.128-.113-.192-.176a7.232 7.232 0 0 0-1.025-.874c-.134-.092-.27-.186-.411-.282.726-.353 1.384-.742 1.962-1.163 1.159-.846 1.974-1.66 2.12-1.808l.087-.088c.186-.187.304-.443.304-.726a1.026 1.026 0 0 0-1.755-.726c-.147.147-.961.962-1.808 2.12-.42.578-.81 1.236-1.163 1.962-.096-.141-.19-.277-.282-.411a7.232 7.232 0 0 0-.874-1.025c-.063-.062-.114-.13-.176-.192-.062-.063-.128-.113-.192-.176a7.232 7.232 0 0 0-1.025-.874c-.134-.092-.27-.186-.411-.282.726-.353 1.384-.742 1.962-1.163 1.159-.846 1.974-1.66 2.12-1.808l.087-.088c.186-.187.304-.443.304-.726a1.026 1.026 0 0 0-1.755-.726" />
              </svg>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                800K+
              </motion.span>
            </div>
            <p className="text-sm text-gray-600 uppercase tracking-wider">Readers</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold mb-2">
              <Facebook className="w-6 h-6 text-[#1877F2]" />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                1.2M+
              </motion.span>
            </div>
            <p className="text-sm text-gray-600 uppercase tracking-wider">Likes</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}