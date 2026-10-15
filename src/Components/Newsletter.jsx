import React, { useState } from "react";
import { useAppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';

function Newsletter() {

  
  const [email, setEmail] = useState("");

  const [isSubscribed, setIsSubscribed] = useState(false);
  
  //display rerror messages 
  const [error, setError] = useState("");

  const { axios } = useAppContext();

  // handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // email validation
    if (!email) {
      setError("Please enter a valid email address.");
      return; 
    }

    try {
      const { data } = await axios.post('/api/newsletter/subscribe', { email });
      
      if (data.success) {
        setIsSubscribed(true);
        setEmail(""); 
        setError("");
        toast.success(data.message);
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      setError('Failed to subscribe. Please try again.');
      toast.error('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="bg-blue-950 py-12">

      <div className="max-w-7xl mx-auto text-center px-6 sm:px-12 lg:px-24">

        <h2 className="text-3xl font-bold text-white mb-4 sm:text-4xl">
          Subscribe to Our Newsletter
        </h2>

        <p className="text-gray-100 mb-6 bg-blend-darken sm:text-lg">
          Stay updated with the latest news and offers from our clinic.
        </p>

        {isSubscribed ? (


          <div className="text-lg text-green-500">
            Thank you for subscribing! You will receive updates shortly.
          </div>
        ) : (

          //  form

          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 items-center">
            <div className="w-full sm:max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Display error message  */}
            {error && <p className="text-red-500">{error}</p>}

            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Newsletter;