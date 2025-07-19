"use client"

import type React from "react"

import { useState } from "react"
import { X, Lock, CheckCircle } from "lucide-react"

interface PaymentModalProps {
  total: number
  onClose: () => void
  onSuccess: () => void
}

export default function Payment({ total, onClose, onSuccess }: PaymentModalProps) {
  const [step, setStep] = useState<"payment" | "processing" | "success">("payment")
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    address: "",
    city: "",
    zipCode: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep("processing")

    // Simulate payment processing
    setTimeout(() => {
      setStep("success")
      setTimeout(() => {
        onSuccess()
      }, 2000)
    }, 3000)
  }

  return (
    <div className="fixed inset-0 z-60 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={step === "payment" ? onClose : undefined} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          {step === "payment" && (
            <>
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">Payment Details</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      required
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Lock size={20} />
                    Pay ${total.toFixed(2)}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  <Lock size={12} className="inline mr-1" />
                  Your payment information is secure and encrypted
                </p>
              </form>
            </>
          )}

          {step === "processing" && (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we process your payment...</p>
            </div>
          )}

          {step === "success" && (
            <div className="p-12 text-center">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">Your order has been confirmed and will be prepared shortly.</p>
              <p className="text-sm text-gray-500">You will receive an email confirmation shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
