import React, { useState, useEffect } from 'react';
import { useAppContext } from '../Context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../Components/ProductCard';

function ProductDetails() {
    const { products, navigate, currency, addtoCart } = useAppContext();
    const { id } = useParams();
    const [relatedProducts, setrelatedProducts] = useState([]);
    
    const product = products.find((item) => item._id === id);

    useEffect(() => {
        if (products.length > 0 && product) {
            const productsCopy = products.filter(
                (item) => product.category === item.category && item._id !== product._id
            );
            setrelatedProducts(productsCopy.slice(0, 5));
        }
    }, [products, product]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Product not found</h2>
                    <Link to="/products" className="text-blue-600 hover:underline mt-4 block">Back to Shop</Link>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 md:px-10 lg:px-14 xl:px-20 py-12 mt-20"
        >
            {/* Breadcrumbs */}
            <nav className="flex mb-8 text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <span className="mx-2 text-slate-300">/</span>
                <Link to="/products" className="hover:text-blue-600 transition-colors">Shop</Link>
                <span className="mx-2 text-slate-300">/</span>
                <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-blue-600 transition-colors capitalize">
                    {product.category}
                </Link>
                <span className="mx-2 text-slate-300">/</span>
                <span className="text-blue-600 truncate">{product.name}</span>
            </nav>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    
                    {/* Image Section */}
                    <div className="lg:w-1/2 relative bg-slate-50 p-6 md:p-12 flex items-center justify-center">
                        <div className="absolute top-6 left-6">
                            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                New Arrival
                            </span>
                        </div>
                        <motion.img 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            src={`http://localhost:4000${product.image}`} 
                            alt={product.name} 
                            className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <div className="mb-2">
                            <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">{product.category}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.642 9.384c-.783-.57-.38-1.81.588-.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-slate-500 text-sm font-medium">4.0 (127 Customer Reviews)</span>
                        </div>

                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Price Card */}
                        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-8">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-black text-blue-600">
                                    {currency}{product.price}
                                </span>
                                
                               
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-slate-500 text-sm">
                                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                <span>Free shipping on orders over {currency}2000</span>
                            </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => addtoCart(product._id)}
                                className="w-full py-4 px-8 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    addtoCart(product._id);
                                    navigate("/cart");
                                }}
                                className="w-full py-4 px-8 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200 active:scale-95"
                            >
                                Buy It Now
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className="mt-24">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900">Recommended for You</h2>
                        <Link to="/products" className="text-blue-600 font-bold hover:underline">View All</Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        <AnimatePresence>
                            {relatedProducts.map((relatedProduct, idx) => (
                                <motion.div
                                    key={relatedProduct._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <ProductCard product={relatedProduct} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default ProductDetails;