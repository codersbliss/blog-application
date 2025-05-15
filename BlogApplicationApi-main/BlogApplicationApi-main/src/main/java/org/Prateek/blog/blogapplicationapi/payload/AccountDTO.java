package org.prateek.blog.blogapplicationapi.payload;

public record AccountDTO(
        Long accountId,
        String link,
        String platform
) {
}
