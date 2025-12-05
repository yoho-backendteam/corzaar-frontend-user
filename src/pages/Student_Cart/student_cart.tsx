import { COLORS, FONTS } from "../../Constants/uiconstants";
import { FaTrash } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuClock4 } from "react-icons/lu";
import { useEffect } from "react";
import {
  cartdeletethunks,
  getStudentCartThunks,
} from "../../features/cart/reducers/thunks";
import { Getcart } from "../../features/cart/reducers/cart_selecetors";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../features/cart/reducers/cartslice";
import deleteIcon from "../../assets/delete.png"

const Student_cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(Getcart);

  console.log(cartItems,"cart items");
  

  const cartData = cartItems?.data;

  const userid = "691d8d28340440bf767c5b1d";

  useEffect(() => {
    dispatch(getStudentCartThunks());
  }, []);

  const handleDelete = async (courseId: string) => {
    try {
    
      await dispatch(cartdeletethunks(courseId, userid));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  return (
    <div className="p-5" style={{ backgroundColor: COLORS.primary_yellow }}>
      <div>
        <h1 style={{ ...FONTS.S_Cart_title, color: COLORS.primary_black }}>
          Shopping Cart
        </h1>

      
        <h5 style={{ ...FONTS.S_Cart_subtitle, color: COLORS.primary_gray }}>
          {cartData?.items?.length || 0} Courses in Cart
        </h5>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-5 mt-2">
     
        <div
          style={{ height: "100vh" }}
          className="lg:w-[65%] w-full overflow-y-auto"
        >
          {cartData?.items?.map((item: CartItem, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start justify-between w-full bg-white shadow-md p-4 rounded-xl gap-3 sm:gap-4 lg:gap-5 mb-4"
              >
             
                <div className="overflow-hidden w-full sm:w-32 md:w-36 lg:w-40 sm:h-32 md:h-36 lg:h-40 mx-auto sm:mx-0">
                  <img
                    src={
                      item?.instituteId?.logo }
                    alt={item?.title}
                    className="w-full h-full rounded-2xl object-cover"
                    style={{ backgroundColor: COLORS.C_Image }}
                  />
                </div>

                <div className="flex flex-col justify-between w-full sm:pt-0 md:pt-1">
                  <div className="flex flex-col gap-1">
                    <h3
                      style={{
                        ...FONTS.SHOPPING_CART_Title,
                        color: COLORS.C_DIV_Title,
                      }}
                      className="text-base sm:text-lg md:text-xl font-semibold leading-tight"
                    >
                      {item?.title}
                    </h3>

                    <p
                      style={{ ...FONTS.SHOPPING_CART_SubTitle }}
                      className="text-xs sm:text-sm md:text-base text-gray-600"
                    >
                      {item?.shortDescription}
                    </p>
                  </div>

          
                  <div className="flex flex-col items-end gap-2 mt-3">
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="text-red-500"
                    >
                     <img src={deleteIcon} alt="" />
                    </button>

                    <div className="flex gap-2 sm:gap-3">
                      <p
                        style={{ ...FONTS.S_Cart_Rupees }}
                        className="flex items-center gap-1 text-sm sm:text-base"
                      >
                        <LiaRupeeSignSolid size={16} />
                        {item?.pricing?.price || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:w-[35%] w-full">
          <div className="bg-white w-full shadow-md rounded-lg p-5">
            <h1 className="text-lg font-semibold mb-4">Order Summary</h1>

            <div className="flex gap-3 items-center mb-3">
              <LuClock4 className="mt-1" />
              <p>Apply Coupon</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <input
                type="text"
                placeholder={cartData?.coupon?.code || "Enter code"}
                className="border border-gray-300 rounded-md p-3 w-full"
              />
              <button
                type="button"
                style={{ backgroundColor: COLORS.primary_yellow }}
                className="text-black px-5 py-3 rounded-md transition"
              >
                Apply
              </button>
            </div>

            <hr className="text-gray-600 my-4" />

            <div className="flex justify-between text-sm mb-2">
              <p>Sub Total</p>
              <p>₹{cartData?.pricing?.subtotal || 0}</p>
            </div>

            <div className="flex justify-between font-semibold text-lg mb-4">
              <p>Total</p>
              <p>₹{cartData?.pricing?.total || 0}</p>
             </div>

            <button
              className="w-full flex items-center justify-center gap-2 py-3 rounded-md text-white font-semibold"
              style={{ backgroundColor: COLORS.primary_red }}
              onClick={() =>
                navigate("/checkout", {
                  state: { 
                    cartId:   cartData?._id, 
                    cartItem: cartData?.items,
                    pricing:  cartData?.pricing,
                    discount: cartData?.coupon
                  },   
                })
              }
            >
              Proceed To Checkout <FaArrowRightLong />
            </button>
          </div>

          <div className="mt-5 bg-white rounded-lg p-5">
            <h1
              style={{
                ...FONTS.SHOPPING_CART_Title,
                color: COLORS.C_DIV_Title,
              }}
            >
              Secure Payment
            </h1>
            <h6 style={{ color: COLORS.primary_gray }}>
              We accept all major payment methods including credit cards, debit
              cards, UPI, and net banking.
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_cart;
