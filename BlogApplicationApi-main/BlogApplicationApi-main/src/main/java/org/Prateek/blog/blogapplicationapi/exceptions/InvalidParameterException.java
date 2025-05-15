package org.prateek.blog.blogapplicationapi.exceptions;

public class InvalidParameterException extends RuntimeException {
    public InvalidParameterException(String message){
        super(message);
    }
}
