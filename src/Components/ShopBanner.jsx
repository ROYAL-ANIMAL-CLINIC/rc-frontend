import React from 'react'
import { Link } from 'react-router-dom'

function ShopBanner() {
  return (

    <section>
    <div className=' grid grid-cols-1 md:grid-cols-2 min-h-[550px]  '>
        
           {/*Info---------------------------------------------------------------*/}
   
             <div className='flex flex-col justify-center py-5 px-10'>
   
               <div className='text-center sm:text-center md:text-left lg:text-left lg:ml-15 space-y-3 '>
                  <h1 className='text-3xl font-bold text-white  sm:text-5xl  md:text-5xl lg:text-6xl  leading-relaxed xl:leading-normal '>
                  Everything Your Pet Needs for a Happy, Healthy Life! 
                 </h1>
        
   
                 {/*SHOP Section ------------------------------------------------------- */}
   
                 <div className='flex justify-center gap-8 md:justify-start lg:justify-baseline !mt-5 '>
                   <Link to ={"/shop"} className=' text-indigo-800 bg-white hover:text-white hover:bg-blue-700  font-semibold rounded-md  px-8 py-3 duration-300 flex items-center gap-2 text-sm lg:text-lg '>
                       Shop Now
                   </Link >       
                </div>
                 </div>
              
             </div>
           
         </div>
   
       </section>
  )
}

export default ShopBanner