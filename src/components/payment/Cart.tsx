/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { clearCart, removeFromCart, updateQuantity } from "@/redux/features/cartSlice"

// Modal component for login prompt
const LoginModal = ({ isOpen, onClose, onContinueAsGuest }: { isOpen: boolean, onClose: () => void, onContinueAsGuest: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">Please log in to proceed with checkout, or continue as a guest.</p>
        <div className="flex gap-4">
          <Button
            onClick={() => window.location.href = "/login"}
            className="bg-amber-500 hover:bg-amber-600 text-white flex-1"
          >
            Log In
          </Button>
          <Button
            onClick={onContinueAsGuest}
            variant="outline"
            className="flex-1"
          >
            Continue as Guest
          </Button>
        </div>
        <Button
          variant="ghost"
          onClick={onClose}
          className="mt-4 w-full text-gray-600"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default function Cart() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { items, total, itemCount } = useAppSelector((state: any) => state.cart)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id))
      toast.success("Item removed from cart")
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id: string, name: string) => {
    dispatch(removeFromCart(id))
    toast.success(`${name} removed from cart`)
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast.success("Cart cleared")
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    const accessToken = Cookies.get("accessToken")
    
    if (accessToken) {
      // User is authenticated, proceed to checkout
      router.push("/checkout")
    } else {
      // Show login modal for anonymous users
      setIsModalOpen(true)
    }
  }

  const handleContinueAsGuest = () => {
    setIsModalOpen(false)
    router.push("/checkout") // Redirect to placeholder page for anonymous users
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>

          <Card className="text-center py-12">
            <CardContent className="flex flex-col items-center gap-4">
              <ShoppingBag size={64} className="text-gray-400" />
              <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
              <p className="text-gray-600">Add some delicious items from our menu!</p>
              <Button onClick={() => router.push("/")} className="bg-amber-500 hover:bg-amber-600 text-white">
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft size={20} />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>

          <Button
            variant="outline"
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items?.map((item: any) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      <p className="text-sm text-gray-600 capitalize mb-3">{item.category}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus size={14} />
                          </Button>

                          <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus size={14} />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-amber-600">৳ {(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">৳ {item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items ({itemCount})</span>
                  <span className="font-medium">৳ {total.toFixed(2)}</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">৳ {total.toFixed(2)}</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>

                <Button variant="outline" onClick={() => router.push("/")} className="w-full">
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Login Modal */}
        <LoginModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onContinueAsGuest={handleContinueAsGuest}
        />
      </div>
    </div>
  )
}