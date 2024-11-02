"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Search,
  ShoppingCart,
  User,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { LOGO_PNG } from "../../../../constant";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "ARTWORK", href: "/artwork" },
  { name: "EXHIBITIONS", href: "/exhibitions" },
  { name: "SHOP", href: "/shop" },
  { name: "CONTACT", href: "/contact" },
];

const socialIcons = [
  { Icon: Instagram, href: "#" },
  { Icon: Facebook, href: "#" },
  { Icon: Twitter, href: "#" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();

  return (
    <header className="p-3">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Social Icons - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            {socialIcons.map(({ Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="text-lg font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="flex gap-4 mt-4">
                    {socialIcons.map(({ Icon, href }, index) => (
                      <motion.a
                        key={index}
                        href={href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="font-serif text-2xl lg:text-3xl italic">
              <Image
                src={LOGO_PNG}
                alt="prakash raz's logo"
                className="object-contain"
                width={100}
                height={100}
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 top-[4.5rem] mt-10">
            <motion.div className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm text-gray-600 hover:text-gray-900 transition-colors ${pathName === item?.href ? "font-bold" :""}  ${pathName === item?.href ? "text-slate-950" :""} `}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">$0.00</span>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
