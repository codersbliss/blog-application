package org.prateek.blog.blogapplicationapi.serviceimpl;

import lombok.RequiredArgsConstructor;
import org.prateek.blog.blogapplicationapi.entities.Post;
import org.prateek.blog.blogapplicationapi.entities.Tag;
import org.prateek.blog.blogapplicationapi.exceptions.ResourceNotFound;
import org.prateek.blog.blogapplicationapi.payload.CreateTagRequest;
import org.prateek.blog.blogapplicationapi.payload.TagDTO;
import org.prateek.blog.blogapplicationapi.payload.TagResponse;
import org.prateek.blog.blogapplicationapi.repository.PostRepository;
import org.prateek.blog.blogapplicationapi.repository.TagRepository;
import org.prateek.blog.blogapplicationapi.service.TagService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService{

    private final TagRepository tagRepository;
    private final PostRepository postRepository;

    @Override
    public TagDTO createTag(CreateTagRequest createTagRequest) {
        Tag tag = new Tag();
        tag.setName(createTagRequest.tagName());
        Tag savedTag = tagRepository.save(tag);
        return new TagDTO(savedTag);
    }

    @Override
    public TagResponse getAllTags(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Tag> page_tags = tagRepository.findAll(pageable);
        List<TagDTO> tags = page_tags.getContent().stream().map(TagDTO::new).toList();
        return new TagResponse(tags,
                page_tags.getNumber(),
                page_tags.getSize(),
                page_tags.getTotalElements(),
                page_tags.getTotalPages(), page_tags.isLast());
    }

    @Override
    public void deleteTag(Long tagId) {
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(()-> new ResourceNotFound("Tag", "tagId", tagId.toString()));
        tagRepository.delete(tag);
    }

    @Override
    public void removeTagsByPost(Long postId) {
        Post post =  postRepository.findById(postId)
                .orElseThrow(()-> new ResourceNotFound("Post", "postId", postId.toString()));
        post.getTags().clear();
        postRepository.save(post);
    }
}
