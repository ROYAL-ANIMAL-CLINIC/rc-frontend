import React from 'react';
import { useAppContext } from '../Context/AppContext';
import catfoodimg from '../assets/catFood.jpg';
import toysimg from '../assets/Toys.jpg';
import dogfoodimg from '../assets/dogFood.jpg';
import suppimg from '../assets/suppliments.jpg';
import accessoriesimg from '../assets/accessories.jpg';
import othersimg from '../assets/shampoo.jpg';


// array of objects represent categories
export const ShopCategories = [ 
  {
    text: 'Dog Foods',
    path: 'Dog Food',
    image: dogfoodimg,
  },
  {
    text: 'Cat Foods',
    path: 'Cat Foods',
    image: catfoodimg,
  },
  {
    text: 'Pet Toys',
    path: 'Toys',
    image: toysimg,
  },
  {
    text: 'Pet Accessories',
    path: 'Accessories',
    image: accessoriesimg,
  },
  {
    text: 'Suppliments',
    path: 'Suppliments',
    image: suppimg,
  },
  {
    text: 'Others',
    path: 'Others',
    image: othersimg,
  },


];

function Categories() {

  const { navigate } = useAppContext();

  return (

    <div className="mt-16 ">
    <p className="text-2xl md:text-4xl font-medium ">Categories</p>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mt-6 gap-6 justify-center">

      {/*mapping shop categories array to render each category */}
      {ShopCategories.map((category, index) => (
        <div
          key={index}
          className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
          onClick={() => {
            navigate(`/products/${category.path.toLowerCase()}`);
            scrollTo(0, 0);
          }}
        >
          <img
            src={category.image}
            alt="categories"
            className="group-hover:scale-108 transition max-w-38"
          />
          <p className="text-sm lg:text-xl md:text-xl font-medium ">
            {category.text}
          </p>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Categories;