package org.prateek.blog.blogapplicationapi.service;

public interface ReCaptchaValidationService {
    public boolean validateCaptcha(String captchaResponse);
}
