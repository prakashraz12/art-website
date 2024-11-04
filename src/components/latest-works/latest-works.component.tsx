"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Arts } from "@/lib/types";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { fetchArtsPosts } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ArtworkDetail from "../gallery/art-work-detail.component";

export default function LatestArtwork() {
  const [artworks, setArtworks] = useState<Arts[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const pageSize = 20;

  const loadBlogPosts = useCallback(async () => {
    if (hasLoaded) return;
    setIsLoading(true);
    const { artPosts: newPosts, lastVisibleDoc } = await fetchArtsPosts(
      pageSize,
      lastDoc
    );
    setArtworks(newPosts);
    setLastDoc(lastVisibleDoc);
    setHasLoaded(true);
    setIsLoading(false);
  }, [hasLoaded, lastDoc, pageSize]);

  useEffect(() => {
    if (artworks.length === 0) {
      loadBlogPosts();
    }
  }, [artworks, loadBlogPosts]);

  return (
    <section className="py-16 ">
      <div className="flex justify-center">
        {isLoading && <LoaderCircle className="animate-spin" size={"10rem"} />}
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif mb-4"
            >
              Latest artwork for sale
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 max-w-2xl"
            >
              Some artworks for sell, you will get orginal print of artwork.
              <br />
              Here are some mixed mediums of arts!
            </motion.p>
          </div>
         
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {artworks?.map((artwork, index) => (
            <ArtWorkCard key={artwork.id} artwork={artwork} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ArtWorkCard = ({ artwork, index }: { artwork: Arts; index: number }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          <div className="relative aspect-square mb-4 overflow-hidden bg-[#f5f7f7] ">
            <Image
              src={artwork.profileImage}
              alt={artwork.title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
           {artwork.isSold &&  <div className="w-20 h-20 rounded-full flex justify-center items-center absolute bottom-1 bg-black right-1">
              <p className="text-white">Sold</p>
            </div>}
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">{artwork.mediums}</div>
            <h3 className="text-xl font-medium">{artwork.title}</h3>
            <p className="line-clamp-3">{ artwork.description}</p>
            <div className="text-lg font-medium">
              RS.{artwork.price.toFixed(2)}
            </div>
         
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full p-0">
        <ArtworkDetail artwork={artwork} />
      </DialogContent>
    </Dialog>
  );
};
