import React, { useEffect, useState } from 'react'
import { ChevronRight, CreditCard, ShoppingBag, Truck, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link, useLocation, useNavigate } from 'react-router-dom'
const CheckoutStep = "information" | "shipping" | "payment"
const CheckoutPage = () => {
    const location = useLocation()
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        // First try to get cartItems from location.state
        if (location.state?.cartItems?.length > 0) {
          setCartItems(location.state.cartItems)
          localStorage.setItem("checkoutCart", JSON.stringify(location.state.cartItems))
        } else {
          // Fallback to localStorage to persist across steps
          const stored = localStorage.getItem("checkoutCart")
          if (stored) {
            setCartItems(JSON.parse(stored))
          }
        }
      }, [location.state])
    const [currentStep, setCurrentStep] = useState("information")
  const [formData, setFormData] = useState({
    // Personal information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Shipping information
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    saveAddress: false,

    // Payment information
    paymentMethod: "razorpay",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  })
  const itemTotal = cartItems.reduce((total, item) => total + item.discountPrice * item.quantity, 0)
  const discount = cartItems.reduce((total, item) => total + (item.price - item.discountPrice) * item.quantity, 0)
  const deliveryCharge = itemTotal > 499 ? 0 : 99
  const totalAmount = itemTotal + deliveryCharge
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentStep === "information") {
      setCurrentStep("shipping")
    } else if (currentStep === "shipping") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      handlePayment()
    }
  }

  const handlePayment = async () => {
    try {
      setIsLoading(true)
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, we'll just redirect to a success page
      // In a real app, you would integrate with Razorpay here
      navigate("/checkout/success")
      localStorage.removeItem("checkoutCart")
      localStorage.removeItem("cart")
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Render the current step form
  const renderStepForm = () => {
    switch (currentStep) {
      case "information":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>
        )

      case "shipping":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Shipping Address</h2>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Telangana">Telangana</SelectItem>
                    <SelectItem value="AndraPradesh">AndraPradesh</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "payment":
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Payment Method</h2>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => handleRadioChange("paymentMethod", value)}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="razorpay" id="razorpay" />
                <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                  <div className="flex items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjI_0PiTEc-i0qpyx4LqPMErozXYzVLxHguh1tTAkUSCDznLIPUFXoAlXF3GBLsX5bbn0&usqp=CAU"
                      alt="Razorpay"
                      width={80}
                      height={30}
                      className="mr-2"
                    />
                    <span>Pay with Razorpay</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  Cash on Delivery
                </Label>
              </div>
            </RadioGroup>

            {formData.paymentMethod === "razorpay" && (
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500 mb-2">
                  You will be redirected to Razorpay to complete your payment securely.
                </p>
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-gray-400" />
                  <span className="text-sm">All major credit/debit cards and UPI accepted</span>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }
  return (
    <div className="px-4 md:px-8 py-8">
      <div className="flex items-center text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <Link to="/cart" className="text-gray-500 hover:text-primary">
          Cart
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
        <span className="font-medium">Checkout</span>
      </div>

      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <div className="w-auto md:w-2/3">
          {/* Checkout steps */}
          <div className="bg-white rounded-lg shadow-sm p-2 md:p-6 mb-6">
            <div className="flex items-center mb-6">
              <div
                className={`flex items-center ${
                  currentStep === "information" || currentStep === "shipping" || currentStep === "payment"
                    ? "text-primary"
                    : "text-gray-400"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span className="ml-2 font-medium">Information</span>
              </div>
              <div className="w-12 h-0.5 mx-2 bg-gray-200"></div>
              <div
                className={`flex items-center ${
                  currentStep === "shipping" || currentStep === "payment" ? "text-primary" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full ${
                    currentStep === "shipping" || currentStep === "payment"
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-400"
                  } flex items-center justify-center`}
                >
                  <Truck className="h-4 w-4" />
                </div>
                <span className="ml-2 font-medium">Shipping</span>
              </div>
              <div className="w-12 h-0.5 mx-2 bg-gray-200"></div>
              <div className={`flex items-center ${currentStep === "payment" ? "text-primary" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full ${
                    currentStep === "payment" ? "bg-primary text-white" : "bg-gray-200 text-gray-400"
                  } flex items-center justify-center`}
                >
                  <CreditCard className="h-4 w-4" />
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {renderStepForm()}

              <div className="flex justify-between mt-8">
                {currentStep !== "information" ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep === "payment" ? "shipping" : "information")}
                  >
                    Back
                  </Button>
                ) : (
                  <Link to="/cart">
                    <Button type="button" variant="outline">
                      Return to Cart
                    </Button>
                  </Link>
                )}
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Processing..." : currentStep === "payment" ? "Complete Order" : "Continue"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex">
                  <div className="w-16 h-20 relative rounded overflow-hidden flex-shrink-0">
                    <img src={item.images || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-sm">{item.brand}</p>
                    <p className="text-gray-600 text-xs">{item.name}</p>
                    <div className="mt-1 text-xs text-gray-500">
                      <span>Size: {item.selectedSize}</span>
                      <span className="ml-2">Color: {item.selectedColor}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs">Qty: {item.quantity}</span>
                      <span className="font-medium text-sm">₹{item.discountPrice * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Item Total</span>
                <span>₹{itemTotal}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charge</span>
                <span>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <ShoppingBag className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-sm font-medium">Delivery Information</span>
              </div>
              <p className="text-xs text-gray-500">Estimated delivery: 3-5 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage