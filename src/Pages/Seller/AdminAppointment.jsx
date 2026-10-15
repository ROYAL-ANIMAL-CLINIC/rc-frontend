import React, { useState, useEffect } from "react";
import { useAppContext } from '../../Context/AppContext';
import toast from 'react-hot-toast';

function AdminAppointment() {
    
      const [appointments, setAppointments] = useState([]);
      const { axios } = useAppContext();

      // Fetch appointments
      const fetchAppointments = async () => {
        try {
          const { data } = await axios.get('/api/appointment/list');
          if (data.success) {
            setAppointments(data.appointments);
          }
        } catch (error) {
          toast.error('Failed to fetch appointments');
        }
      };

      useEffect(() => {
        fetchAppointments();
      }, []);
    
      const handleStatusUpdate = async (id, status) => {
        try {
          const { data } = await axios.put(`/api/appointment/update/${id}`, { status });
          if (data.success) {
            toast.success(data.message);
            fetchAppointments();
          }
        } catch (error) {
          toast.error('Failed to update status');
        }
      };
    
      return (
        <div className="flex-1 w-full md:p-10 p-4">
          <h1 className="text-2xl font-bold mb-4">Admin - Manage Appointments</h1>  
    
          {/* Appointment Table */}
          <div className="bg-white rounded shadow overflow-x-auto">
            <h2 className="text-lg font-semibold p-4 border-b">Appointments</h2>
            {appointments.length === 0 ? (
              <p className="text-gray-500 p-4">No appointments found.</p>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Pet Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Owner</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date & Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Service</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{appointment.petName}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{appointment.ownerName}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div>{appointment.email}</div>
                        <div className="text-gray-500">{appointment.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div>{appointment.date}</div>
                        <div className="text-gray-500">{appointment.time}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{appointment.service}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusUpdate(appointment._id, 'confirmed')}
                            className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(appointment._id, 'cancelled')}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      );
    };
export default AdminAppointment