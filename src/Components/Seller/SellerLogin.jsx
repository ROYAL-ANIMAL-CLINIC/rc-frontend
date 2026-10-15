import React from 'react'
import { useAppContext } from '../../Context/AppContext'
import { useState } from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function SellerLogin() {
    const {isSeller,setIsSeller,navigate,axios} = useAppContext()

    const [email,setEmail] = useState("");

    const [password , setPassword] = useState("");

    const onSubmitHandler = async(event)=>{
        try {
            event.preventDefault();
            const {data} = await axios.post('/api/seller/login',{email,password})
            if(data.success){
                setIsSeller(true)
                navigate('/seller')
            }else{
                toast.error(data.messsage)
            }
        } catch (error) {
            toast.error(error.messsage)
        }

    }

    
    useEffect(()=>{
        if(isSeller){
            nqvigate("/seller")
        }
    },[isSeller])

  return !isSeller && (
    <div className = " justify-between fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm">

        <form onSubmit = {onSubmitHandler} className = 'flex flex-col-gap-5 m-auto items-start p-8 py-15 min-w-80  rounded-lg shadow-xl border border-gray-200'>

            <div >

                <p className = '  mb-5 text-2xl font-medium px-25  m-auto'>
                    <span className = 'text-blue-500 '>Seller </span>Login</p>
               
               
                <div className = 'w-full mt-5'>
                    <p>Email</p>
                    <input 
                    onChange = {(e)=>setEmail(e.target.value)} 
                    value = {email}
                    type = "email"
                     placeholder="Email" 
                     className="border border-gray-200 rounded w-80 p-2 mt-1 outline-blue-500" 
                     required/>
                </div>

                <div className = 'w-full mt-5'>
                    <p>Password</p>
                    <input
                    onChange = {(e)=>setPassword(e.target.value)} 
                    value = {password} type = "Password" 
                    placeholder="Password"
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-blue-500"
                    required />
                </div>

                
                <button className = "mt-5 justify-between bg-blue-500 hover:bg-blue-600 transition-all text-white w-full py-2 rounded-md cursor-pointer ">
                Login
                </button>


                </div>

                
           

        </form>

    </div>
  )
}

export default SellerLogin