import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Minus, Plus, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
        localStorage.setItem("cart", JSON.stringify(cartItems.filter((item) => item.id !== id)))
    }

    // Calculate cart totals
    const itemTotal = cartItems.reduce((total, item) => total + item.discountPrice * item.quantity, 0)
    const discount = cartItems.reduce((total, item) => total + (item.price - item.discountPrice) * item.quantity, 0)
    const deliveryCharge = itemTotal > 799 ? 0 : 99
    const totalAmount = itemTotal + deliveryCharge
    useEffect(() => {
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart)
            const validatedCart = parsedCart.map((item) => ({
                ...item,
                price: Number(item.price) || 0,
                discountPrice: Number(item.discountPrice) || 0,
                quantity: Number(item.quantity) || 1,
            }))
            setCartItems(validatedCart)
        }
    }, [])

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!")
            return
        }
        navigate("/checkout", { state: { cartItems } })
    }
    
    return (
        <div className="px-4 md:px-8 py-2 md:py-8">
            <h1 className="text-2xl font-bold mb-6">Shopping Bag</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/emptybag-8316260-6632280.png?f=webp" alt="Empty Cart" className="h-56 w-56 mb-4" />
                    <h2 className="text-xl font-medium mb-4">Your shopping bag is empty</h2>
                    <p className="text-gray-500 mb-6">Add items to your bag to checkout</p>
                    <Button asChild>
                        <Link to="/">CONTINUE SHOPPING</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-md shadow-sm">
                            {cartItems.map((item, index) => (
                                <div key={item.id}>
                                    <div className="p-4 flex">
                                        <div className="w-24 h-32 relative rounded overflow-hidden flex-shrink-0">
                                            <img src={item.images || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-medium">{item.brand}</h3>
                                                    <p className="text-gray-600 text-sm">{item.name}</p>
                                                    <div className="mt-1 text-sm text-gray-500">
                                                        <span>Size: {item.selectedSize}</span>
                                                        <span className="ml-4">Color: {item.selectedColor}</span>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                            <div className="mt-4 flex justify-between items-end">
                                                <div className="flex items-center border rounded-md">
                                                    <button className="px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="px-4 py-1 border-x">{item.quantity}</span>
                                                    <button className="px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">₹{item.discountPrice * item.quantity}</p>
                                                    <p className="text-gray-500 text-sm line-through">₹{item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {index < cartItems.length - 1 && <Separator />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                    <div className="mt-6 p-4">
                                <h3 className="text-sm font-medium mb-2">APPLY COUPON</h3>
                                <div className="flex gap-2">
                                    <Input placeholder="Enter coupon code" className="flex-1" />
                                    <Button variant="outline">APPLY</Button>
                                </div>
                            </div>
                        <div className="bg-white rounded-md shadow-sm p-4">
                            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

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

                            <Button className="w-full mb-4" onClick={handleCheckout}>PROCEED TO CHECKOUT</Button>

                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart