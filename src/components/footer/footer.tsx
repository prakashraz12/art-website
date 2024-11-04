import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 sm:mb-0">
            © {currentYear} All rights reserved
          </p>
          <Image
            src="https://res.cloudinary.com/du1bbws62/image/upload/v1730345138/nakurirruzfzo8ykbdyl.png"
            alt="Company Logo"
            width={100}
            height={100}
            className="w-auto"
          />
        </div>
      </div>
    </footer>
  )
}