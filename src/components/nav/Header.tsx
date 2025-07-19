"use client"
import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from "@/redux/hooks"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const router = useRouter()
  
  const { itemCount } = useAppSelector((state:any) => state.cart)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "menu", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleCartClick = () => {
    router.push('/cart')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button onClick={() => scrollToSection("home")} className="text-2xl font-bold text-white hover:text-amber-400 transition-colors">
              Food Store
            </button>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {["home", "menu", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 capitalize ${
                    activeSection === item
                      ? "text-amber-400 border-b-2 border-amber-400"
                      : "text-white hover:text-amber-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleCartClick}
              className="relative text-white hover:text-amber-400 transition-colors p-2 rounded-lg hover:bg-white/10"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-amber-400 transition-colors p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["home", "menu", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block px-3 py-2 text-base font-medium text-white hover:text-amber-400 hover:bg-white/10 transition-colors capitalize w-full text-left rounded-lg"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
