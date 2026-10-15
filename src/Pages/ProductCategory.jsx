import React from 'react';
import { useAppContext } from '../Context/AppContext';
import { useParams } from 'react-router-dom';
import { ShopCategories } from '../Components/Categories'; 
import ProductCard from '../Components/ProductCard';

function ProductCategory() {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategories = ShopCategories.find(
    (item) => item.path.toLowerCase() === category.toLowerCase()
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="mt-16 px-6 md:px-10 lg:px-14 xl:px-20">
      {searchCategories && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium mt-10">
            {searchCategories.text.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-blue-200 rounded-full"></div>
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
            {filteredProducts.map((product)=>(
                <ProductCard key = {product._id} product={product}/>
            ))}
        </div> 
    ):(
            <div className = "flex items-center justify-center h-[60vh]">
                <p className = "text-2xl font-medium text-blue-70">No products found in this category.</p>
            </div>
        
      )}
    </div>
  );
}

export default ProductCategory;