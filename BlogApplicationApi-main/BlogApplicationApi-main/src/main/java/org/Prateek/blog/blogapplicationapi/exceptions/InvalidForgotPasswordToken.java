package org.prateek.blog.blogapplicationapi.exceptions;

public class InvalidForgotPasswordToken extends RuntimeException {
    public InvalidForgotPasswordToken(String message){
        super(message);
    }
}
