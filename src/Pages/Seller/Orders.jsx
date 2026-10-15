import React from 'react'
import { useAppContext } from '../../Context/AppContext';
import { useState } from 'react';
import { dummyOrders } from '../../assets/products';
import BoxImage from '../../assets/box_icon.svg'
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function Orders() {


  const {currency, axios} = useAppContext()
  const[orders, setOrders] = useState([])

  const fetchOrders = async()=>{
    try {
        const {data} = await axios.get('/api/order/seller');
        if(data.success){
            setOrders(data.orders)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(data.message)
    }
  };

  useEffect(()=>{
      fetchOrders();          
  },[])


  return (

        <div className = 'flex-1 h-[95vh] overflow-y-scroll'>
          <div className="md:p-10 p-4 space-y-4">
          <h1 className="text-2xl font-bold mb-4"> Admin - Orders</h1>  
              {orders.map((order, index) => (
                  <div key={index} className="flex flex-col md:grid md:items-center md:flex-row justify-between gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">
                      <div className="flex gap-5 max-w-80">
                          <img className="w-12 h-12 object-cover " src={BoxImage} alt="boxIcon" />
                          <div>
                              {order.items.map((item, index) => (
                                  <div key={index} className="flex flex-col justify-center">
                                      <p className="font-medium">
                                          {item.product.name} {" "}
                                          <span className={"text-blue-500 "}>
                                            x {item.quantity}</span>
                                      </p>
                                  </div>
                              ))}
                          </div>
                      </div>
  
                      <div className="text-sm">
                          <p className='font-medium mb-1'>{order.address.firstName}
                             {order.address.lastName}</p>
                          <p>{order.address.street}, 
                            {order.address.town}, 
                            {order.address.province},
                            {order.address.zipcode}, 
                            </p>
                            <p></p>
                            <p>{order.address.phone}</p>
                      </div>
  
                      <p className="font-medium text-base my-auto text-black/70">{currency}{order.amount}</p>
  
                      <div className="flex flex-col text-sm">
                          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                          <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                      </div>
                  </div>
              ))}
          </div>
          </div>
      );
  };
 


export default Orders