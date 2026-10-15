import React from "react";
import { useEffect } from "react"; 
import { Link } from "react-router-dom"; 
import { useAppContext } from "../Context/AppContext"; 


function Navbar() {

  // Access state and functions from the AppContext 
  const { searchQuery, setsearchQuery, navigate } = useAppContext();

  // handle navigation in search query
  useEffect(() => {

    //if the search query has any length navigate to the products
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (

    <div className="  mt-30 w-full flex items-center justify-center gap-8">

      <div className="flex gap-3 items-center border border-gray-800 px-4 py-2 rounded-full w-[300px] md:w-[400px]">

        <input
          onChange={(e) => setsearchQuery(e.target.value)} // Update the searchQuery state with input change
          className="flex-1 bg-transparent outline-none placeholder-gray-500 text-sm"
          type="text"
          placeholder="Search products"
        />

        {/*search icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.836 10.615 15 14.695"
            stroke="#7A7B7D"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            clipRule="evenodd"
            d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
            stroke="#7A7B7D"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Link to={"/products"} className=" text-blue-950 hover:text-blue-500">
        All Products
      </Link>
    </div>
  );
}

export default Navbar;