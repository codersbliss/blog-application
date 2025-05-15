package org.prateek.blog.blogapplicationapi.exceptions;

public class InvalidRecaptchaException extends RuntimeException{
    public InvalidRecaptchaException(String msg){
        super(msg);
    }
}
