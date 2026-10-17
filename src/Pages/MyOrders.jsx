import { useEffect, useState } from 'react';
import { useAppContext } from '../Context/AppContext';
import { getProductImageUrl } from '../utils/productImage';
import toast from 'react-hot-toast';

const orderStatuses = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  useEffect(() => {
    if (!user) {
      setMyOrders([]);
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const { data } = await axios.get('/api/order/user');
        if (data.success) {
          setMyOrders(data.orders);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchMyOrders();
  }, [axios, user]);

  return (
    <main className="mx-auto mt-24 min-h-[60vh] max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Your account</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">My Orders</h1>
        <p className="mt-2 text-sm text-slate-500">Track the latest status of your purchases.</p>
      </div>

      {myOrders.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <p className="font-semibold text-slate-800">No orders to show</p>
          <p className="mt-1 text-sm text-slate-500">Your orders will appear here after checkout.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {myOrders.map((order) => {
            const status = order.status || 'Order Placed';
            const isCancelled = status === 'Cancelled';
            const activeStep = orderStatuses.indexOf(status);

            return (
              <section key={order._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Order ID</p>
                    <p className="mt-1 font-semibold text-slate-800">#{order._id?.slice(-8).toUpperCase()}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <p className="text-slate-500">
                      Ordered <span className="font-medium text-slate-700">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}</span>
                    </p>
                    <p className="text-slate-500">
                      Total <span className="font-semibold text-slate-900">{currency}{Number(order.amount || 0).toLocaleString()}</span>
                    </p>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      order.isPaid ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {order.isPaid ? 'Paid' : 'Payment pending'}
                    </span>
                  </div>
                </div>

                <div className="px-5 py-5 sm:px-6">
                  <div className="mb-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h2 className="text-sm font-semibold text-slate-800">Order progress</h2>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isCancelled
                          ? 'bg-rose-50 text-rose-700'
                          : status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-indigo-50 text-indigo-700'
                      }`}>
                        {status}
                      </span>
                    </div>

                    {isCancelled ? (
                      <p className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        This order has been cancelled. Please contact the clinic if you need help.
                      </p>
                    ) : (
                      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {orderStatuses.map((step, index) => {
                          const isComplete = activeStep >= index;
                          return (
                            <li key={step} className="flex items-center gap-2">
                              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                isComplete ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
                              }`}>
                                {isComplete ? '✓' : index + 1}
                              </span>
                              <span className={`text-xs font-medium sm:text-sm ${
                                isComplete ? 'text-slate-800' : 'text-slate-400'
                              }`}>
                                {step}
                              </span>
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </div>

                  <div className="divide-y divide-slate-100 border-t border-slate-100">
                    {(order.items || []).map((item, index) => {
                      const product = item.product;
                      return (
                        <div key={product?._id || index} className="flex items-center gap-4 py-4">
                          {product?.image ? (
                            <img
                              src={getProductImageUrl(product.image)}
                              alt={product.name || 'Product'}
                              className="h-16 w-16 shrink-0 rounded-xl border border-slate-200 bg-white object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-400">
                              N/A
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold text-slate-800">{product?.name || 'Product unavailable'}</p>
                            <p className="mt-1 text-sm text-slate-500">
                              {product?.category || 'Product'} · Qty {item.quantity || 1}
                            </p>
                          </div>
                          <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                            {currency}{(product?.price || 0) * (item.quantity || 1)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default MyOrders;
