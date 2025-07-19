import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to experience Food Store? Make a reservation or get in touch with us today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-500 p-3 rounded-full">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600">
                    123 Culinary Street, Gourmet District
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-500 p-3 rounded-full">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-500 p-3 rounded-full">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">reservations@Food Store-restaurant.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-500 p-3 rounded-full">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Hours</h4>
                  <p className="text-gray-600">
                    Monday - Thursday: 5:00 PM - 10:00 PM
                    <br />
                    Friday - Saturday: 5:00 PM - 11:00 PM
                    <br />
                    Sunday: 4:00 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Make a Reservation</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all">
                  <option>Select Time</option>
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                  <option>7:00 PM</option>
                  <option>8:00 PM</option>
                  <option>9:00 PM</option>
                </select>
              </div>

              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all">
                <option>Number of Guests</option>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5+ Guests</option>
              </select>

              <textarea
                placeholder="Special Requests (Optional)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Make Reservation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
