import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyProducts } from './dummyData'
import ProductCard from './ProductCard'
import { RotateClockwiseIcon, Shield01Icon, TruckDeliveryIcon } from 'hugeicons-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star } from 'lucide-react'
import { toast } from 'sonner'

const ProductDetails = () => {
    const { id } = useParams()
    const product = dummyProducts.find((item) => item.id === id)
    const [mainImage, setMainImage] = useState(product?.images[0] || "/placeholder.svg")
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    useEffect(() => {
        if (product) {
            setMainImage(product.images[0])
        }
    }, [product])
    if (!product) {
        return <div>Product not found</div>
    }
    const handleAddToBag = () => {
        if (!selectedSize || !selectedColor) {
          toast.error("Please select size and color")
          return
        }
      
        const cart = JSON.parse(localStorage.getItem("cart")) || []
      
        const productWithSelection = {
          ...product,
          selectedSize,
          selectedColor,
          uniqueId: `${product.id}-${selectedSize}-${selectedColor}` // Optional: helps avoid duplication
        }
      
        cart.push(productWithSelection)
      
        localStorage.setItem("cart", JSON.stringify(cart))
        toast("Product added to bag")
      }
      

    return (
        <div className="py-8 px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Product Images */}
                <div className="lg:w-1/2 flex flex-col">
                    {/* Main Image with Zoom */}
                    <div className="relative aspect-square overflow-hidden border rounded-md group">
                        <img
                            src={mainImage}
                            alt="Main"
                            className="object-cover object-top w-full h-full transition-transform duration-300 "
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="grid grid-cols-4 gap-2 mt-4">
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className={`border rounded-md cursor-pointer overflow-hidden ${mainImage === image ? "ring-2 ring-black" : ""
                                    }`}
                                onClick={() => setMainImage(image)}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="object-cover w-full h-full aspect-square hover:opacity-80"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="lg:w-2/5">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold">{product.brand}</h1>
                        <h2 className="text-xl text-gray-600">{product.name}</h2>
                    </div>

                    <div className="flex items-center mb-4">
                        <div className="flex items-center bg-green-600 text-white text-sm px-2 py-0.5 rounded">
                            {product.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                        </div>
                        <span className="text-gray-500 text-sm ml-2">({product.reviews} Reviews)</span>
                    </div>

                    <div className="flex items-center mb-6">
                        <p className="text-2xl font-bold">₹{product.discountPrice}</p>
                        <p className="text-gray-500 text-lg line-through ml-2">₹{product.price}</p>
                        <p className="text-green-600 text-lg ml-2">({product.discountPercentage}% OFF)</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-2">SELECT SIZE</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm ${selectedSize === size ? "border-black" : "border-gray-300"
                                        } hover:border-black`}
                                >
                                    {size}
                                </button>
                            ))}

                            

                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-2">SELECT COLOR</h3>
                        <div className="flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-3 py-1 rounded-md border text-sm ${selectedColor === color ? "border-black" : "border-gray-300"
                                        } hover:border-black`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <Button size="lg" className="flex-1" onClick={handleAddToBag}>
                            ADD TO BAG
                        </Button>
                        <Button size="lg" variant="outline" className="flex-1">
                            WISHLIST
                        </Button>
                    </div>

                    <div className="border-t pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center">
                                <TruckDeliveryIcon className="h-5 w-5 mr-2" />
                                <div>
                                    <p className="text-sm font-medium">Free Delivery</p>
                                    <p className="text-xs text-gray-500">On orders above ₹799</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <RotateClockwiseIcon className="h-5 w-5 mr-2" />
                                <div>
                                    <p className="text-sm font-medium">Easy Returns</p>
                                    <p className="text-xs text-gray-500">7-day return policy</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Shield01Icon className="h-5 w-5 mr-2" />
                                <div>
                                    <p className="text-sm font-medium">100% Authentic</p>
                                    <p className="text-xs text-gray-500">Quality guaranteed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <Tabs defaultValue="description">
                            <TabsList className="w-full justify-start border-b">
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description" className="py-4">
                                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            </TabsContent>
                            <TabsContent value="specifications" className="py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {product.specification.map((spec, index) => (
                                        <div key={index} className="flex border-b pb-2">
                                            <p className="w-1/3 font-medium">{spec.name}</p>
                                            <p className="w-2/3 text-gray-600">{spec.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="reviews" className="py-4">
                                <p className="text-gray-700">Customer reviews will be displayed here.</p>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
                <ProductCard />
            </div>
        </div>
    )
}

export default ProductDetails
