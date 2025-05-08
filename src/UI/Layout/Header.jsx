"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { Search, ShoppingBag, Heart, ChevronDown, Menu, X, User, Phone, HelpCircle, MapPin, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import Logo from "@/assets/logo.jpg"
import { FavouriteIcon, Search01Icon, ShoppingBag02Icon, UserIcon } from "hugeicons-react"
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const location = useLocation()
    const pathname = location.pathname
    const [cartCount, setCartCount] = useState(0)
    const searchRef = useRef(null)

    // Check if we're on auth pages
    const isAuthPage = pathname?.startsWith("/auth")

    // Define categories with subcategories
    const categories = [
        {
            name: "Men",
            href: "/category/men",
            featured: [
                { name: "New Arrivals", href: "/category/men/new-arrivals", imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwiJZTUyruBV_itIoYe-HIgZ0yVzkCMDCVlQ&s" },
                { name: "Best Sellers", href: "/category/men/best-sellers", imageSrc: "https://static.vecteezy.com/system/resources/thumbnails/003/240/383/small_2x/best-seller-golden-badge-isolated-illustration-vector.jpg" },
            ],
            sections: [
                {
                    name: "Clothing",
                    items: [
                        { name: "T-Shirts", href: "/category/men/t-shirts" },
                        { name: "Shirts", href: "/category/men/shirts" },
                        { name: "Jeans", href: "/category/men/jeans" },
                        { name: "Trousers", href: "/category/men/trousers" },
                        { name: "Activewear", href: "/category/men/activewear" },
                        { name: "Jackets", href: "/category/men/jackets" },
                    ],
                },
                {
                    name: "Accessories",
                    items: [
                        { name: "Watches", href: "/category/men/watches" },
                        { name: "Belts", href: "/category/men/belts" },
                        { name: "Sunglasses", href: "/category/men/sunglasses" },
                        { name: "Bags", href: "/category/men/bags" },
                    ],
                },
                {
                    name: "Footwear",
                    items: [
                        { name: "Sneakers", href: "/category/men/sneakers" },
                        { name: "Formal Shoes", href: "/category/men/formal-shoes" },
                        { name: "Sandals", href: "/category/men/sandals" },
                    ],
                },
            ],
        },
        {
            name: "Women",
            href: "/category/women",
            featured: [
                {
                    name: "New Collection",
                    href: "/category/women/new-collection",
                    imageSrc: "https://www.roperro.in/cdn/shop/collections/hero_banner_1.png?v=1684478500",
                },
                {
                    name: "Summer Essentials",
                    href: "/category/women/summer-essentials",
                    imageSrc: "https://www.creativefabrica.com/wp-content/uploads/2023/02/08/Summer-Collection-Typography-Graphics-60401704-1.jpg",
                },
            ],
            sections: [
                {
                    name: "Clothing",
                    items: [
                        { name: "Tops", href: "/category/women/tops" },
                        { name: "Dresses", href: "/category/women/dresses" },
                        { name: "Jeans", href: "/category/women/jeans" },
                        { name: "Skirts", href: "/category/women/skirts" },
                        { name: "Activewear", href: "/category/women/activewear" },
                        { name: "Ethnic Wear", href: "/category/women/ethnic-wear" },
                    ],
                },
                {
                    name: "Accessories",
                    items: [
                        { name: "Jewelry", href: "/category/women/jewelry" },
                        { name: "Handbags", href: "/category/women/handbags" },
                        { name: "Scarves", href: "/category/women/scarves" },
                        { name: "Hair Accessories", href: "/category/women/hair-accessories" },
                    ],
                },
                {
                    name: "Footwear",
                    items: [
                        { name: "Heels", href: "/category/women/heels" },
                        { name: "Flats", href: "/category/women/flats" },
                        { name: "Boots", href: "/category/women/boots" },
                        { name: "Sandals", href: "/category/women/sandals" },
                    ],
                },
            ],
        },
        
    ]

    useEffect(() => {
        const count = localStorage.getItem("cart")
        setCartCount(count ? JSON.parse(count).length : 0)
    }, [])

    // Handle scroll event to change header style
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Handle click outside to close search
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Don't render header on auth pages
    if (isAuthPage) return null

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-md border-b" : "bg-white"
                }`}
        >
            {/* Top bar with contact, help, and location */}
            {/* <div className="hidden md:block bg-gray-50 text-gray-600 py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>+1 (888) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>Find a Store</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <Link to="/help" className="flex items-center hover:text-primary transition-colors">
              <HelpCircle className="h-3 w-3 mr-1" />
              <span>Help & FAQs</span>
            </Link>
            <Link to="/track-order" className="hover:text-primary transition-colors">
              Track Order
            </Link>
          </div>
        </div>
      </div> */}

            {/* Main header */}
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Mobile menu trigger */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="mr-2">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-0">
                            <div className="flex flex-col h-full">
                                <div className="p-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <SheetTitle className="text-left font-bold">RAWVERGE</SheetTitle>
                                        
                                    </div>
                                    <div className="mt-4">
                                        <Input
                                            placeholder="Search products..."
                                            className="w-full"
                                            prefix={<Search className="h-4 w-4 text-gray-400" />}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-auto">
                                    <nav className="flex flex-col">
                                        {categories.map((category) => (
                                            <div key={category.name} className="border-b">
                                                <details className="group">
                                                    <summary className="flex cursor-pointer items-center justify-between p-4 text-lg font-medium">
                                                        {category.name}
                                                        <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                                                    </summary>
                                                    <div className="px-4 pb-4 pt-2">
                                                        {category.sections.map((section) => (
                                                            <div key={section.name} className="mb-4">
                                                                <h4 className="font-medium text-sm text-gray-500 mb-2">{section.name}</h4>
                                                                <ul className="space-y-2">
                                                                    {section.items.map((item) => (
                                                                        <li key={item.name}>
                                                                            <Link
                                                                                to={item.href}
                                                                                className="text-sm hover:text-primary transition-colors"
                                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                            >
                                                                                {item.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                        <Link
                                                            to={category.href}
                                                            className="inline-block mt-2 text-sm font-medium text-primary hover:underline"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            View All {category.name}
                                                        </Link>
                                                    </div>
                                                </details>
                                            </div>
                                        ))}
                                    </nav>
                                </div>
                                <div className="p-4 border-t mt-auto">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Link to="/auth/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="outline" className="w-full">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link to="/auth/register" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button className="w-full">Register</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Link to="/" className="flex items-center justify-start">
                        <img src={Logo} alt="" className="h-12 w-auto invert mr-32 md:mr-0" />
                        <span className="text-xl md:text-2xl font-bold tracking-tight hidden md:flex">RAWVERGE</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            {categories.map((category) => (
                                <NavigationMenuItem key={category.name}>
                                    <NavigationMenuTrigger className="text-base">{category.name}</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid grid-cols-4 w-[800px] gap-3 p-4">
                                            <div className="col-span-1">
                                                <div className="font-medium mb-2">Featured</div>
                                                <ul className="space-y-4">
                                                    {category.featured.map((item) => (
                                                        <li key={item.name}>
                                                            <NavigationMenuLink asChild>
                                                                <Link to={item.href} className="block group">
                                                                    <div className="overflow-hidden rounded-md mb-2">
                                                                        <img
                                                                            src={item.imageSrc || "/placeholder.svg"}
                                                                            alt={item.name}
                                                                            loading="lazy"
                                                                            className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                                        />
                                                                    </div>
                                                                    <div className="text-sm font-medium group-hover:text-primary transition-colors">
                                                                        {item.name}
                                                                    </div>
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="col-span-3 grid grid-cols-3 gap-6">
                                                {category.sections.map((section) => (
                                                    <div key={section.name}>
                                                        <h3 className="font-medium mb-3 text-gray-500">{section.name}</h3>
                                                        <ul className="space-y-2">
                                                            {section.items.map((item) => (
                                                                <li key={item.name}>
                                                                    <NavigationMenuLink asChild>
                                                                        <Link to={item.href} className="text-sm hover:text-primary transition-colors">
                                                                            {item.name}
                                                                        </Link>
                                                                    </NavigationMenuLink>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                                            <Link to={category.href} className="text-sm font-medium text-primary hover:underline">
                                                View All {category.name}
                                            </Link>
                                            <Badge variant="outline" className="text-xs">
                                                New Collection
                                            </Badge>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Search, User, Wishlist, Cart */}
                    <div className="flex items-center space-x-1 sm:space-x-4 z-10">
                        {/* Search */}
                        <div ref={searchRef} className="relative">
                            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                                <Search01Icon className="h-5 w-5" />
                                <span className="sr-only">Search</span>
                            </Button>

                            {isSearchOpen && (
                                <div className="absolute -right-24 md:right-0 top-full mt-2 w-screen max-w-xs md:-w-md bg-white shadow-lg rounded-md overflow-hidden border animate-in fade-in slide-in-from-top-5 duration-300">
                                    <div className="p-4">
                                        <div className="flex items-center border rounded-md overflow-hidden">
                                            <Input
                                                placeholder="Search for products..."
                                                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                autoFocus
                                            />
                                            <Button variant="ghost" size="icon">
                                                <Search01Icon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="mt-4">
                                            <h4 className="text-xs font-medium text-gray-500 mb-2">POPULAR SEARCHES</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {["T-shirts", "Dresses", "Jeans", "Sneakers", "Summer collection"].map((term) => (
                                                    <Badge key={term} variant="secondary" className="cursor-pointer hover:bg-gray-200">
                                                        {term}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Account */}
                        <UserAvatar />

                        {/* Wishlist */}
                        <Link to="/wishlist" className="relative group">
                            <Button variant="ghost" size="icon" className="relative">
                                <FavouriteIcon className="h-5 w-5 group-hover:text-primary transition-colors" />
                                <span className="sr-only">Wishlist</span>
                            </Button>
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" className="relative group">
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingBag02Icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                                <span className="sr-only">Cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </header>
    )
}

// User Avatar component that shows initials instead of icon
function UserAvatar() {
    // This would normally come from your auth context or user state
    const user = {
        name: "John Doe",
        isLoggedIn: false,
    }

    // Get the first two letters of the user's name
    const getInitials = (name) => {
        const names = name.split(" ")
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase()
        }
        return name.substring(0, 2).toUpperCase()
    }

    const initials = user.isLoggedIn ? getInitials(user.name) : ""

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group">
                    {user.isLoggedIn ? (
                        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                            {initials}
                        </div>
                    ) : (
                        <UserIcon className="h-5 w-5 group-hover:text-primary transition-colors" />
                    )}
                    <span className="sr-only">Account</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {user.isLoggedIn ? (
                    <>
                        <div className="flex items-center p-2">
                            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium mr-3">
                                {initials}
                            </div>
                            <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-gray-500">View your profile</div>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link to="/profile" className="cursor-pointer flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                <span>My Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to="/orders" className="cursor-pointer flex items-center">
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                <span>My Orders</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to="/wishlist" className="cursor-pointer flex items-center">
                                <Heart className="mr-2 h-4 w-4" />
                                <span>My Wishlist</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer flex items-center text-red-500 focus:text-red-500">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <div className="px-2 py-4 text-center">
                            <h3 className="font-medium mb-1">Welcome to RAWVERGE</h3>
                            <p className="text-xs text-gray-500 mb-4">Sign in to access your account and manage orders</p>
                            <div className="grid gap-2">
                                <Link to="/auth/login" className="w-full">
                                    <Button className="w-full">Login</Button>
                                </Link>
                                <Link to="/auth/register" className="w-full">
                                    <Button variant="outline" className="w-full">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <div className="p-2">
                            <DropdownMenuItem asChild>
                                <Link to="/track-order" className="cursor-pointer flex items-center text-sm">
                                    <span>Track Order</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/help" className="cursor-pointer flex items-center text-sm">
                                    <span>Help & Support</span>
                                </Link>
                            </DropdownMenuItem>
                        </div>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Header
