import React from 'react';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import test1 from '../assets/test-1.jpg'; 
import test2 from '../assets/test-2.jpg'; 
import test3 from '../assets/test-3.png'; 
import test4 from '../assets/test-4.jpg'; 

//  render  single testimonial card
const TestimonialCard = ({ name, date, imageSrc, rating, text }) => (
  <div className="w-full max-w-[350px] border border-gray-200 rounded-lg p-6 space-y-4 text-gray-500 text-lg shadow-md">
   
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-5">
       
         <img className="h-17 w-20 rounded-full " src={imageSrc} alt={`${name}'s avatar`} />
        
        {/*  rating stars */}
        <div className="flex">
          {Array.from({ length: rating }).map((_, index) => (
            <svg key={index}
              className="w-6 h-6 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.642 9.384c-.783-.57-.38-1.81.588-.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
    

    <p className="line-clamp-5 italic ">{text}</p>

    <div>
      <p className="text-gray-800 font-medium italic">{name}</p>
      <p className="text-gray-600 italic" >{date}</p>
    </div>
  </div>
);


const Testimonial = () => {

  // Array of testimonial data
  const testimonials = [
    {
      name: 'Donald Jackman',
      date: '22 Jan 2024',
      imageSrc: test2,
      rating: 5,
      text: '"The team at this clinic treated my dog like family. They explained everything so clearly and gave my pup the best care possible. ”',
    },
    {
      name: 'Sarah Johnson',
      date: '15 april 2024',
      imageSrc: test1,
      rating: 4,
      text: '“I’ve never felt more at ease leaving my cat in someone else’s care. The vets are professional, compassionate, and truly love animals.”',
    },
    {
      name: 'Michael Brown',
      date: '01 Mar 2025',
      imageSrc: test3,
      rating: 5,
      text: '“From the moment we walked in, the staff made us feel welcome. They handled our emergency quickly and saved our dog’s life. ”',
    },
    {
      name: 'Emily White',
      date: '10 Mar 2025',
      imageSrc: test1,
      rating: 4,
      text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
    },
    {
      name: 'Kevin Miller',
      date: '28 Mar 2025',
      imageSrc:test4,
      rating: 5,
      text: '“Such a wonderful clinic! Our appointments are always on time, and the follow-up calls show how much they care about each animal.”',
    },
  ];

  // Settings 
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 3, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 3000, 
    responsive: [
      {
        breakpoint: 1024, //  screens smaller than 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 640, //  screens smaller than 640px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-12 bg-gray-100  ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Clients Say</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index}
              className="p-7   flex justify-center">
              <TestimonialCard {...testimonial}  />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;