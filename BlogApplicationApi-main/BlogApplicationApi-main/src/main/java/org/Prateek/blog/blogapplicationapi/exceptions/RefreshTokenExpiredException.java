package org.prateek.blog.blogapplicationapi.exceptions;

public class RefreshTokenExpiredException extends RuntimeException{
    public RefreshTokenExpiredException(String msg){
        super(msg);
    }
}
