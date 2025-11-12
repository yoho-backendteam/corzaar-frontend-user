import React, { useEffect } from "react";
import { COLORS } from "../../../../Constants/uiconstants";
import { getAllPaymentData } from "../../../../features/settings/reducers/settingThunks";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import { paymentSelect } from "../../../../features/settings/reducers/settingSelectors";
import { toast } from "react-toastify";
import { formatDate } from "../../../../utils/helper";
import type { Payment } from "../../../../features/settings/types/settingTypes";

type PaymentCardProps = {
  remarks: string;
  transactionId: string;
  createdAt: string;
  paymentMethod: string;
  amount: string;
  status: string;
};

const PaymentCard: React.FC<PaymentCardProps> = ({
  remarks,
  transactionId,
  createdAt,
  paymentMethod,
  amount,
  status,
}) => {
  const isCompleted = status.toLowerCase() === "completed";

  return (
    <div
      className="shadow-sm rounded-2xl p-5 flex flex-col gap-2 mb-4"
      style={{ backgroundColor: COLORS.primary_white }}
    >
      <h3
        className="text-base font-semibold"
        style={{ color: COLORS.primary_gray }}
      >
        {remarks}
      </h3>
      <div className="flex justify-between items-center">
        <p className="text-sm" style={{ color: COLORS.primary_gray }}>
          Payment ID: {transactionId}
        </p>
        <p
          className="text-lg font-semibold"
          style={{ color: COLORS.primary_black }}
        >
          ₹{amount}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: COLORS.primary_gray }}
        >
          <span>{formatDate(createdAt)}</span>
          <span className="font-medium"> - {paymentMethod}</span>
        </div>
        <span
          className="px-3 py-1 text-xs font-medium rounded-full"
          style={{
            backgroundColor: isCompleted
              ? COLORS.secondary_green
              : COLORS.primary_yellow,
            color: COLORS.primary_black,
          }}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export const Payments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        const id = "68fc9551b9818562f4a3299c";
        const result = await dispatch(getAllPaymentData(id));
        
        if (result?.success === true) {
          toast.success(result.message);
        } else {
          toast.error("Failed to load payments");
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        toast.error(errorMessage);
      }
    })();
  }, [dispatch]);

  const payments = useSelector(paymentSelect)?.data || [];

  return (
    <div>
      {payments.length > 0 ? (
        payments.map((payment: Payment, index: number) => (
          <PaymentCard 
            key={index} 
            remarks={payment.remarks || "Payment"} // Add fallback
            transactionId={payment.transactionId}
            createdAt={payment.createdAt}
            paymentMethod={payment.paymentMethod}
            amount={payment.amount.toString()} // Convert to string
            status={payment.status}
          />
        ))
      ) : (
        <p className="text-gray-500 text-sm">No payment history found.</p>
      )}
    </div>
  );
};

export default Payments;