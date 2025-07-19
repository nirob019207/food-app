/* eslint @typescript-eslint/no-explicit-any: "error" */
/* eslint @typescript-eslint/no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */

"use client"
import { useState } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { menuData } from "@/constants/menuItem"
import type { MenuItem } from "@/types/MenuItem"
import { useAppDispatch } from "@/redux/hooks"
import { addToCart } from "@/redux/features/cartSlice"

const categories = [
  { id: "all", name: "All Items", count: menuData.length },
  { id: "appetizers", name: "Appetizers", count: menuData.filter((item) => item.category === "appetizers").length },
  { id: "mains", name: "Main Courses", count: menuData.filter((item) => item.category === "mains").length },
  { id: "desserts", name: "Desserts", count: menuData.filter((item) => item.category === "desserts").length },
  { id: "beverages", name: "Beverages", count: menuData.filter((item) => item.category === "beverages").length },
]

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all")
  const dispatch = useAppDispatch()

  const filteredItems =
    activeCategory === "all" ? menuData : menuData.filter((item) => item.category === activeCategory)

  const handleAddToCart = (item: MenuItem) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      }),
    )

    toast.success(`${item.name} added to cart!`, {
      description: `$${item.price.toFixed(2)}`,
      duration: 2000,
    })
  }

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of dishes, each prepared with the finest ingredients and utmost
            attention to detail.
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-amber-500 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
                  >
                    <Plus size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-xl font-bold text-amber-500">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
