import React from 'react'
import { Link } from 'react-router-dom'
import BlogCard from './BlogCard'
import BlogImage1 from '../assets/blog-1.jpg';
import BlogImage2 from '../assets/blog-2.jpg';
import BlogImage3 from '../assets/blog-3.jpg';

 const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Pet's Body Language: What Are They Really Trying to Tell You?",
    description: "Helps owners better connect with their pets and identify early signs of distress or illness.",
    image: BlogImage1,
    date: "March 5, 2025" ,
  },
  {
    id: 2,
    title: "The Ultimate Guide to Pet Nutrition: Choosing the Right Food for Every Life Stage",
    description:"Addresses a common concern for pet owners and allows you to subtly recommend specific brands or dietary approaches.",
    image:BlogImage2,
    date: "March 5, 2025",
  },
  {
    id: 3,
    title: "Preventative Care Checklist: Keeping Your Pet Healthy Year-Round",
    description:"Emphasizes the importance of routine vet visits, vaccinations, and parasite prevention – all services your clinic offers.",
    image:BlogImage3,
    date: "March 5, 2023",
  },
];


function Blog() {
  return (
     <div className="bg-gray-100 py-16 p-5">


      <div className="container mx-auto text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Pet Care Corner</h2>
        <p className="text-gray-600 mt-4">Helpful tips and information for your pet</p>
      </div>

      <div className=" mt-10 flex justify-end items-center bg-gray-100">
      <Link to ={"/blog"} className="px-6 py-3  text-blue-600 font-semibold  hover:text-blue-700 ">
        Read More Blog Posts Here...
      </Link>
    </div>


      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

     

    </div>
  );
}
  

export default Blog