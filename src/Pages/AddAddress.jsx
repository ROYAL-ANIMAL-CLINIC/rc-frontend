import { useEffect, useState } from 'react';
import { useAppContext } from "../Context/AppContext";
import toast from 'react-hot-toast';

const InputField = ({ type, label, name, handleChange, address }) => (
    <label className="block space-y-1">
        <span className="text-xs font-medium text-slate-700">{label}</span>
        <input
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            type={type}
            placeholder={label}
            onChange={handleChange}
            name={name}
            value={address[name]}
            required
        />
    </label>
);

function AddAddress() {
    const { axios, user, navigate } = useAppContext();
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        town: '',
        province: '',
        zipcode: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/address/add', { address });

            if (data.success) {
                toast.success(data.message);
                navigate('/cart');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/cart');
        }
    }, [navigate, user]);

    return (
        <main className="flex min-h-screen items-center bg-slate-50 px-6 pb-6 pt-24 md:px-10 lg:px-14 xl:px-20">
            <div className="mx-auto w-full 
setCartitems is not a function">
                <form onSubmit={onSubmitHandler} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/60 sm:p-6">
                    <div className="mb-4 border-b border-slate-100 pb-3">
                        <h2 className="text-base font-semibold text-slate-900">Add Shipping Address</h2>
                        <p className="mt-0.5 text-xs text-slate-500">Enter your details so we can deliver your order to the right place.

Add Shipping Address</p>
                    </div>

                    <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
                        <InputField handleChange={handleChange} address={address} name="firstName" type="text" label="First Name" />
                        <InputField handleChange={handleChange} address={address} name="lastName" type="text" label="Last Name" />
                        <div className="sm:col-span-2">
                            <InputField handleChange={handleChange} address={address} name="email" type="email" label="Email Address" />
                        </div>
                        <div className="sm:col-span-2">
                            <InputField handleChange={handleChange} address={address} name="street" type="text" label="Street Address" />
                        </div>
                        <InputField handleChange={handleChange} address={address} name="town" type="text" label="Town / City" />
                        <InputField handleChange={handleChange} address={address} name="province" type="text" label="Province" />
                        <InputField handleChange={handleChange} address={address} name="zipcode" type="number" label="Zipcode" />
                        <InputField handleChange={handleChange} address={address} name="phone" type="tel" label="Contact Number" />
                    </div>

                    <button
                        type="submit"
                        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white shadow-md shadow-blue-700/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
                    >
                        Save Address
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                    </button>
                </form>
            </div>
        </main>
    );
}

export default AddAddress;
