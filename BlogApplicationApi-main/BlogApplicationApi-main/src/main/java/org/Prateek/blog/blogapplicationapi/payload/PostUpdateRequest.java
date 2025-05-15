package org.prateek.blog.blogapplicationapi.payload;

import jakarta.validation.constraints.NotBlank;
import org.prateek.blog.blogapplicationapi.entities.Tag;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public record PostUpdateRequest(
        Long postId,
        String postTitle,
        String postContent,
        String postDescription,
        Long categoryId,
        List<String> tags,
        String bannerUrl,
        Boolean draft,
        Long userId
) {
}
