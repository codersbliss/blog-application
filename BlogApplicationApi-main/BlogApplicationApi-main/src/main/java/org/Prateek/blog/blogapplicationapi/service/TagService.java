package org.prateek.blog.blogapplicationapi.service;

import org.prateek.blog.blogapplicationapi.payload.CreateTagRequest;
import org.prateek.blog.blogapplicationapi.payload.TagDTO;
import org.prateek.blog.blogapplicationapi.payload.TagResponse;

public interface TagService {
    TagDTO createTag(CreateTagRequest createTagRequest);
    TagResponse getAllTags(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
    void deleteTag(Long tagId);
    void removeTagsByPost(Long postId);
}
