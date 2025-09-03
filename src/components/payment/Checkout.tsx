/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import type React from "react"
import { ArrowLeft, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { clearCart } from "@/redux/features/cartSlice"
import { useCreateOrderMutation } from "@/redux/api/orderApi"

const paymentMethods = [
  {
    id: "cash",
    name: "Cash on Delivery",
    icon: Wallet,
    description: "Pay when your order arrives",
  },
]

// Generate blocks A to Z
const blocks = Array.from({ length: 26 }, (_, i) => `Block ${String.fromCharCode(65 + i)}`)

interface DecodedToken {
  userId: string;
  [key: string]: any;
}

export default function CheckoutPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { items, total, itemCount } = useAppSelector((state: any) => state.cart)
  const [createOrder, { isLoading }] = useCreateOrderMutation()
  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress: "", // This will store the selected block (e.g., "Block A")
    address: "",
    phoneNumber: "",
  })

  // Retrieve delivery charge from local storage
  const deliveryCharge = parseFloat(localStorage.getItem("deliveryCharge") || "0")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBlockChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      streetAddress: value,
    }))
  }

  const handlePlaceOrder = async () => {
    // Validate form fields
    if (!formData.fullName.trim() || !formData.streetAddress.trim() || !formData.address.trim() || !formData.phoneNumber.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    // Prepare order data, concatenating streetAddress (block) and address
    const orderData: {
      fullName: string;
      address: string;
      phoneNumber: string;
      items: { productId: string; quantity: number }[];
      userId?: string;
    } = {
      fullName: formData.fullName.trim(),
      address: `${formData.streetAddress.trim()}, ${formData.address.trim()}`,
      phoneNumber: formData.phoneNumber.trim(),
      items: items.map((item: any) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    }

    // Check for accessToken and extract userId if present
    const accessToken = Cookies.get("accessToken")
    if (accessToken) {
      try {
        const decoded: DecodedToken = jwtDecode(accessToken)
        if (decoded.id) {
          orderData.userId = decoded.id
        }
      } catch (error) {
        console.warn("Failed to decode access token:", error)
        toast.error("Invalid authentication token. Proceeding as guest.", {
          duration: 5000,
        })
      }
    }

    // Show loading toast
    const toastId = toast.loading("Processing your order...")
    console.log(orderData)

    try {
      // Call createOrder API
      await createOrder(orderData).unwrap()

      // Clear cart and delivery charge after successful order
      dispatch(clearCart())
      localStorage.removeItem("deliveryCharge")

      // Show success toast
      toast.success("Order placed successfully!", {
        id: toastId,
        description: "You will receive a confirmation soon.",
        duration: 5000,
      })

      // Redirect to home
      router.push("/")
    } catch (error) {
      // Show error toast
      toast.error("Failed to place order. Please try again.", {
        id: toastId,
        duration: 5000,
      })
      console.error("Order creation failed:", error)
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
              <Button
                onClick={() => router.push("/")}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                Browse Menu
              </Button>
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
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50">
                  <Wallet size={24} className="text-gray-600" />
                  <div className="flex-1">
                    <p className="font-medium">{paymentMethods[0].name}</p>
                    <p className="text-sm text-gray-600">{paymentMethods[0].description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="streetAddress">Block *</Label>
                  <Select
                    name="streetAddress"
                    value={formData.streetAddress}
                    onValueChange={handleBlockChange}
                    required
                  >
                    <SelectTrigger id="streetAddress" className="mt-1">
                      <SelectValue placeholder="Select a block" />
                    </SelectTrigger>
                    <SelectContent>
                      {blocks.map((block) => (
                        <SelectItem key={block} value={block}>
                          {block}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="address">Additional Adress(such as Road No and house No) *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter city and additional details"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                    className="mt-1"
                  />
                </div>
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
                  {items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">৳ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                    <span>৳ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charge</span>
                    <span>৳ {deliveryCharge.toFixed(2)}</span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">৳ {(total + deliveryCharge).toFixed(2)}</span>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3"
                  size="lg"
                >
                  {isLoading ? "Processing..." : "Place Order"}
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