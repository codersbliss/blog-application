package org.prateek.blog.blogapplicationapi.payload;

public record VerifyOTPRequest(Long otp, String email) {
}
