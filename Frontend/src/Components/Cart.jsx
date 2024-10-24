import React,{useEffect} from 'react';
import UserNavbar from './UserNavbar';
import Footer from './Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../Slice/cartSlice';
import { setCart } from '../Slice/cartSlice';
import { useRemoveFromCartMutation,useFetchCartQuery } from '../Slice/cartApiSlice'; 
import {  useCreatePaymentMutation,useCreateOrderMutation } from '../Slice/PaymentApiSlice'

const Cart = () => {
  const dispatch = useDispatch();
  const {userInfo}=useSelector((state)=>state.auth)
  const { _id } = useSelector((state) => state.auth.userInfo);
  const userId = _id
  const { data: { items: cartItems = [] } = {}, isLoading, error } = useFetchCartQuery(userId);
  
  useEffect(()=>{
    if(cartItems){
      console.log('Fetched Cart Items:', cartItems);
      dispatch(setCart(cartItems))
    }
  },[cartItems,dispatch])


  const [removeFromCarts] =  useRemoveFromCartMutation(); 
  const [createPayment]=useCreatePaymentMutation()
  const [createOrder]=useCreateOrderMutation()

  const handleCheckout = async () => {
    try {
      const amount = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
      const amountinPaisa=amount*100

      console.log("Total Amount in Cents:", amountinPaisa);

      const paymentResponse = await createPayment({ amount:amountinPaisa, currency: 'INR' }).unwrap();
      console.log('Payment Response:', paymentResponse);

      const options = {
        key: 'rzp_test_SZDpMBVsJ7Erpp',
        amount: paymentResponse.amount,
        currency: paymentResponse.currency,
        name: 'MiniStore',
        description: 'Payment for order',
        order_id: paymentResponse.id,
        handler: async (response) => {
          const orderData = {
            userId: userInfo._id,
            customerName: userInfo.name,
            customerPhone: userInfo.phone,
            customerAddress: userInfo.address,
            products: cartItems.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              quantity: item.quantity,
              price: item.productPrice,
            })),
            transactionId: response.razorpay_payment_id,
            amount,
          };
          await createOrder(orderData);
          toast.success('Payment Successful, Order Placed!');
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Checkout failed', error);
      toast.error("Payment Failed")
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCarts({ userId, productId }).unwrap();
      dispatch(removeFromCart(productId))
      window.location.reload();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const total = Array.isArray(cartItems) 
  ? cartItems.reduce((acc, item) => {
      const price = parseFloat(item.productPrice); 
      const quantity = parseInt(item.quantity); 
      return acc + price * quantity;
    }, 0) 
  : 0;

  return (
    <div>
      <UserNavbar />
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-black underline sm:text-2xl">Shopping Cart</h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8 ">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartItems.length > 0 ? (
                  cartItems.map(item => (
                    <div key={item.id} className="rounded-lg bg-gray-100 p-4 shadow-xl md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img
                            className="h-28 w-28"
                            src={item.imageUrl}
                            alt={item.name}
                          />
                        </a>

                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-black"> ${(item.productPrice * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-medium hover:underline text-black"
                          >
                            {item.productName}
                          </a>
                          <p>Size:{item.size}</p>
                          <p>Quantity: {item.quantity}</p>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleRemoveFromCart(item.productId)}
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            >
                              <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-lg font-semibold text-black">Your cart is empty.</p>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-10 lg:w-full">
                  <div className="space-y-4 rounded-lg p-4 shadow-xl bg-gray-100 sm:p-6">
                    <p className="text-xl font-semibold text-black">Order summary</p>

                    <div className="space-y-4">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-black">Total Items</dt>
                        <dd className="text-base font-medium text-black">
                          {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                        </dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-black">Total Price</dt>
                        <dd className="text-base font-medium text-black">${total.toFixed(2)}</dd>
                      </dl>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleCheckout}
                      className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Cart;
