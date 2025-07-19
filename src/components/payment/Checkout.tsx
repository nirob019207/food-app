/* eslint @typescript-eslint/no-explicit-any: "error" */
/* eslint @typescript-eslint/no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */

"use client"
import { useState } from "react"
import type React from "react"

import { ArrowLeft, CreditCard, Smartphone, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { clearCart } from "@/redux/features/cartSlice"

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Pay with your credit or debit card",
  },
 
  {
    id: "cash",
    name: "Cash on Delivery",
    icon: Wallet,
    description: "Pay when your order arrives",
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { items, total, itemCount } = useAppSelector((state:any) => state.cart)

  const [selectedPayment, setSelectedPayment] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    notes: "",
  })

  const deliveryFee = 3.99
  const tax = total * 0.08
  const finalTotal = total + deliveryFee + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePlaceOrder = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields")
      return
    }

    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    setIsProcessing(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart after successful order
      dispatch(clearCart())

      toast.success("Order placed successfully!", {
        description: "You will receive a confirmation email shortly.",
      })

      // Redirect to success page or home
      router.push("/")
    } catch (error) {
      toast.error("Failed to place order. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some items to your cart before checkout.</p>
              <Button onClick={() => router.push("/")}>Browse Menu</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft size={20} />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your delivery address"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="Enter ZIP code"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Special Instructions</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for delivery..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <div
                        key={method.id}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Icon size={24} className="text-gray-600" />
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="font-medium cursor-pointer">
                            {method.name}
                          </Label>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item:any) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">${finalTotal.toFixed(2)}</span>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3"
                  size="lg"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
