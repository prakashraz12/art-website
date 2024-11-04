"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Mail, Instagram, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ContactSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      name: "WhatsApp",
      value: "+977 9861375362",
      link: "https://wa.me/9861374362",
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      name: "Instagram",
      value: "@artisthandle",
      link: "https://www.instagram.com/mr.prakashraz/",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      name: "Email",
      value: "artist@example.com",
      link: "mailto:rzprakash16@gmail.com",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: "LinkedIn",
      value: "Artist Name",
      link: "www.linkedin.com/in/prakash-raz-shrestha-a14706172",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Palette className="w-16 h-16 mx-auto text-primary mb-6" />
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Want to Order a Portrait?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Capture a moment, a loved one, or yourself in a timeless piece of
            art. Our custom portraits bring your memories to life with exquisite
            detail and emotion.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="group relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Contact Me
                  <Mail className="ml-2 w-5 h-5" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary-dark"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? 0 : "-100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Contact Us</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {contactMethods?.map((method, index) => (
                  <motion.a
                    key={method.name}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {method.icon}
                    <div className="ml-4">
                      <p className="font-semibold">{method.name}</p>
                      <p className="text-sm text-gray-600">{method.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}
