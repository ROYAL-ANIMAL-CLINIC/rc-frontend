import { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { dummyAddress } from "../assets/products";
import ProductCard from "../Components/ProductCard";
import toast from "react-hot-toast";

function Cart() {
  const {
    products,
    currency,
    cartitems,
    removeFromcart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartamount,
    axios,
    user,
    setCartItems,
  } = useAppContext();
  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setpaymentOption] = useState("COD");
  const [totalAmount, setTotalAmount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Function to process the cart items
  const getCart = () => {
    let tempArray = [];
    for (const key in cartitems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        product.quantity = cartitems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    town: "",
    province: "",
    zipcode: "",
  });

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addNewAddress = async () => {
    try {
      const { data } = await axios.post("/api/address/add", {
        address: newAddress,
      });
      if (data.success) {
        toast.success(data.message);
        getUserAddress();
        setShowAddressForm(false);
        setNewAddress({ street: "", town: "", province: "", zipcode: "" });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //handle the order placement
  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //fetch the cart details
  useEffect(() => {
    if (products.length > 0 && cartitems) {
      getCart();
    }
  }, [products, cartitems]);

  //calculate the total amount
  useEffect(() => {
    let totalAmount = 0;
    cartArray.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    setTotalAmount(totalAmount);
  }, [cartArray]);

  // Ensure there are items in the cart and products available
  useEffect(() => {
    if (cartArray.length > 0 && products.length > 0) {
      const category = cartArray[0]?.category;
      const related = products.filter(
        (item) =>
          item.category === category &&
          !cartArray.some((cartItem) => cartItem._id === item._id) &&
          item.inStock,
      );
      setRelatedProducts(related.slice(0, 5));
    } else {
      setRelatedProducts([]);
    }
  }, [cartArray, products]);

  // Function to handle changes in the quantity of a cart item
  const handleQuantityChange = (productId, quantity) => {
    updateCartItem(productId, parseInt(quantity));
  };

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return products.length > 0 && cartitems ? (
    <div className="flex flex-col mt-16">
      <div className="grid w-full grid-cols-1 items-start gap-8 px-6 md:px-10 lg:grid-cols-2 lg:px-14 xl:px-20">
                   {" "}
        <div className="min-w-0 mb-8 lg:mb-16">
                         {" "}
          <h1 className="text-3xl font-medium mb-6">
                                Shopping Cart{" "}
            <span className="text-sm text-blue-500">({getCartCount()})</span>   
                       {" "}
          </h1>
                         {" "}
          <div className="grid grid-cols-5 gap-4 text-gray-500 text-base font-medium pb-3 border-b">
                               {" "}
            <p className="text-left col-span-2">Product Details</p>             
                  <p className="text-center">Quantity</p>                   {" "}
            <p className="text-right">Subtotal</p>                   {" "}
            <p className="text-center">Action</p>               {" "}
          </div>
                         {" "}
          {cartArray.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 items-center text-sm md:text-base font-medium py-4 border-b"
            >
                                     {" "}
              <div className="flex items-center gap-4 col-span-2">
                                           {" "}
                <div
                  onClick={() => {
                    navigate(
                      `/products/${product.category.toLowerCase()}/${product._id}`,
                    );
                    window.scrollTo(0, 0);
                  }}
                  className="cursor-pointer w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
                >
                                                 {" "}
                  <img
                    className="max-w-full h-full object-cover"
                    src={`${import.meta.env.VITE_BACKEND_URL}/${product.image}`}
                    alt={product.name}
                  />
                                             {" "}
                </div>
                                           {" "}
                <div>
                                                 {" "}
                  <p className="font-semibold">{product.name}</p>               
                                                           {" "}
                </div>
                                       {" "}
              </div>
                                     {" "}
              <div className="flex items-center justify-center">
                                           {" "}
                <select
                  className="outline-none border border-gray-300 rounded py-1 px-2 text-center text-sm"
                  value={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product._id, e.target.value)
                  }
                >
                                                 {" "}
                  {Array(Math.max(10, product.quantity))
                    .fill("")
                    .map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                                             {" "}
                </select>
                                       {" "}
              </div>
                                     {" "}
              <p className="text-right">
                {currency}
                {(product.price * product.quantity).toFixed(2)}
              </p>
                                     {" "}
              <div className="flex justify-center">
                                           {" "}
                <button
                  onClick={() => removeFromcart(product._id)}
                  className="cursor-pointer text-black hover:text-red-800"
                >
                                                 {" "}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                                                       {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                                                   {" "}
                  </svg>
                                             {" "}
                </button>
                                       {" "}
              </div>
                                 {" "}
            </div>
          ))}
                         {" "}
          <div className="mt-6 flex justify-between items-center">
                               {" "}
            <button
              onClick={() => {
                navigate("/products");
                window.scrollTo(0, 0);
              }}
              className="group cursor-pointer flex items-center gap-2 text-blue-500 font-medium"
            >
                                     {" "}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                                           {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
                                       {" "}
              </svg>
                                      Continue Shopping                    {" "}
            </button>
                               {" "}
            <div className="text-right">
                                     {" "}
              <p className="text-lg font-semibold">
                Subtotal: {currency} {totalAmount}
                <span>.00</span>
              </p>
                                     {" "}
              <p className="text-sm text-gray-500">
                Shipping: {currency} 300<span>.00</span>
              </p>
                                     {" "}
              <p className="text-xl font-bold mt-2">
                Total: {currency}
                {totalAmount + 300}
                <span>.00</span>
              </p>
                                 {" "}
            </div>
                           {" "}
          </div>
                     {" "}
        </div>
                   {" "}
        <div className="mt-4 w-full min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:mt-0">
                         {" "}
          <h2 className="text-xl font-medium mb-4">Delivery Address</h2>       
                 {" "}
          <div className="border rounded-md p-4">
                               {" "}
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.town}, ${selectedAddress.province} ${selectedAddress.zipcode}`
                : "No address selected"}
            </p>
                               
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-blue-500 hover:underline cursor-pointer mt-2 block"
            >
                                      Change Address                    {" "}
            </button>
                               {" "}
            {showAddress && (
              <div className="mt-4 border-t pt-4">
                                           {" "}
                {addresses.map((address, index) => (
                  <p
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                    {address.street},{address.town} ,{address.province},{" "}
                    {address.zipcode}
                  </p>
                ))}
                                           {" "}
                <button
                  onClick={() => navigate("/add-address")}
                  className="text-blue-500 hover:underline cursor-pointer mt-2 block"
                >
                                                 Add new address                
                             {" "}
                </button>
                                       {" "}
              </div>
            )}
                           {" "}
          </div>
                                         {" "}
          <h2 className="text-xl font-medium mt-8 mb-4">Payment Method</h2>
          {showAddressForm && (
            <div className="mt-4 border rounded-md p-4 space-y-3">
              <h3 className="font-medium">Add New Address</h3>
              <input
                type="text"
                placeholder="Street Address"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Town/City"
                value={newAddress.town}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, town: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Province"
                value={newAddress.province}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, province: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Zip Code"
                value={newAddress.zipcode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, zipcode: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={addNewAddress}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Address
                </button>
                <button
                  onClick={() => {
                    setShowAddressForm(false);
                    setNewAddress({
                      street: "",
                      town: "",
                      province: "",
                      zipcode: "",
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="border rounded-md p-4">
            <p className="text-gray-700 font-medium">Cash On Delivery</p>
          </div>
          <hr className="border-gray-300" />
          <div className="text-gray-500 mt-4 space-y-2">
            <p className="flex justify-between">
              <span>price</span>
              <span>
                {currency}
                {getCartamount()}
                <span>.00</span>
              </span>
            </p>

            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-blue-600">
                {currency}300<span>.00</span>
              </span>
            </p>

            <p className="flex justify-between">
              <span>Total Amount</span>
              <span>
                {currency}
                {getCartamount() + 300}
                <span>.00</span>
              </span>
            </p>
          </div>
                           
          <button
            onClick={() => {
              placeOrder();
            }}
            className="w-full py-3 mt-8 cursor-pointer bg-blue-500 text-white font-medium hover:bg-blue-600 transition rounded-md"
          >
            Place Order
          </button>
                     {" "}
        </div>
      </div>
      {/*Related Products-------------------------------------------------------------------------------------------------- */}
                 {" "}
      {relatedProducts.length > 0 && (
        <div className=" mx-auto  mt-16">
                             {" "}
          <h2 className="text-2xl font-medium mb-6">Related Products</h2>       
                     {" "}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                   {" "}
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct._id} product={relatedProduct} />
            ))}
                               {" "}
          </div>
                         {" "}
        </div>
      )}
             {" "}
    </div>
  ) : (
    <div className="mt-16 text-center">
                 {" "}
      <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>         
                   {" "}
      <button
        onClick={() => {
          navigate("/products");
          window.scrollTo(0, 0);
        }}
        className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition"
      >
                        Continue Shopping            {" "}
      </button>
             {" "}
    </div>
  );
}
export default Cart;
