import { Award, ChefHat, Users } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
               Late Night Food Bashundhara has been serving exceptional cuisine that combines traditional techniques with
              modern innovation. Our commitment to using only the finest ingredients and creating memorable dining
              experiences has made us a cornerstone of the culinary scene.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Every dish tells a story, crafted with passion and presented with artistry. We believe that dining is not
              just about food, but about creating moments that last a lifetime.
            </p>

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900">Award Winning</h3>
                <p className="text-sm text-gray-600">Michelin Star Restaurant</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChefHat className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900">Expert Chefs</h3>
                <p className="text-sm text-gray-600">World-class culinary team</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900">Premium Service</h3>
                <p className="text-sm text-gray-600">Exceptional hospitality</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/placeholder.svg?height=600&width=500"
              alt="Restaurant Dining Room"
              className="w-full h-96 object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-500 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-2xl font-bold">13+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
