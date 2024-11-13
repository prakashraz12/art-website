/* eslint-disable prefer-const */
"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"

// Sample testimonials data with preview images and ratings
const testimonials = [
  {
    id: 1,
    name: "Sarita Lama",
    avatar: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/453981455_8214030298654183_1569818173648983420_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=dYRPCGDVT-QQ7kNvgF8cHlE&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=A6cYNxT0M8TFpW3INlapYME&oh=00_AYDhZuAMbq0ODfNO6hGsPbaOeMOnD4m5Uwr-hwON6ZfprQ&oe=673A09B7",
    role: "Student and Department of National Park and Wildlife Conservation",
    content: "I’m absolutely delighted with the artwork I ordered! It captures everything I hoped for and more, with stunning details and vibrant colors that bring it to life. The artist’s dedication and skill are clear in every brushstroke. I couldn’t be happier with this beautiful piece and am so satisfied with the entire experience. Highly recommended!",
    previewImage: "https://res.cloudinary.com/du1bbws62/image/upload/v1731471090/fris34lqmg3y5n2xvyop.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarita Lama",
    avatar: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/448227837_7927226344001248_5497687175990543048_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=t30n3VwbSNMQ7kNvgFPY5Cp&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=AkSvBEWxI13Qbk6959fnQu1&oh=00_AYC3EErjjn8sj27wZ-7jBWn4UYoBv4lqJH10-0B8ulF6RQ&oe=6739EB6B",
    role: "Forest Officer at DFO Kavrepalanchok",
    content: "I recently ordered an artwork and am thrilled with the result! The piece exceeded my expectations—it's beautiful, detailed, and crafted with real talent. The entire process was smooth, and the artist was attentive to my vision. I’m truly satisfied with the final piece and would highly recommend their work to anyone looking for quality art.",
    previewImage: "https://res.cloudinary.com/du1bbws62/image/upload/v1731471086/lgyzw7ctkhbitobyfl7i.jpg",
    rating: 5,
  },
  
]

export default function EnhancedTestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

  
    const nextSlide = useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, [])
  
    const prevSlide = useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }, [])
  
    useEffect(() => {
      let timer: NodeJS.Timeout

        timer = setInterval(nextSlide, 5000) // Auto-advance every 5 seconds
      
      return () => clearInterval(timer)
    }, [ nextSlide])
  

  
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl  mb-8 font-serif">Client Testimonials</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-primary/5 border-none shadow-lg">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative h-64 md:h-full group">
                      <Image
                        src={testimonials[currentIndex].previewImage}
                        alt={`Artwork: ${testimonials[currentIndex].name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <p className="text-white text-xl font-semibold">{testimonials[currentIndex].name}</p>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <Quote className="w-10 h-10 text-primary" />
                          <Badge variant="outline" className="text-sm">
                            {testimonials[currentIndex].name}
                          </Badge>
                        </div>
                        <p className="text-lg mb-6">{testimonials[currentIndex].content}</p>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < testimonials[currentIndex].rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center">
                          <Avatar className="mr-4">
                            <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} />
                            <AvatarFallback>{testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{testimonials[currentIndex].name}</p>
                            <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center mt-4 gap-2">
          
          <div className="flex gap-1">
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }