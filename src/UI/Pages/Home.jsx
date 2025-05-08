import React from 'react'
import FeaturedBanner from '../Components/FeaturedBanner'
import Deals from '../Components/Deals'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Categories from '../Components/Categories'
import ProductCard from '../Components/ProductCard'
import { ArrowRight01Icon } from 'hugeicons-react'
import { MapPin, ShoppingBag } from 'lucide-react'

const Home = () => {
    return (
        <div>
            <div className="bg-secondary text-black py-2 overflow-hidden">
                <div className="relative flex">
                    <div className="animate-marquee whitespace-nowrap flex items-center">
                        <span className="mx-4 flex items-center">
                            <ShoppingBag className="h-4 w-4 mr-2" /> FREE SHIPPING ON ORDERS ABOVE ₹799
                        </span>
                        <span className="mx-4 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" /> SAME DAY DELIVERY IN SELECT CITIES
                        </span>
                        <span className="mx-4 flex items-center">
                            <ShoppingBag className="h-4 w-4 mr-2" /> FREE SHIPPING ON ORDERS ABOVE ₹799
                        </span>
                        <span className="mx-4 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" /> SAME DAY DELIVERY IN SELECT CITIES
                        </span>
                    </div>
                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center">
                        <span className="mx-4 flex items-center">
                            <ShoppingBag className="h-4 w-4 mr-2" /> FREE SHIPPING ON ORDERS ABOVE ₹799
                        </span>
                        <span className="mx-4 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" /> SAME DAY DELIVERY IN SELECT CITIES
                        </span>
                        <span className="mx-4 flex items-center">
                            <ShoppingBag className="h-4 w-4 mr-2" /> FREE SHIPPING ON ORDERS ABOVE ₹799
                        </span>
                        <span className="mx-4 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" /> SAME DAY DELIVERY IN SELECT CITIES
                        </span>
                    </div>
                </div>
            </div>
            
            <FeaturedBanner />
            <Deals />
            <section className="py-8 px-4 md:px-8">
                <div className="flex-1">
                    <div className="relative h-[200px] md:h-[300px] rounded-xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
                            alt="Special Offer"
                            fill
                            className="object-cover w-full h-full object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                        <div className="absolute top-1/2 left-12 -translate-y-1/2 max-w-md">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">EXCLUSIVE OFFER</h2>
                            <p className="text-white/80 mb-4 text-sm md:text-base">
                                Get an extra 20% off on your first purchase with code WELCOME20
                            </p>
                            <Button asChild className="rounded-full px-6 bg-white text-black hover:bg-gray-100">
                                <Link to="/category/special-offers">SHOP NOW</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <Categories
                title="CATEGORIES TO BAG"
                categories={[
                    { name: "T-shirts", image: "/placeholder.svg?height=200&width=200&text=T-shirts" },
                    { name: "Shirts", image: "/placeholder.svg?height=200&width=200&text=Shirts" },
                    { name: "Jeans", image: "https://cocoajeans.com.co/cdn/shop/articles/jeans_870x.png?v=1611623964" },
                    { name: "Dresses", image: "/placeholder.svg?height=200&width=200&text=Dresses" },
                    { name: "Activewear", image: "/placeholder.svg?height=200&width=200&text=Activewear" },
                    { name: "OverSized", image: "/placeholder.svg?height=200&width=200&text=Footwear" },
                ]}
            />
            <section className="py-12 bg-gray-50 px-4 md:px-8">
                <div className="container">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">TRENDING NOW</h2>
                        <Link to="/trending" className="text-primary hover:underline font-medium">
                        <Button className='bg-white text-black'>
                        View All <ArrowRight01Icon className='h-4 w-4 ' />
                        </Button>
                        </Link>
                    </div>
                    <ProductCard/>
                </div>
            </section>

            <section className="py-12 px-4 md:px-8">
                <div className="container">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">NEW ARRIVALS</h2>
                        <Link to="/new-arrivals" className="text-primary hover:underline font-medium">
                            <Button className='bg-white text-black'>
                                                    View All <ArrowRight01Icon className='h-4 w-4 ' />
                                                    </Button>
                        </Link>
                    </div>
                    <ProductCard/>
                </div>
            </section>
        </div>
    )
}

export default Home
