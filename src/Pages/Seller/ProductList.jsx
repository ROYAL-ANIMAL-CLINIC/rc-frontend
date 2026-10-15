import React, { useState } from 'react';
import { useAppContext } from '../../Context/AppContext';
import { ShopCategories } from '../../Components/Categories';
import toast from 'react-hot-toast';

function ProductList() {
    const { products, currency, axios, fetchProducts } = useAppContext();

    const [viewProduct, setViewProduct] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [editForm, setEditForm] = useState({});

    const toggleStock = async (id, inStock) => {
        try {
            const { data } = await axios.post('/api/product/stock', { id, inStock });
            if (data.success) { fetchProducts(); toast.success(data.message); }
            else toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/product/delete/${deleteProduct._id}`);
            if (data.success) { toast.success(data.message); fetchProducts(); setDeleteProduct(null); }
            else toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/product/update/${editProduct._id}`, editForm);
            if (data.success) { toast.success(data.message); fetchProducts(); setEditProduct(null); }
            else toast.error(data.message);
        } catch (error) { toast.error(error.message); }
    };

    const openEdit = (product) => {
        setEditProduct(product);
        setEditForm({ name: product.name, category: product.category, price: product.price, description: Array.isArray(product.description) ? product.description.join('\n') : product.description });
    };

    return (
        <div className="w-full md:p-10 p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
                <p className="text-sm text-gray-500 mt-1">{products.length} products found</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-5xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Product</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700 hidden md:table-cell">Price</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Stock</th>
                                <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img src={`http://localhost:4000${product.image}`} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                                            <span className="font-medium text-gray-800 hidden sm:block">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{product.category}</td>
                                    <td className="px-4 py-3 text-gray-800 font-medium hidden md:table-cell">{currency}{product.price}</td>
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={product.inStock} onChange={() => toggleStock(product._id, !product.inStock)} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-200"></div>
                                            <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-2">
                                            {/* View */}
                                            <button onClick={() => setViewProduct(product)} className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition" title="View">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            {/* Edit */}
                                            <button onClick={() => openEdit(product)} className="p-1.5 rounded-lg text-green-500 hover:bg-green-50 transition" title="Edit">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            {/* Delete */}
                                            <button onClick={() => setDeleteProduct(product)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition" title="Delete">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* VIEW MODAL */}
            {viewProduct && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewProduct(null)}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-800">Product Details</h2>
                            <button onClick={() => setViewProduct(null)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <img src={`http://localhost:4000${viewProduct.image}`} alt={viewProduct.name} className="w-full h-48 object-cover rounded-xl mb-4 border border-gray-100" />
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500 font-medium">Name</span><span className="text-gray-800 font-semibold">{viewProduct.name}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 font-medium">Category</span><span className="text-gray-800">{viewProduct.category}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 font-medium">Price</span><span className="text-gray-800 font-semibold">{currency}{viewProduct.price}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 font-medium">Stock</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${viewProduct.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {viewProduct.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                            {viewProduct.description && (
                                <div className="pt-2 border-t border-gray-100">
                                    <p className="text-gray-500 font-medium mb-1">Description</p>
                                    <p className="text-gray-700 text-xs leading-relaxed">{Array.isArray(viewProduct.description) ? viewProduct.description.join(' ') : viewProduct.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {editProduct && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditProduct(null)}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-800">Edit Product</h2>
                            <button onClick={() => setEditProduct(null)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Product Name</label>
                                <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Category</label>
                                    <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white">
                                        {ShopCategories.map((item, i) => <option key={i} value={item.path}>{item.path}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Price (LKR)</label>
                                    <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-600 mb-1 block">Description</label>
                                <textarea value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition">Save Changes</button>
                                <button type="button" onClick={() => setEditProduct(null)} className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRM MODAL */}
            {deleteProduct && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteProduct(null)}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-gray-800 mb-1">Delete Product?</h2>
                        <p className="text-sm text-gray-500 mb-5">Are you sure you want to delete <span className="font-semibold text-gray-700">"{deleteProduct.name}"</span>? This cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={handleDelete} className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition">Delete</button>
                            <button onClick={() => setDeleteProduct(null)} className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;
