import React, { useState } from 'react';
import UploadImage from '../../assets/upload_area.png';
import { ShopCategories } from '../../Components/Categories';
import { useAppContext } from '../../Context/AppContext';
import toast from 'react-hot-toast';

function Addproduct() {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const { axios } = useAppContext();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!name || !price || !category || !file) {
            toast.error("Please fill all fields and upload an image");
            return;
        }
        const productData = {
            name,
            description: description.split('\n'),
            category,
            price: Number(price),
        };
        const formData = new FormData();
        formData.append('image', file);
        formData.append('productData', JSON.stringify(productData));
        try {
            setLoading(true);
            const { data } = await axios.post('/api/product/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (data.success) {
                toast.success(data.message);
                setName(''); setDescription(''); setCategory(''); setPrice(''); setFile(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 w-full md:p-10 p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
                <p className="text-sm text-gray-500 mt-1">Fill in the details below to add a new product to the store.</p>
            </div>

            <form onSubmit={onSubmitHandler} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 max-w-3xl space-y-6">

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Product Image</label>
                    <label htmlFor="imageUpload" className="cursor-pointer">
                        <input
                            onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
                            type="file" id="imageUpload" accept="image/*" hidden
                        />
                        <div className={`relative w-40 h-40 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all
                            ${file ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'}`}>
                            {file ? (
                                <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover rounded-xl" />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <img src={UploadImage} alt="upload" className="w-12 opacity-60" />
                                    <span className="text-xs font-medium">Click to upload</span>
                                </div>
                            )}
                            {file && (
                                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
                                    <span className="text-white text-xs font-semibold">Change Image</span>
                                </div>
                            )}
                        </div>
                    </label>
                    {file && <p className="text-xs text-gray-500 mt-2">{file.name}</p>}
                </div>

                {/* Name & Price row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700" htmlFor="product-name">Product Name <span className="text-red-500">*</span></label>
                        <input
                            onChange={(e) => setName(e.target.value)} value={name}
                            id="product-name" type="text" placeholder="e.g. Royal Canin Dog Food"
                            className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm transition"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700" htmlFor="product-price">Price (LKR) <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">Rs.</span>
                            <input
                                onChange={(e) => { if (e.target.value === "" || !isNaN(e.target.value)) setPrice(e.target.value); }}
                                value={price} id="product-price" type="number" placeholder="0.00"
                                className="outline-none py-2.5 pl-10 pr-4 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm transition"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700" htmlFor="category">Category <span className="text-red-500">*</span></label>
                    <select
                        onChange={(e) => setCategory(e.target.value)} value={category} id="category"
                        className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm transition bg-white"
                    >
                        <option value="">Select a category</option>
                        {ShopCategories.map((item, index) => (
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700" htmlFor="product-description">Description</label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)} value={description}
                        id="product-description" rows={4}
                        className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm resize-none transition"
                        placeholder="Describe the product..."
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit" disabled={loading}
                        className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold rounded-lg transition flex items-center gap-2"
                    >
                        {loading ? (
                            <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Adding...</>
                        ) : '+ Add Product'}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setName(''); setDescription(''); setCategory(''); setPrice(''); setFile(null); }}
                        className="px-8 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Addproduct;
