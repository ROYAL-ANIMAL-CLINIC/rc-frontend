import React from "react";

function Contact() {
  return (
    <div>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Get In Touch
          </h2>
          <p className="text-gray-600 mt-4">
            Helpful tips and information for your pet
          </p>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
            {/* Clinic Information -----------------------------------------------------------------------------*/}
            <div className="  p-4 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-black mb-4">
                Royal Animal Clinic
              </h1>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  Opening Hours
                </h2>
                <ul className="text-gray-600">
                  <li>Weekdays: 8.00AM - 9.00PM</li>
                  <li>Saturday : 8.00AM - 12.00PM</li>
                  <li>
                    Sunday: <span className="text-red-600">Closed</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6  ">
                <h2 className="text-xl font-semibold text-gray-700">
                  Contact Information
                </h2>
                <ul className="text-gray-600">
                  <li className="flex items-center mb-2">
                    <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                    Address: No 2 ,Station Approch road ,Colombo
                  </li>
                  <li className="flex items-center mb-2">
                    <i className="fas fa-phone-alt mr-2 text-blue-600"></i>
                    Phone: 071-255 1234 | 041-444 5096
                  </li>
                  <li className="flex items-center mb-2">
                    <i className="fas fa-envelope mr-2 text-blue-600"></i>
                    Email: contactroyalclinic@gmail.com
                  </li>
                </ul>
              </div>

              <div className="mb-6 ">
                <h2 className="text-xl font-semibold text-gray-700">
                  Follow Us
                </h2>
                <div className="flex space-x-4 ">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <i className="fab fa-facebook-f text-2xl"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map ---------------------------------------------------------------------------------------*/}
            <div className="rounded-lg shadow-lg">
              <div className="aspect-w-16 h-full ">
                <iframe
                  title="Google Map"
                  className="w-full h-full rounded-lg"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6390823737543!2d79.85004699999998!3d6.933668600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25922460c269b%3A0x6acb064d943db619!2sColombo%20Fort%20Station%2C%20Colombo!5e0!3m2!1sen!2slk!4v1769231998201!5m2!1sen!2slk"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
