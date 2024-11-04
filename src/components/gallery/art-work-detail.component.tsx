"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {Instagram, Linkedin, Mail, Phone, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Arts } from "@/lib/types";

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
    value: "@prakashraz",
    link: "https://www.instagram.com/mr.prakashraz/",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    name: "Email",
    value: "rzprakash16@gmail.com",
    link: "mailto:rzprakash16@gmail.com",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    name: "LinkedIn",
    value: "Prakash Raz",
    link: "www.linkedin.com/in/prakash-raz-shrestha-a14706172",
  },
];

export default function Component({ artwork }: { artwork: Arts }) {
  const [selectedImage, setSelectedImage] = useState(artwork.profileImage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactSeller, setIsCOntactSellerOpen] = useState(false);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={selectedImage}
              alt={selectedImage}
              fill
              className="object-cover"
            />
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <button
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  aria-label="View full image"
                >
                  <Search className="w-5 h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none overflow-auto">
                <div className="relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute -top-12 right-0 text-white hover:text-gray-300"
                    aria-label="Close full image view"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <Image
                    src={selectedImage}
                    alt={selectedImage}
                    width={1200}
                    height={1200}
                    className="w-full h-auto"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-4">
            {artwork.images?.map((image) => (
              <motion.button
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedImage === image ? "ring-2 ring-primary" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={image}
                  alt={image}
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
            {artwork.mediums}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold">{artwork.title }</h1>
          <p className="text-2xl md:text-3xl font-bold">Rs.{ artwork?.price}</p>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Artist</h3>
              <p className="mt-1">Prakash Raz Shrestha</p>
            </div>

          
            <div>
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <p className="mt-1 text-gray-600">
              {artwork?.description}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t">
            <div className="flex flex-col sm:flex-row items-center gap-4">
             
              <Button className="w-full sm:w-auto flex-1" onClick={()=>setIsCOntactSellerOpen(true)}>Contact Seller</Button>
            </div>
            {
              isContactSeller && <div className="grid gap-4 py-4">
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
            }
          </div>
        </div>
      </div>
    </div>
  );
}
