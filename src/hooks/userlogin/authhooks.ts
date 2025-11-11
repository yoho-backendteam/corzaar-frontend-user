import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { loginWithEmailThunk } from "../../features/userlogin/reducers/auththunk";
import { resetAuth } from "../../features/userlogin/reducers/authslice";
import { selectAuthData } from "../../features/userlogin/reducers/otpselector";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(selectAuthData);

  const triggerLogin = (email: string, password: string) => {
    dispatch(loginWithEmailThunk({ email, password }));
  };

  const clearAuth = () => {
    dispatch(resetAuth());
  };

  return { data, triggerLogin, clearAuth };
};
