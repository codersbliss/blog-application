package org.prateek.blog.blogapplicationapi.payload;

public record SubscribeRequest(
        Long userId,
        Long categoryId
) {
}
