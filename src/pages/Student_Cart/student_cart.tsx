
import { COLORS, FONTS } from '../../Constants/uiconstants'
import { FaTrash } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuClock4 } from "react-icons/lu";
const Student_cart = () => {
    return (
        <div className='h-screen p-5' style={{ backgroundColor: COLORS.primary_yellow }}>
            <div className=''>
                <h1 style={{ ...FONTS.S_Cart_title, color: COLORS.primary_black }}>Shopping Cart</h1>
                <h5 style={{ ...FONTS.S_Cart_subtitle, color: COLORS.primary_gray }}>1 Courses in Cart</h5>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-5 mt-2 ">
                <div className="lg:w-[65%]  w-full  ">
                    <div className="flex flex-col sm:flex-row items-start justify-between w-full bg-white shadow-md p-4 rounded-lg gap-3 sm:gap-4 lg:gap-5">

                        <div className="overflow-hidden w-full sm:w-32 md:w-36 lg:w-40 sm:h-32 md:h-36 lg:h-40 mx-auto sm:mx-0">
                            <img
                                src="https://wallpapers.com/images/hd/professional-profile-pictures-2880-x-1920-7jvygpai7v9zkg2j.jpg"
                                alt="Item"
                                className="w-full h-full rounded-2xl object-cover"
                                style={{  backgroundColor: COLORS.C_Image }}
                            />
                        </div>

                        <div className="flex flex-col justify-between w-full sm:pt-0 md:pt-1">
                            <div className="flex flex-col gap-1">
                                <h3
                                    style={{ ...FONTS.SHOPPING_CART_Title, color: COLORS.C_DIV_Title }}
                                    className="text-base sm:text-lg md:text-xl font-semibold leading-tight"
                                >
                                    Item Title
                                </h3>
                                <p
                                    style={{ ...FONTS.SHOPPING_CART_SubTitle }}
                                    className="text-xs sm:text-sm md:text-base text-gray-600"
                                >
                                    Item subtitle or description
                                </p>
                            </div>

                            <div className="flex justify-between items-end mt-3">
                                <div className="flex gap-3 text-xs sm:text-sm md:text-base text-gray-700">
                                    <p>16 weeks</p>
                                    <p>Intermediate</p>
                                    <p>4.9</p>
                                </div>

                               
                            </div>
                             <div className="flex flex-col items-end gap-2">
                                    <button className="text-red-500">
                                        <FaTrash
                                            style={{ backgroundColor: COLORS.C_delete }}
                                            className="p-1.5 sm:p-2 rounded-lg"
                                            size={30}
                                        />
                                    </button>

                                    <div className="flex gap-2 sm:gap-3">
                                        <p
                                            style={{ ...FONTS.S_Cart_Rupees }}
                                            className="flex items-center gap-1 text-sm sm:text-base"
                                        >
                                            <LiaRupeeSignSolid size={16} className="text-sm" />
                                            3,499
                                        </p>
                                        <p
                                            style={{
                                                ...FONTS.S_Cart_Rupees_delete,
                                                color: COLORS.primary_gray,
                                            }}
                                            className="flex line-through items-center gap-1 text-xs sm:text-sm"
                                        >
                                            5,999
                                        </p>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>




                <div className="lg:w-[35%] w-full ">
                    <div className="bg-white w-full shadow-md rounded-lg p-5">
                        <h1 className="text-lg font-semibold mb-4">Order Summary</h1>

                        <div className="flex gap-3 items-center mb-3">
                            <LuClock4 className="mt-1" />
                            <p>Apply Coupon</p>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <input
                                type="text"
                                id="code"
                                name="code"
                                placeholder="Enter code"
                                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            <p>₹3,499</p>
                        </div>
                        <div className="flex justify-between font-semibold text-lg mb-4">
                            <p>Total</p>
                            <p>₹3,499</p>
                        </div>

                        <button
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-md text-white font-semibold"
                            style={{ backgroundColor: COLORS.primary_red }}
                        >
                            Proceed To Checkout <FaArrowRightLong />
                        </button>
                    </div>
                    <div className="mt-5 bg-white rounded-lg p-5">
                        <h1   style={{ ...FONTS.SHOPPING_CART_Title, color: COLORS.C_DIV_Title }} >Secure Payment</h1>
                        <h6 style={{color:COLORS.primary_gray}}>We accet all major problem</h6>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Student_cart