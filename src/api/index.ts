import { API_END_POINTS } from "./endpoints";
import httpclient from "./httpclient";

class Client {
    loginEndpoint = {
        postotp: (phoneNumber: string) =>
  httpclient.post(API_END_POINTS.login.post, { phoneNumber })
}
verifyOtpEndpoint={
    postverifyotp:(token:string,otp:string,)=>
    httpclient.post(API_END_POINTS.otpverify.post,{token, otp})
}
}

export default new Client();
