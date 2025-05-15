package org.prateek.blog.blogapplicationapi.service;

import org.prateek.blog.blogapplicationapi.payload.ChangePasswordRequest;
import org.prateek.blog.blogapplicationapi.payload.VerifyEmailRequest;
import org.prateek.blog.blogapplicationapi.payload.VerifyOTPRequest;

import java.util.Random;

public interface ForgotPasswordService {
    void verifyEmail(VerifyEmailRequest verifyEmailRequest);
    String verifyOTP(VerifyOTPRequest verifyOTPRequest);
    void changePassword(ChangePasswordRequest changePasswordRequest);
    static Long otpGenerator(){
        return new Random().nextLong(100000, 999999);
    }
}
