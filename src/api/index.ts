import { API_END_POINTS } from "./endpoints";
import httpclient from "./httpclient";

class Client {
    loginEndpoint = {
        postotp: (phoneNumber: string) =>
  httpclient.post(API_END_POINTS.login.post, { phone: phoneNumber }),
        userlogin:(email: string, password:string) =>
  httpclient.post(API_END_POINTS.userlogin.post, { email,password})
}
 forgotEndpoint = {
        postforgot: (email: string) =>
  httpclient.post(API_END_POINTS.forgot.post, { email})
}
verifyOtpEndpoint={
    postverifyotp:(token:string,otp:string,)=>
    httpclient.post(API_END_POINTS.otpverify.post,{token, otp})
}
}

export default new Client();
