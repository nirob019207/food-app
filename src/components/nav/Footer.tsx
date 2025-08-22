"use client"

import Image from "next/image"
import logo from "@/assets/logo.png" // Ensure this path is correct

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <Image src="https://nyc3.digitaloceanspaces.com/smtech-space/files/d330a925-4680-435a-92b2-ecad3674ab9b.png" alt="Logo" width={40} height={40}  />
            </h3>
            <p className="text-gray-400 mb-4">Experience culinary excellence in an atmosphere of refined elegance.</p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">i</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => scrollToSection("home")} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:text-amber-400 transition-colors">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("menu")} className="hover:text-amber-400 transition-colors">
                  Menu
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="hover:text-amber-400 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>01711-090470</li>
              <li>latenightfoodbashundhara@gmail.com</li>
            </ul>
          </div>

          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Mon - Thu: 5:00 PM - 10:00 PM</li>
              <li>Fri - Sat: 5:00 PM - 11:00 PM</li>
              <li>Sunday: 4:00 PM - 9:00 PM</li>
            </ul>
          </div> */}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Late Night Food Bashundhara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
