import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { Button } from '@/components/ui/button'
import { ArrowRight01Icon, ArrowRight02Icon } from 'hugeicons-react'

const Deals = () => {
    return (
        <section className="py-12 px-4 md:px-8">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold">DEAL OF THE DAY</h2>
                    <Link to="/deals" className="text-primary hover:underline font-medium">
                        <Button className='bg-white text-black'>
                        View All <ArrowRight01Icon className='h-4 w-4 ' />
                        </Button>
                    </Link>
                </div>
                <ProductCard
                            
                        />
            </div>
        </section>
    )
}

export default Deals