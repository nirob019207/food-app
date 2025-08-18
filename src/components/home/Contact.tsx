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

        <div className="mx-auto flex justify-center gap-8 flex-wrap">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Get in Touch</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="bg-amber-500 p-3 rounded-full mb-4">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      123 Culinary Street, Gourmet District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="bg-amber-500 p-3 rounded-full mb-4">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="bg-amber-500 p-3 rounded-full mb-4">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">reservations@Food Store-restaurant.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="bg-amber-500 p-3 rounded-full mb-4">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div className="text-center">
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
          </div>
        </div>
      </div>
    </section>
  )
}