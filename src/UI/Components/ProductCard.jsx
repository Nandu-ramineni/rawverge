import React, { useState } from 'react'
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { ShoppingBag02Icon } from 'hugeicons-react'
import { dummyProducts } from "./dummyData"

const ProductCard = () => {
    const [wishlist, setWishlist] = useState([])

    const toggleWishlist = (id) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {dummyProducts.map((product) => {
                const {
                    id, name, brand, price, discountPrice,
                    discountPercentage, rating, images
                } = product
                const productImage = images[0] || images[1] || "/placeholder.svg"

                const isWishlisted = wishlist.includes(id)

                return (
                    <div key={id} className="group relative bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="relative aspect-[3/4] md:aspect-[1/1] overflow-hidden" >
                            <Link to={`/product/${id}`}>
                                <img
                                    src={productImage || "/placeholder.svg"}
                                    alt={name}
                                    className="object-cover object-top h-full w-full group-hover:scale-105 transition-transform duration-300"
                                />
                            </Link>
                            <button
                                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm"
                                onClick={() => toggleWishlist(id)}
                            >
                                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                            </button>
                            {discountPercentage && (
                                <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                    {discountPercentage}% OFF
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            <h3 className="font-medium text-sm truncate">{brand}</h3>
                            <p className="text-gray-600 text-xs truncate">{name}</p>
                            <div className="flex items-center mt-1">
                                <p className="font-semibold text-sm">₹{discountPrice || price}</p>
                                {discountPrice && <p className="text-gray-500 text-xs line-through ml-2">₹{price}</p>}
                            </div>
                            <div className="flex items-center mt-1">
                                <div className="flex items-center bg-green-600 text-white text-xs px-1 rounded">{rating} ★</div>
                                <span className="text-gray-500 text-xs ml-2">({Math.floor(Math.random() * 1000) + 100})</span>
                            </div>
                        </div>
                        {/* <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="rounded-md shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <Button variant="outline" size="sm" className="text-xs">
                                    <ShoppingBag02Icon /> Add to Bag
                                </Button>
                            </div>
                        </div> */}
                    </div>
                )
            })}
        </div>
    )
}

export default ProductCard
