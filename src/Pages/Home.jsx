import React from "react";
import MainBanner from "../Components/MainBanner";
import About from "../Components/About";
import Service from "../Components/Service";
import ShopBanner from "../Components/ShopBanner";
import ShopBanner1Image from "../assets/shopBanner1.png";
import Blog from "../Components/Blog";
import FAQ from "../Components/FAQ";
import Contactinfo from "./Contactinfo";
import HeroIamge from "../assets/home.jpg";
import AppointmentHome from "../Components/AppointmentHome";
import AppointmentImage from "../assets/appointmrnt.jpg";
import Testimonial from "../Components/Testimonial";

const BgStyle = {
  backgroundImage: `url(${HeroIamge})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundAttachment: "local",
  height: "100%",
  width: "100%",
};

const BgStyle1 = {
  backgroundImage: `url(${ShopBanner1Image})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundAttachment: "local",
  height: "100%",
  width: "100%",
};

const BgStyle3 = {
  backgroundImage: `url(${AppointmentImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundAttachment: "local",
  height: "100%",
  width: "100%",
};

function Home() {
  return (
    <div>
      <div style={BgStyle} className="mt-20">
        <MainBanner />
      </div>
      <About />
      <Service />
      <div style={BgStyle3}>
        <AppointmentHome />
      </div>
      <Blog />
      <div style={BgStyle1}>
        <ShopBanner />
      </div>

      <FAQ />
      {/*<Testimonial/>* */}
      <Contactinfo />
    </div>
  );
}

export default Home;
