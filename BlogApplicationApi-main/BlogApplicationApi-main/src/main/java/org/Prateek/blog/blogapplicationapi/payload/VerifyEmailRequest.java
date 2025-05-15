package org.prateek.blog.blogapplicationapi.payload;

public record VerifyEmailRequest(String email, String captcha) {
}
