import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { COLORS, FONTS } from "../../Constants/uiconstants";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BsCreditCard2Front } from "react-icons/bs";
import { MdOutlineQrCode2 } from "react-icons/md";
import { AiOutlineBank } from "react-icons/ai";
import { LuWallet } from "react-icons/lu";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { PlaceOrderService } from "../../features/cart/services";
import type { CartItem } from "../../features/cart/reducers/cartslice";

const PAYMENT_METHODS = [
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Pay securely using your card",
    icon: BsCreditCard2Front,
    fields: [
      { placeholder: "1234 5678 9012 3456" },
      { placeholder: "MM/YY" },
      { placeholder: "CVV" },
      { placeholder: "John Doe" },
    ],
  },
  {
    id: "upi",
    title: "UPI",
    description: "Pay using UPI ID",
    icon: MdOutlineQrCode2,
  },
  {
    id: "netbanking",
    title: "Net Banking",
    description: "Pay via your bank account",
    icon: AiOutlineBank,
  },
  {
    id: "wallets",
    title: "Wallets",
    description: "PayPal, Paytm, etc.",
    icon: LuWallet,
  },
];

const ORDER_ITEMS = [
  {
    id: 1,
    title: "Digital Marketing Mastery",
    category: "Marketing",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    category: "Programming",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop",
  },
];

