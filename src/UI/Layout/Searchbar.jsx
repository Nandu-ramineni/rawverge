import React from 'react'
import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from 'react-router-dom'

const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const searchRef = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (searchTerm.length < 2) {
            setSuggestions([])
            return
        }

        // Mock API call for suggestions
        const mockSuggestions = [
            `${searchTerm} t-shirts`,
            `${searchTerm} dresses`,
            `${searchTerm} jeans`,
            `${searchTerm} shoes`,
            `${searchTerm} accessories`,
        ]
        setSuggestions(mockSuggestions)
    }, [searchTerm])

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            navigate.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
            setShowSuggestions(false)
        }
    }

    const clearSearch = () => {
        setSearchTerm("")
        setSuggestions([])
    }

    return (
        <div className="relative w-full" ref={searchRef}>
            <form onSubmit={handleSearch}>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search for products, brands and more"
                        className="w-full pl-10 "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                    />
                    {searchTerm && (
                        <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <X className="h-4 w-4 text-gray-400" />
                        </button>
                    )}
                </div>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                    <ul>
                        {suggestions.map((suggestion, index) => (
                            <li key={index}>
                                <Link
                                    to={`/search?q=${encodeURIComponent(suggestion)}`}
                                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setShowSuggestions(false)}
                                >
                                    <Search className="h-4 w-4 mr-2 text-gray-400" />
                                    {suggestion}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}


export default Searchbar