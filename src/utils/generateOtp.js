import otpGenerator from 'otp-generator';

export const generateOtp = () => {
    return otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
        digits: true,
    })
}

export const verifyOTP = (userOTP, expectedOTP) => {
   return userOTP === expectedOTP ? true : false;
}