const subtotal = ORDER_ITEMS.reduce((acc, item) => acc + item.price, 0);
const tax = +(subtotal * 0.1).toFixed(2);
const totalAmount = subtotal + tax;
const savings = 100;

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const navigate = useNavigate();
  const { state } = useLocation();
  const cartId = state?.cartId;
  const orderedItems = state?.cartItem || [];
  const pricing = state?.pricing || 0;
  const discount = state?.discount || 0;

  async function handelPlaceOrder() {
    try {
      const response = await PlaceOrderService(cartId)
      if (response?.success) {
        toast.success(response?.message)
      } else {
        toast.error(response?.message)
      }
    } catch (error) {
      console.error("handel place order", error)
    }
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: COLORS.primary_yellow }}
    >
      <div className="flex flex-col gap-3">
        {/* HEADER */}
        <div className="flex items-center gap-4 ">
          <button
            className="rounded-full p-3 shadow-md cursor-pointer flex items-center justify-center hover:scale-105 transition-transform"
            style={{
              backgroundColor: COLORS.primary_white,
              borderWidth: 2,
              borderColor: COLORS.primary_red,
            }}
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack size={15} style={{ color: COLORS.primary_red }} />
          </button>

          <h1
            className=" font-bold text-xl!"
            style={{ ...FONTS.medium, color: COLORS.primary_red }}
          >
            Checkout
          </h1>
        </div>

        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={
                  currentStep >= 1
                    ? {
                      backgroundColor: COLORS.primary_red,
                      color: COLORS.primary_white,
                    }
                    : { backgroundColor: COLORS.primary_white }
                }
              >
                <IoMdCheckmarkCircleOutline size={24} />
              </div>
              <span
                className="text-sm mt-2"
                style={{
                  ...FONTS.medium,
                  color:
                    currentStep >= 1
                      ? COLORS.primary_red
                      : COLORS.primary_white,
                }}
              >
                Review
              </span>
            </div>

            <div
              className="w-24 h-1 mx-4"
              style={{
                backgroundColor:
                  currentStep >= 2 ? COLORS.primary_red : COLORS.primary_white,
              }}
            ></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={
                  currentStep >= 2
                    ? {
                      backgroundColor: COLORS.primary_red,
                      color: COLORS.primary_white,
                    }
                    : { backgroundColor: COLORS.primary_white }
                }
              >
                <BsCreditCard2Front size={24} />
              </div>
              <span
                className="text-sm mt-2"
                style={{
                  ...FONTS.medium,
                  color:
                    currentStep >= 2
                      ? COLORS.primary_red
                      : COLORS.primary_black,
                }}
              >
                Payment
              </span>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          style={{ ...FONTS.medium }}
        >
          {/* LEFT SECTION */}
          <div className="lg:col-span-2">
            {/* STEP 1: REVIEW */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  Review Your Order
                </h2>

                <div className="bg-white p-6 rounded-lg shadow-[0_0_15px_0_rgba(0,0,0,0.08)]">
                  <h3 className="font-semibold mb-4">
                    Order Items ({orderedItems.length} Courses)
                  </h3>

                  {orderedItems.length > 0 ? (
                    <div className="space-y-2 bg-gray-200 rounded-2xl p-2">
                      {orderedItems.map((item: CartItem, index: number) => (
                        <div
                          key={index}
                          className="flex items-center p-5 gap-4 bg-white rounded-2xl"
                        >
                          <img
                            src={item?.instituteId?.logo}
                            alt={item.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />

                          <div>
                            <h4 className="font-medium">{item?.title}</h4>

                            <p className="text-sm text-gray-600">
                              {item?.category || "Course Category"}
                            </p>

                            <p
                              className="font-semibold mt-1"
                              style={{ color: COLORS.secondary_green }}
                            >
                              ₹{item?.pricing?.price || 0}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">Select courses in your cart.</p>
                  )}

                </div>


                <div className="flex gap-4 mt-8">
                  <button
                    className="px-6 py-3 border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer shadow-[0_0_15px_0_rgba(0,0,0,0.08)]"
                    style={{
                      backgroundColor: COLORS.primary_white,
                      color: COLORS.primary_red,
                      borderWidth: 2,
                      borderColor: COLORS.primary_red,
                    }}
                    onClick={() => navigate(-1)}
                  >
                    Back to Cart
                  </button>

                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 cursor-pointer shadow-[0_0_15px_0_rgba(0,0,0,0.08)]"
                    style={{ backgroundColor: COLORS.primary_red }}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PAYMENT */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  Select Payment Method
                </h2>

                <div className="space-y-4">
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className="shadow-[0_0_15px_0_rgba(0,0,0,0.08)]"
                        style={{
                          padding: 24,
                          borderRadius: 12,
                          cursor: "pointer",
                          borderWidth: 2,
                          backgroundColor:
                            selectedPayment === method.id
                              ? COLORS.primary_white
                              : COLORS.light_gray,
                          borderColor:
                            selectedPayment === method.id
                              ? COLORS.blue
                              : COLORS.primary_gray,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            checked={selectedPayment === method.id}
                            onChange={() => setSelectedPayment(method.id)}
                            className="w-4 h-4"
                          />
                          <Icon size={20} />
                          <div>
                            <h3 className="font-semibold">{method.title}</h3>
                            <p className="text-sm text-gray-600">
                              {method.description}
                            </p>
                          </div>
                        </div>

                        {selectedPayment === method.id && method.fields && (
                          <div className="space-y-4 mt-4 pl-7">
                            <input
                              type="text"
                              placeholder={method.fields[0].placeholder}
                              className="w-full px-4 py-2 border rounded-lg"
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                placeholder={method.fields[1].placeholder}
                                className="px-4 py-2 border rounded-lg"
                              />
                              <input
                                type="text"
                                placeholder={method.fields[2].placeholder}
                                className="px-4 py-2 border rounded-lg"
                              />
                            </div>

                            <input
                              type="text"
                              placeholder={method.fields[3].placeholder}
                              className="w-full px-4 py-2 border rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer shadow-[0_0_15px_0_rgba(0,0,0,0.08)]"
                    style={{
                      backgroundColor: COLORS.primary_white,
                      color: COLORS.primary_red,
                      borderWidth: 2,
                      borderColor: COLORS.primary_red,
                    }}
                  >
                    Back to Review
                  </button>

                  <button
                    onClick={handelPlaceOrder}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium cursor-pointer shadow-[0_0_15px_0_rgba(0,0,0,0.08)]"
                    style={{
                      backgroundColor: COLORS.green,
                      color: COLORS.primary_white,
                    }}
                  >
                    Place Order (${totalAmount.toFixed(2)})
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1" style={{ ...FONTS.medium }}>
            <div className="bg-white p-6 rounded-lg border sticky top-6 shadow-[0_0_15px_0_rgba(0,0,0,0.08)]">
              <h3 className="font-semibold mb-4">Price Details</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Price ({orderedItems.length} items)</span>
                  <span>${pricing?.subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span>${discount.discountAmount}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span>${pricing.subtotal}</span>
                </div>

                <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
                  You will save ${savings.toFixed(2)} on this order
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2 text-sm text-gray-600">
                <IoMdCheckmarkCircleOutline
                  size={20}
                  className="text-green-700 shrink-0"
                  style={{ color: COLORS.green }}
                />
                <div>
                  <p className="font-medium text-gray-900">
                    Safe and Secure Payments
                  </p>
                  <p>100% secure payment with money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
