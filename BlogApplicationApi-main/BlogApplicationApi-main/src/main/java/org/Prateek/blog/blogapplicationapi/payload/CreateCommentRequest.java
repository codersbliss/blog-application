package org.prateek.blog.blogapplicationapi.payload;

public record CreateCommentRequest(
        String commentText,
        Long postId
) {
}
