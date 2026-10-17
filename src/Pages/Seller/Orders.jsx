import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../Context/AppContext';
import { getProductImageUrl } from '../../utils/productImage';
import toast from 'react-hot-toast';

function Orders() {
    const { currency, axios } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);
    const orderStatuses = ['Order Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/seller');
            if (data.success) {
                setOrders(data.orders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleStatusChange = async (orderId, status) => {
        setUpdatingOrderId(orderId);
        try {
            const { data } = await axios.put(`/api/order/${orderId}/status`, { status });
            if (data.success) {
                setOrders((currentOrders) => currentOrders.map((order) =>
                    order._id === orderId ? { ...order, status: data.order.status } : order
                ));
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUpdatingOrderId(null);
        }
    };

    const handlePaymentChange = async (orderId, isPaid) => {
        setUpdatingOrderId(orderId);
        try {
            const { data } = await axios.put(`/api/order/${orderId}/payment`, { isPaid });
            if (data.success) {
                setOrders((currentOrders) => currentOrders.map((order) =>
                    order._id === orderId ? { ...order, isPaid: data.order.isPaid } : order
                ));
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUpdatingOrderId(null);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="flex-1 min-h-[95vh] overflow-y-auto bg-slate-50/70">
            <div className="space-y-6 p-4 md:p-8 lg:p-10">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Store management</p>
                    <h1 className="mt-1 text-2xl font-bold text-slate-900">Orders</h1>
                    <p className="mt-1 text-sm text-slate-500">Review recent orders, products, and payment status.</p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                        <h2 className="font-semibold text-slate-800">All orders</h2>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                        </span>
                    </div>

                    {orders.length === 0 ? (
                        <div className="px-5 py-16 text-center">
                            <p className="font-medium text-slate-700">No orders yet</p>
                            <p className="mt-1 text-sm text-slate-500">New customer orders will appear here.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[950px] text-left text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-5 py-3 font-semibold">Order</th>
                                        <th className="px-5 py-3 font-semibold">Products</th>
                                        <th className="px-5 py-3 font-semibold">Customer</th>
                                        <th className="px-5 py-3 font-semibold">Date</th>
                                        <th className="px-5 py-3 font-semibold">Order status</th>
                                        <th className="px-5 py-3 font-semibold">Payment</th>
                                        <th className="px-5 py-3 text-right font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {orders.map((order) => {
                                        const address = order.address;
                                        const customerName = [address?.firstName, address?.lastName]
                                            .filter(Boolean)
                                            .join(' ') || 'Customer';

                                        return (
                                            <tr key={order._id} className="align-top transition-colors hover:bg-slate-50/70">
                                                <td className="whitespace-nowrap px-5 py-4">
                                                    <p className="font-semibold text-slate-800">#{order._id?.slice(-8).toUpperCase()}</p>
                                                    <p className="mt-1 text-xs text-slate-500">{order.items?.length || 0} line items</p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex min-w-[250px] flex-col gap-3">
                                                        {(order.items || []).map((item, index) => {
                                                            const product = item.product;
                                                            return (
                                                                <div key={product?._id || index} className="flex items-center gap-3">
                                                                    {product?.image ? (
                                                                        <img
                                                                            src={getProductImageUrl(product.image)}
                                                                            alt={product.name || 'Product'}
                                                                            className="h-12 w-12 shrink-0 rounded-xl border border-slate-200 bg-white object-cover"
                                                                            loading="lazy"
                                                                        />
                                                                    ) : (
                                                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-xs text-slate-400">
                                                                            N/A
                                                                        </div>
                                                                    )}
                                                                    <div className="min-w-0">
                                                                        <p className="max-w-[240px] truncate font-medium text-slate-800">
                                                                            {product?.name || 'Product unavailable'}
                                                                        </p>
                                                                        <p className="mt-0.5 text-xs text-slate-500">Qty: {item.quantity}</p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <p className="font-medium text-slate-800">{customerName}</p>
                                                    <p className="mt-1 max-w-[230px] text-xs leading-5 text-slate-500">
                                                        {[address?.street, address?.town, address?.province, address?.zipcode]
                                                            .filter(Boolean)
                                                            .join(', ') || 'Address unavailable'}
                                                    </p>
                                                    {address?.phone && <p className="mt-1 text-xs text-slate-500">{address.phone}</p>}
                                                </td>
                                                <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}
                                                </td>
                                                <td className="whitespace-nowrap px-5 py-4">
                                                    <select
                                                        aria-label={`Order status for ${order._id}`}
                                                        value={order.status || 'Order Placed'}
                                                        disabled={updatingOrderId === order._id}
                                                        onChange={(event) => handleStatusChange(order._id, event.target.value)}
                                                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:cursor-wait disabled:opacity-60"
                                                    >
                                                        {orderStatuses.map((status) => (
                                                            <option key={status} value={status}>{status}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="whitespace-nowrap px-5 py-4">
                                                    <select
                                                        aria-label={`Payment status for ${order._id}`}
                                                        value={order.isPaid ? 'paid' : 'pending'}
                                                        disabled={updatingOrderId === order._id}
                                                        onChange={(event) => handlePaymentChange(order._id, event.target.value === 'paid')}
                                                        className={`rounded-lg border px-3 py-2 text-xs font-semibold outline-none transition focus:ring-2 disabled:cursor-wait disabled:opacity-60 ${
                                                            order.isPaid
                                                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 focus:ring-emerald-100'
                                                                : 'border-amber-200 bg-amber-50 text-amber-700 focus:ring-amber-100'
                                                        }`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="paid">Paid</option>
                                                    </select>
                                                    <p className="mt-1 text-xs text-slate-500">{order.paymentType || '—'}</p>
                                                </td>
                                                <td className="whitespace-nowrap px-5 py-4 text-right font-semibold text-slate-900">
                                                    {currency}{Number(order.amount || 0).toLocaleString()}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Orders;
