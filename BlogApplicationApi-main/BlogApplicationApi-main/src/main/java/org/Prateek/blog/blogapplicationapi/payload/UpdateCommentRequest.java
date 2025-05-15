package org.prateek.blog.blogapplicationapi.payload;

public record UpdateCommentRequest(
        Long commentId,
        String commentText
) {
}
