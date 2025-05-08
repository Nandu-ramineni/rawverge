import React from 'react'
import { CheckCircle, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
const CheckoutSuccess = () => {
    const orderNumber = `RV${Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")}`
  return (
    <div className="container py-12 max-w-md mx-auto text-center">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Order Number:</span>
            <span className="font-medium">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Delivery:</span>
            <span className="font-medium">3-5 business days</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-3 text-gray-400" />
            <div className="text-left">
              <p className="font-medium">Order Confirmation</p>
              <p className="text-sm text-gray-500">We've sent a confirmation to your email</p>
            </div>
          </div>
          <div className="flex items-center">
            <Package className="h-5 w-5 mr-3 text-gray-400" />
            <div className="text-left">
              <p className="font-medium">Tracking Information</p>
              <p className="text-sm text-gray-500">You'll receive tracking details once your order ships</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/profile">View Order</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


export default CheckoutSuccess