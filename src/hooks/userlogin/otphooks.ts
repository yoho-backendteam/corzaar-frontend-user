import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { resetOTP } from "../../features/userlogin/reducers/otpslice";
import { sendOTPThunk } from "../../features/userlogin/reducers/otpthunks";
import { selectOTPData } from "../../features/userlogin/reducers/otpselector";

export const useOTP = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectOTPData);

  const triggerSendOTP = (phoneNumber: string) => {
    dispatch(sendOTPThunk({ phoneNumber }));
  };

  const clearOTP = () => {
    dispatch(resetOTP());
  };

  return { data, triggerSendOTP, clearOTP };
};
