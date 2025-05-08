import React from 'react'
import ProductCard from './ProductCard'
import { useState, useEffect } from "react"
import { ChevronRight, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Link, useParams } from 'react-router-dom'
import { dummyProducts } from './dummyData'
const CategoryPage = () => {
    const { slug } = useParams();
    const categoryName = slug
        ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
        : "";


    // State for filters
    const [priceRange, setPriceRange] = useState([500, 5000])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedColors, setSelectedColors] = useState([])
    const [selectedSizes, setSelectedSizes] = useState([])
    const [selectedDiscount, setSelectedDiscount] = useState("")
    const [sortBy, setSortBy] = useState("recommended")
    const [isMobile, setIsMobile] = useState(false)

    // Check if we're on mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkIfMobile()
        window.addEventListener("resize", checkIfMobile)
        return () => window.removeEventListener("resize", checkIfMobile)
    }, [])

    // Sample data for filters
    const brands = [
        "Rawverge Originals",
        "Urban Style",
        "Street Fashion",
        "Designer Edit",
        "Rawverge Premium",
        "Rawverge Luxe",
    ]
    const colors = ["Black", "White", "Blue", "Red", "Green", "Yellow", "Grey", "Brown"]
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    const discounts = ["10% and above", "20% and above", "30% and above", "40% and above", "50% and above"]

    // Sample products data
    

    // Filter products based on selected filters
    const filteredProducts = dummyProducts.filter((product) => {
        // Price filter
        if (product.discountPrice < priceRange[0] || product.discountPrice > priceRange[1]) {
            return false
        }

        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
            return false
        }

        // Color filter
        if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
            return false
        }

        // Size filter
        if (selectedSizes.length > 0 && !selectedSizes.includes(product.size)) {
            return false
        }

        // Discount filter
        if (selectedDiscount) {
            const minDiscount = Number.parseInt(selectedDiscount.split("%")[0])
            if (product.discountPercentage < minDiscount) {
                return false
            }
        }

        return true
    })

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low-high":
                return a.discountPrice - b.discountPrice
            case "price-high-low":
                return b.discountPrice - a.discountPrice
            case "discount":
                return b.discountPercentage - a.discountPercentage
            case "rating":
                return b.rating - a.rating
            case "newest":
                return b.id.localeCompare(a.id)
            default:
                return 0
        }
    })

    // Toggle filter selection
    const toggleBrand = (brand) => {
        setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
    }

    const toggleColor = (color) => {
        setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
    }

    const toggleSize = (size) => {
        setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
    }

    // Clear all filters
    const clearAllFilters = () => {
        setPriceRange([500, 5000])
        setSelectedBrands([])
        setSelectedColors([])
        setSelectedSizes([])
        setSelectedDiscount("")
    }

    // Filter component for both desktop and mobile
    const FiltersComponent = () => (
        <div className="space-y-6">
            <div>
                <h3 className="font-medium mb-3">PRICE RANGE</h3>
                <div className="px-2">
                    <Slider
                        defaultValue={priceRange}
                        min={500}
                        max={5000}
                        step={100}
                        value={priceRange}
                        onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                    </div>
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="font-medium mb-3">BRAND</h3>
                <div className="space-y-2">
                    {brands.map((brand) => (
                        <div key={brand} className="flex items-center">
                            <Checkbox
                                id={`brand-${brand}`}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={() => toggleBrand(brand)}
                            />
                            <Label htmlFor={`brand-${brand}`} className="ml-2 text-sm font-normal">
                                {brand}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="font-medium mb-3">COLOR</h3>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            className={`w-8 h-8 rounded-full border ${selectedColors.includes(color) ? "ring-2 ring-primary ring-offset-2" : ""
                                }`}
                            style={{ backgroundColor: color.toLowerCase() }}
                            onClick={() => toggleColor(color)}
                            title={color}
                        />
                    ))}
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="font-medium mb-3">SIZE</h3>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm ${selectedSizes.includes(size) ? "bg-primary text-white" : ""
                                }`}
                            onClick={() => toggleSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="font-medium mb-3">DISCOUNT</h3>
                <div className="space-y-2">
                    {discounts.map((discount) => (
                        <div key={discount} className="flex items-center">
                            <Checkbox
                                id={`discount-${discount}`}
                                checked={selectedDiscount === discount}
                                onCheckedChange={() => setSelectedDiscount(selectedDiscount === discount ? "" : discount)}
                            />
                            <Label htmlFor={`discount-${discount}`} className="ml-2 text-sm font-normal">
                                {discount}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <div className=" py-8 px-4 md:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm mb-6">
                <Link to="/" className="text-gray-500 hover:text-primary">
                    Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <span className="font-medium">{categoryName}</span>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{categoryName}</h1>
                <div className="flex items-center gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort By: Recommended" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recommended">Recommended</SelectItem>
                            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                            <SelectItem value="discount">Discount</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                            <SelectItem value="newest">Newest First</SelectItem>
                        </SelectContent>
                    </Select>

                    {isMobile && (
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <SlidersHorizontal className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <SheetHeader>
                                    <SheetTitle>Filters</SheetTitle>
                                </SheetHeader>
                                <div className="py-4 overflow-y-auto h-[calc(100vh-10rem)]">
                                    <FiltersComponent />
                                </div>
                                <SheetFooter className="flex flex-row justify-between">
                                    <Button variant="outline" onClick={clearAllFilters}>
                                        Clear All
                                    </Button>
                                    <SheetClose asChild>
                                        <Button>Apply Filters</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters - Desktop */}
                {!isMobile && (
                    <div className="md:w-20 lg:w-60">
                        <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold">FILTERS</h2>
                                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 text-xs">
                                    CLEAR ALL
                                </Button>
                            </div>
                            <FiltersComponent />
                        </div>
                    </div>
                )}

                {/* Products */}
                <div className="flex-1">
                    {/* Active filters */}
                    {(selectedBrands.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0 || selectedDiscount) && (
                        <div className="mb-4 flex flex-wrap gap-2">
                            {selectedBrands.map((brand) => (
                                <div key={brand} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                                    {brand}
                                    <button onClick={() => toggleBrand(brand)} className="ml-2">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                            {selectedColors.map((color) => (
                                <div key={color} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                                    {color}
                                    <button onClick={() => toggleColor(color)} className="ml-2">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                            {selectedSizes.map((size) => (
                                <div key={size} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                                    Size: {size}
                                    <button onClick={() => toggleSize(size)} className="ml-2">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                            {selectedDiscount && (
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                                    {selectedDiscount}
                                    <button onClick={() => setSelectedDiscount("")} className="ml-2">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Product count */}
                    <p className="mb-4 text-gray-500">
                        {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
                    </p>

                    {/* Product grid */}
                    {sortedProducts.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <h3 className="text-lg font-medium mb-2">No products found</h3>
                            <p className="text-gray-500 mb-4">Try changing your filters to find products</p>
                            <Button onClick={clearAllFilters}>Clear All Filters</Button>
                        </div>
                    ) : (
                        <ProductCard
                                    
                        />
                    )}
                </div>
            </div>
        </div>
    )
}


export default CategoryPage