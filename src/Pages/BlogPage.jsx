import React from 'react'
import BlogCard from '../Components/BlogCard'
import BlogImage1 from '../assets/blog-1.jpg';
import BlogImage2 from '../assets/blog-2.jpg';
import BlogImage3 from '../assets/blog-3.jpg';
import BlogImage4 from '../assets/blog-4.jpg';
import BlogImage5 from '../assets/blog-5.jpg';
import BlogImage6 from '../assets/blog-6.jpg';
import BlogImage7 from '../assets/blog-7.jpg';
import BlogImage8 from '../assets/blog-8.jpg';
import BlogImage9 from '../assets/blog-9.jpg';
import BlogImage10 from '../assets/blog-10.jpg';

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
    description:"Emphasizes the importance of routine vet visits, vaccinations, and parasite prevention all services your clinic offers.",
    image:BlogImage3,
    date: "March 5, 2025",
  },


  {
    id: 4,
    title: "Separation Anxiety in Pets: Tips for a Happier Home Alone",
    description: "A very common issue for pet owners, offering practical advice and potentially leading to consultations for behavioral issues.",
    image: BlogImage4,
    date: "March 5, 2025" ,
  },
  {
    id: 5,
    title: "Debunking Pet Health Myths: What You Think You Know Might Be Wrong",
    description:"Creates an intriguing title and allows you to correct common misconceptions, positioning your clinic as an authority.",
    image:BlogImage5,
    date: "March 5, 2025",
  },
  {
    id: 6,
    title: "The Importance of Dental Health for Your Pet: Beyond Just Bad Breath",
    description:"Highlights a frequently overlooked aspect of pet care and promotes your dental services.",
    image:BlogImage6,
    date: "March 5, 2025",
  },

  {
    id: 7,
    title: "Preparing Your Pet for Emergencies: A Guide for Responsible Pet Parents",
    description: "Shows you care about pet safety and can include advice on first aid, emergency contacts, and when to seek immediate veterinary attention.",
    image: BlogImage7,
    date: "March 5, 2025" ,
  },
  {
    id: 8,
    title: "Senior Pet Care: Helping Your Older Companion Thrive",
    description:"Caters to a specific demographic of pet owners and can discuss age-related issues, specialized diets, and pain management.",
    image:BlogImage8,
    date: "March 5, 2025",
  },
  {
    id: 9,
    title: "Pet-Friendly Travel Tips: Exploring the World with Your Furry Friend",
    description:"A more lifestyle-oriented topic that can include advice on vaccinations, health certificates, and pet-safe destinations.",
    image:BlogImage9,
    date: "March 5, 2025",
  },

  {
    id: 10,
    title: "Bringing a New Pet Home: Essential Tips for a Smooth Transition",
    description:"Appeals to new pet owners and offers an opportunity to discuss initial vet check-ups, vaccinations, microchipping, and basic training.",
    image:BlogImage10,
    date: "March 5, 2025",
  },
];


function BlogPage() {
  return (
     <div className="bg-gray-100 py-16 p-5">
      <div className="container mx-auto text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Pet Care Corner</h2> 
        <p className="text-gray-600 mt-4">Helpful tips and information for your pet</p>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      

    </div>
  );
}
  

export default BlogPage