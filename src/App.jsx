import React from 'react'
import Header from './UI/Layout/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FeaturedBanner from './UI/Components/FeaturedBanner'
import Home from './UI/Pages/Home'
import Footer from './UI/Layout/Footer'
import CategoryPage from './UI/Components/CategoryPage'
import ProductDetails from './UI/Components/ProductDetails'
import { Toaster } from "@/components/ui/sonner"
import Cart from './UI/Pages/Cart/Cart'
import CheckoutPage from './UI/Pages/Cart/CheckoutPage'
import CheckoutSuccess from './UI/Pages/Cart/CheckoutSuccess'
import ScrollToTop from './UI/Layout/ScrollToTop'
import Login from './UI/Components/Auth/Login'
import Signup from './UI/Components/Auth/Signup'
const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
      <Header />
        <main className='flex-1'>
          <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Signup />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<CheckoutPage/>} />
          <Route path='/checkout/success' element={<CheckoutSuccess/>} />
        </Routes>
        </main>
        <Toaster />
        <Footer />
    </div>
    </BrowserRouter>
  )
}

export default App