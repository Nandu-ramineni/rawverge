import React from 'react'
import { Link } from 'react-router-dom'

const Categories = ({ title, categories }) => {
    const realCategoryImages = {
        "T-shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
        Shirts: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
        Jeans: "https://cocoajeans.com.co/cdn/shop/articles/jeans_870x.png?v=1611623964",
        Dresses: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
        Activewear: "https://saintlayers.cc/cdn/shop/articles/6306-angle-2.webp?v=1708903581",
        OverSized: "https://lovedky.com/cdn/shop/files/copy-of-model-aleesha-pics-4x5-6-6735857623e7b.webp?v=1731563798",
    }

    return (
        <section className="py-12 px-8">
            <div className="container">
                <h2 className="text-2xl font-bold mb-8">{title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, index) => (
                        <Link key={index} to={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`} className="group">
                            <div className="relative aspect-square overflow-hidden rounded-full mb-2">
                                <img
                                    src={realCategoryImages[category.name] || category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-center font-medium text-sm">{category.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default Categories