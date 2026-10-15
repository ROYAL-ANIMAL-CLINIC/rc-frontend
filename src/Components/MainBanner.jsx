import React from 'react'
import { Link } from 'react-router-dom'
import  ArrowIcon from '../assets/white_arrow_icon.svg';


function MainBanner() {
  return (
       
      <div className="flex  justify-center mt-6 bg-white/50  p-15 lg:p-30 xl:p-40 ">
        {/*Text Section------------------------------------------------------------------ */}
        <div className="text-center sm:text-center  lg:ml-15 space-y-3 ">
          <h1 className="text-3xl font-bold sm:text-5xl  md:text-5xl lg:text-6xl  leading-relaxed xl:leading-normal ">
            Where your pet's{" "}
            <span className="text-blue-600 font-extrabold ">Health</span>{" "}
          </h1>
          <h1 className="text-3xl  sm:text-5xl  md:text-5xl lg:text-6xl  leading-relaxed xl:leading-normal font-bold ">
            in safe hand
          </h1>
          <p className="text-black xl:max-w-[600px] text-lg  ">
            Welcome to Royal Animal Clinic! Where every pet is treated like
            family..Ensure your friend lead healthy and happy lives
          </p>

          {/*Button Section ------------------------------------------------------------------ */}

          <div className="flex justify-center gap-8  !mt-5 cursor-pointer ">
            <Link to ={"/appointment"}  className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2 text-md lg:text-md ">
              Appointment
            </Link>

            <Link to ={"/shop"} className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2 text-md lg:text-md">
              Shop Now 
              <img src = {ArrowIcon} alt = 'arrow' />
            </Link>
          </div>
        </div>
      
        </div>

  )
}

export default MainBanner