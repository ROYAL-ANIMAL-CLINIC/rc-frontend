import React, { useState } from 'react';
import { useAppContext } from '../Context/AppContext';
import toast from 'react-hot-toast'; 

function AppointmentBook() {


  //  state variable for appointment and its updater  setAppointment.
  const [appointment, setAppointment] = useState({
    petName: "",
    ownerName: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    service: "",
    message: "",
  });

  const { axios } = useAppContext();

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    try {
      const { data } = await axios.post('/api/appointment/book', appointment);
      
      if (data.success) {
        toast.success(data.message);
        setAppointment({
          petName: "",
          ownerName: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          service: "",
          message: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to book appointment');
    }
  };

  return (

<div className="p-6 bg-gray-100  ">

      <h1 className="text-2xl mt-8 font-bold mb-4">Book Here...</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">

        <div className="flex gap-6">
          <input
            type="text"
            placeholder="Pet's Name"
            value={appointment.petName}
           
            onChange={(e) => setAppointment({ ...appointment, petName: e.target.value })}
            className="w-full p-2 border-gray-400 border rounded"
            required 
          />

          <input
            type="text"
            placeholder="Owner's Name"
            value={appointment.ownerName}
            // Updates the 'ownerName' in the 'appointment' state whenever the input value changes
            onChange={(e) => setAppointment({ ...appointment, ownerName: e.target.value })}
            className="w-full border-gray-400 p-2 border rounded"
            required 
          />
        </div>

        {/* Row for Mobile Number and Email input fields */}
        <div className="flex gap-6">
          <input
            type="phone"
            placeholder="Mobile Number"
            value={appointment.phone}
            // Updates the 'phone' in the 'appointment' state whenever the input value changes
            onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })}
            className="w-full border-gray-400 p-2 border rounded"
            required 
          />

          <input
            type="email"
            placeholder="Your Email"
            value={appointment.email}
            // Updates the 'email' in the 'appointment' state whenever the input value changes
            onChange={(e) => setAppointment({ ...appointment, email: e.target.value })}
            className="w-full border-gray-400 p-2 border rounded"
            required 
          />
        </div>

        {/* Row for Date and Time input fields */}
        <div className="flex gap-6">
          <input
            type="date"
            value={appointment.date}
            onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
            className="w-full border-gray-400 p-2 border rounded"
            required 
          />
          <input
            type="time"
            value={appointment.time}
            onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
            className="w-full border-gray-400 p-2 border rounded"
            required 
          />
        </div>

        <select
          value={appointment.service}
          onChange={(e) => setAppointment({ ...appointment, service: e.target.value })}
          className="w-full border-gray-400  p-2 border rounded"
          required 
        >
          <option value="">Select Service</option>
          <option value="General Checkup">OPD</option>
          <option value="Vaccination">Vaccination</option>
          <option value="Grooming">Grooming</option>
          <option value="Surgery">Surgery</option>
          <option value="Scanning">Scanning</option>
        </select>

        <textarea
          id="message"
          placeholder="Type Here"
          name="message"
          value={appointment.message}
          onChange={(e) => setAppointment({ ...appointment, message: e.target.value })}
          className="border border-gray-400 rounded-md p-2 h-32 resize-none w-full"
        />

        <div className="flex justify-center mt-4">
          <button type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Book Appointment
          </button>
        </div>

      </form>
    </div>
  );
};

export default AppointmentBook;