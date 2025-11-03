import React from "react";
import { useAppSelector } from "../../../../hooks/reduxhooks";

type PaymentCardProps = {
  title: string;
  paymentId: string;
  date: string;
  method: string;
  amount: string;
  status: string;
};

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  paymentId,
  date,
  method,
  amount,
  status,
}) => {
  const isCompleted = status.toLowerCase() === "completed";

  return (
    <div className="bg-white shadow-sm rounded-2xl p-5 flex flex-col gap-2 mb-4 border border-gray-200">
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Payment ID: {paymentId}</p>
        <p className="text-lg font-semibold text-gray-900">₹{amount}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{date}</span>
          <span className="font-medium text-gray-800">{method}</span>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export const Payments: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);

  return (
    <div className="">

      {profile.payments && profile.payments.length > 0 ? (
        profile.payments.map((payment, index) => (
          <PaymentCard key={index} {...payment} />
        ))
      ) : (
        <p className="text-gray-500 text-sm">No payment history found.</p>
      )}
    </div>
  );
};

export default Payments;
