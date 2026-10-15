import React from 'react'
import { useAppContext } from '../../Context/AppContext';
import { Link, Outlet } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import toast from 'react-hot-toast';

function SellerLayout() {

    const { axios, navigate } = useAppContext();

    const addProducticon = (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
    );

    const productListicon = (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
    );

    const ordersicon = (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
    );

    const appointicon = (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: addProducticon },
        { name: "Product List", path: "/seller/product-list", icon: productListicon },
        { name: "Orders", path: "/seller/orders", icon: ordersicon },
        { name: "Appointments", path: "/seller/appointment", icon: appointicon },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/seller/logout');
            if (data.success) {
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">

            {/* Fixed Topbar */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-3 bg-white z-50 flex-shrink-0 shadow-sm">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 flex-shrink-0">
                        <svg viewBox="0 0 300 300" className="w-full h-full">
                            <path d="M 60,150 C 50,80 100,40 160,45 C 220,50 255,100 250,160 C 245,210 200,260 140,255 C 90,250 65,220 55,180" fill="none" stroke="#0D9488" strokeWidth="16" strokeLinecap="round" />
                            <g transform="translate(45, 35)">
                                <path d="M 40,35 Q 20,50 25,90 Q 30,110 50,115 Z" fill="#FFFFFF" stroke="#2D3748" strokeWidth="6" strokeLinejoin="round" />
                                <path d="M 160,35 Q 180,50 175,90 Q 170,110 150,115 Z" fill="#FFFFFF" stroke="#2D3748" strokeWidth="6" strokeLinejoin="round" />
                                <path d="M 40,50 Q 100,20 160,50 Q 170,100 150,150 Q 100,180 50,150 Q 30,100 40,50 Z" fill="#FFFFFF" stroke="#2D3748" strokeWidth="6" />
                                <circle cx="80" cy="85" r="7" fill="#2D3748" />
                                <circle cx="120" cy="85" r="7" fill="#2D3748" />
                                <circle cx="78" cy="83" r="2" fill="#FFFFFF" />
                                <circle cx="118" cy="83" r="2" fill="#FFFFFF" />
                                <path d="M 90,95 Q 100,90 110,95 Q 115,115 100,120 Q 85,115 90,95 Z" fill="#EDF2F7" stroke="#2D3748" strokeWidth="4" />
                                <ellipse cx="100" cy="105" rx="10" ry="7" fill="#1A202C" />
                                <path d="M 100,112 L 100,130" stroke="#2D3748" strokeWidth="4" strokeLinecap="round" />
                                <path d="M 80,125 Q 100,135 120,125 Q 125,145 100,155 Q 75,145 80,125 Z" fill="#E53E3E" stroke="#2D3748" strokeWidth="4" />
                            </g>
                            <g transform="translate(110, 115)">
                                <path d="M 20,40 L 10,10 L 40,25 Z" fill="#FFFFFF" stroke="#2D3748" strokeWidth="5" strokeLinejoin="round" />
                                <path d="M 80,40 L 90,10 L 60,25 Z" fill="#FFFFFF" stroke="#2D3748" strokeWidth="5" strokeLinejoin="round" />
                                <path d="M 25,30 Q 50,15 75,30 Q 85,60 75,100 Q 60,120 40,120 Q 20,120 15,100 Q 5,60 25,30 Z" fill="#FFFFFF" stroke="#2D3748" strokeWidth="5" />
                                <ellipse cx="38" cy="55" rx="4" ry="6" fill="#2D3748" />
                                <ellipse cx="62" cy="55" rx="4" ry="6" fill="#2D3748" />
                                <polygon points="50,65 46,62 54,62" fill="#2D3748" />
                                <path d="M 25,68 L 10,65 M 25,73 L 8,73" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
                                <path d="M 75,68 L 90,65 M 75,73 L 92,73" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
                                <path d="M 70,110 Q 85,125 75,135 Q 60,140 45,130" fill="none" stroke="#2D3748" strokeWidth="5" strokeLinecap="round" />
                            </g>
                        </svg>
                    </div>
                    <span className="text-blue-950 font-bold text-base tracking-wide">ROYAL CLINIC</span>
                </Link>

                <div className="flex items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700 hidden sm:block">Hi, Admin</span>
                    </div>
                    <button onClick={logout} className="border border-gray-300 hover:bg-gray-50 rounded-full text-sm px-4 py-1.5 transition">
                        Logout
                    </button>
                </div>
            </div>

            {/* Body: Sidebar + Content */}
            <div className="flex flex-1 overflow-hidden">

                {/* Fixed Sidebar */}
                <div className="md:w-56 w-14 border-r border-gray-200 bg-white flex-shrink-0 flex flex-col overflow-y-auto">
                    <nav className="pt-4 flex flex-col gap-1 px-2">
                        {sidebarLinks.map((item) => (
                            <NavLink
                                to={item.path}
                                key={item.name}
                                end={item.path === "/seller"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 py-2.5 px-3 rounded-lg border-r-[3px] transition-all
                                    ${isActive
                                        ? "bg-blue-50 border-blue-500 text-blue-600 font-semibold"
                                        : "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`
                                }
                            >
                                {item.icon}
                                <span className="md:block hidden text-sm">{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default SellerLayout;
