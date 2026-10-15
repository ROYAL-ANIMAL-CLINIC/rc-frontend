import React from 'react'
import { motion } from 'framer-motion'

{/* Service data --------------------------------------------------------------------------*/}
const services = [
    {
      title: "Grooming",
      description: "Our expert groomers provide full grooming services, ensuring your pets look and feel their best. We take care of  their grooming .",
      icon: "fas fa-dog",
    },
    {
      title: "Surgery",
      description: "Our clinic is equipped with state-of-the-art facilities to perform a variety of surgeries, from routine procedures to emergency care.",
      icon: "fas fa-user-md",
    },
    {
      title: "Scanning",
      description: "Using the latest technology, we offer accurate diagnostics and scanning services to detect health issues early.",
      icon: "fas fa-heartbeat",
    },
    {
      title: "Pet Shop",
      description: "Our pet shop offers a variety of high-quality pet food, toys,  and essentials,  you can find your pet needs in one place.",
      icon: "fas fa-paw",
    },
    {
       title: "Outpatient Department",
       description: "Our Outpatient Department offers consultations, treatments, and preventive care to keep your pet healthy and happy.",
       icon: "fas fa-stethoscope",
      },
      {
        title: "Vaccination",
        description: "Keep your pets protected with our vaccination services, including routine vaccines and those required for travel or boarding.",
        icon: "fas fa-syringe",
      },
    ];



function Service() {
  return (
   <>

   <div className='bg-gray-100'> 
   <div className="container mx-auto px-4 mb-10 ">

      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">

      {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-xl cursor-pointer overflow-hidden relative group"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#3B82F6",
              transition: { duration: 0.3 }
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="text-center mb-4">
              <motion.div 
                className='text-4xl text-blue-900 group-hover:text-white transition-colors duration-300'
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <i className={service.icon}></i>
              </motion.div>
            </div>

            <motion.h3 
              className="text-xl font-semibold text-center mb-2 text-gray-900 group-hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {service.title}
            </motion.h3>
            <motion.p 
              className="text-gray-600 text-center mb-4 group-hover:text-gray-100 transition-colors duration-300"
            >
              {service.description}
            </motion.p>
          </motion.div>
        ))}

        </div>
    </div>
    </div>

   </>
  )
}

export default Service