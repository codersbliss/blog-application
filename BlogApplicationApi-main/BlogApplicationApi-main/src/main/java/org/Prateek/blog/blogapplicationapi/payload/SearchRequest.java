package org.prateek.blog.blogapplicationapi.payload;

public record SearchRequest(
        String type,
        String keyword,
        Integer pageNumber,
        Integer pageSize
) {
}
