"use client"

export default function Banner() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://nunforest.com/Food Store/upload/slide2.jpg"
          alt="Restaurant Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Welcome to <span className="text-amber-400">Food Store</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light">
          Experience culinary excellence in an atmosphere of refined elegance
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection("menu")}
            className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 text-lg font-semibold transition-colors duration-300 transform hover:scale-105"
          >
            Order Now
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Make Reservation
          </button>
        </div>
      </div>
    </section>
  )
}
