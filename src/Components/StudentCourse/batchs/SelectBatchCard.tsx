/* eslint-disable @typescript-eslint/no-explicit-any */
import { X, Calendar, User, Clock, Users } from 'lucide-react';
import { AddtoCartService } from '../../../features/cart/services';
import { toast } from 'react-toastify';
import { COLORS, FONTS } from '../../../Constants/uiconstants';

// interface Batch {
//     id: string;
//     name: string;
//     startDate: string;
//     duration: string;
//     capacity: number;
//     enrolled: number;
//     instructor: string;
// }

// interface Course {
//     id: string;
//     title: string;
//     description: string;
//     image: string;
//     duration: string;
//     level: string;
//     students: number;
//     batches: Batch[];
// }

interface BatchModalProps {
    course: any | null;
    isOpen: boolean;
    gotoCart: () => void;
    onClose: () => void;
}

export function BatchModal({ course, isOpen, onClose, gotoCart }: BatchModalProps) {
    if (!isOpen || !course) return null;

    async function handelAddtoCart(id: string, batchId: string) {
        const response = await AddtoCartService(id, batchId)
        if (response?.success) {
            toast.success("course added your cart")
            gotoCart()
        } else {
            toast.warn("try again, something error.")
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="sticky top-0 bg-white border-b border-black px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 style={{ ...FONTS.S_Cart_subtitle, color: COLORS.primary_black }}>{course[0]?.courseId?.title}</h2>
                        <p style={{ ...FONTS.SHOPPING_CART_Title as any, color: COLORS.primary_black }} className=" mt-1">
                            {course.length} {course.length === 1 ? 'batch' : 'batches'} available
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#ED1C24] hover:text-white rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 p-6">
                    <div className="grid gap-5 md:grid-cols-2">
                        {course?.map((batch: any, index: number) => {
                            const availableSeats = parseInt(batch?.totalSeats) - parseInt(batch?.seatsFilled);
                            const fillPercentage = (parseInt(batch?.seatsFilled) / parseInt(batch?.totalSeats)) * 100;

                            return (
                                <div
                                    key={index}
                                    className="bg-linear-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-[#ED1C24]"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 style={{ ...FONTS.nummedium4 as any, color: COLORS.primary_black }} className="mb-2">{batch?.batchName}</h3>
                                            <div style={{ ...FONTS.nummedium5 as any, color: COLORS.primary_black }} className="flex items-center gap-1.5 ">
                                                <Calendar className="w-4 h-4" />
                                                <span>Starts {batch?.schedule.startDate.slice(0, 10)}</span>
                                            </div>
                                        </div>
                                        <span style={{ ...FONTS.boldHeading2 as any }} className={`px-3 py-1 rounded-full text-xs shrink-0 ${availableSeats > 5
                                            ? 'bg-green-100 text-green-700'
                                            : availableSeats > 0
                                                ? 'bg-orange-100 text-orange-700'
                                                : 'bg-red-100 text-red-700'
                                            }`}>
                                            {availableSeats > 0 ? `${availableSeats} seats left` : 'Full'}
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-5">
                                        <div style={{ ...FONTS.nummedium5 as any, color: COLORS.primary_black }} className="flex items-center gap-2 ">
                                            <User className="w-4 h-4 text-blue-600" />
                                            <span>time: {batch?.schedule?.classTime.start} to {batch?.schedule?.classTime.end}</span>
                                        </div>

                                        <div style={{ ...FONTS.nummedium5 as any, color: COLORS.primary_black }} className="flex items-center gap-2 ">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            <span>{batch?.schedule?.duration} days</span>
                                        </div>

                                        <div>
                                            <div style={{ ...FONTS.nummedium5 as any, color: COLORS.primary_black }} className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-1.5">
                                                    <Users className="w-4 h-4 text-blue-600" />
                                                    <span>Enrollment</span>
                                                </div>
                                                <span>{batch?.seatsFilled}/{batch?.totalSeats}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-500 ${fillPercentage >= 90
                                                        ? 'bg-red-500'
                                                        : fillPercentage >= 70
                                                            ? 'bg-orange-500'
                                                            : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${fillPercentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        style={{ ...FONTS.nummedium4 as any, backgroundColor: COLORS.primary_red }}
                                        className="w-full px-4 py-2.5 text-white rounded-lg hover:bg-[#ED1C24] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                                        onClick={() => handelAddtoCart(course[0]?.courseId?._id, batch?._id)}
                                        disabled={availableSeats === 0}
                                    >
                                        {availableSeats > 0 ? 'Enroll Now' : 'Batch Full'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}