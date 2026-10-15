import React from 'react';
import { motion } from 'framer-motion';

const BlogCard = ({ post, index }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group"
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="overflow-hidden">
        <motion.img 
          src={post.image} 
          className="w-full h-56 object-cover"
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.4 }
          }}
        />
      </div>
      <motion.div 
        className="p-6"
        whileHover={{ backgroundColor: "#F8FAFC" }}
      >
        <motion.h3 
          className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
        >
          {post.title}
        </motion.h3>
        <motion.p 
          className="text-gray-600 mt-4"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {post.description}
        </motion.p>
        <p className="text-gray-500 mt-4 text-sm">{post.date}</p>
        <motion.a
          href={post.link}
          className="text-blue-500 hover:text-blue-700 mt-4 inline-block font-medium"
          whileHover={{ 
            x: 5,
            transition: { duration: 0.2 }
          }}
        >
          Read More →
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default BlogCard;