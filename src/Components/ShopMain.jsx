import React from "react";

function ShopMain() {
  return (
    <section>
      <div className=" grid grid-cols-1 md:grid-cols-2 min-h-[550px] ">
        {/*Info---------------------------------------------------------------*/}
        <div className="text-center sm:text-center md:text-left lg:text-left lg:ml-15 md:ml-15 space-y-3 mt-30">
          <h1 className="text-5xl   font-bold text-blue-900  sm:text-5xl  md:text-5xl lg:text-6xl  leading-relaxed xl:leading-normal ">
            Everything Your Pet Needs for a Happy, Healthy Life!
          </h1>
        </div>
      </div>
    </section>
  );
}

export default ShopMain;
