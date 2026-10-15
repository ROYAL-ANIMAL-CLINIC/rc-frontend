import React from 'react';
import { useAppContext } from '../Context/AppContext'; 
import { useState, useEffect } from 'react'; 
import ProductCard from '../Components/ProductCard'; 
import ShopNavbar from '../Components/ShopNavbar'; 
import Categories from '../Components/Categories'; 

// function to display all products
function AllProducts() {

  const { products, searchQuery } = useAppContext();

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {

    // Check if products exists 
    if (products && Array.isArray(products)) {
      if (searchQuery.length > 0) {
        // Filter the products array 
        setFilteredProducts(
          products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        // If no search query, display all products
        setFilteredProducts(products);
      }
    } else {
      setFilteredProducts([]);
    }  }, [products, searchQuery]);

  return (
    <div className ="p-4 justify-center">

      <ShopNavbar/>
      <Categories/>

      <div className=" mt-10 flex flex-col">
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium px-10  ">ALL PRODUCTS</p>
          <div className="w-16 h-0.5 bg-blue-200 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5  md:gap-6 mt-6 ">
          
          {/* Map filteredProducts array */}
          {filteredProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;