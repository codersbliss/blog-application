package org.prateek.blog.blogapplicationapi.controllers;

import lombok.RequiredArgsConstructor;
import org.prateek.blog.blogapplicationapi.payload.CreateTagRequest;
import org.prateek.blog.blogapplicationapi.payload.TagDTO;
import org.prateek.blog.blogapplicationapi.payload.TagResponse;
import org.prateek.blog.blogapplicationapi.service.TagService;
import org.prateek.blog.blogapplicationapi.utils.AppConstant;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tag")
public class TagController {
    private final TagService tagService;

    @PostMapping("/create/")
    public ResponseEntity<?> createTagHandler(@RequestBody CreateTagRequest createTagRequest){
        TagDTO new_tag = tagService.createTag(createTagRequest);
        return ResponseEntity.ok(new_tag);
    }

    @GetMapping("/")
    public ResponseEntity<TagResponse> getAllTagsHandler(
            @RequestParam(value ="pageNumber", defaultValue = AppConstant.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value ="pageSize", defaultValue = AppConstant.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstant.DEFAULT_TAG_SORT_FIELD, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstant.DEFAULT_SORT_CRITERIA, required = false) String sortDir

    ){
        TagResponse tagResponse = tagService.getAllTags(pageNumber, pageSize,sortBy, sortDir);
        return ResponseEntity.ok(tagResponse);
    }

    @DeleteMapping("/{tagId}")
    public ResponseEntity<?> deleteTagHandler(@PathVariable Long tagId){
        tagService.deleteTag(tagId);
        return ResponseEntity.ok(tagId);
    }

    @DeleteMapping("/post/{postId}")
    public ResponseEntity<?> removeTagsByPostHandler(@PathVariable Long postId){
        tagService.removeTagsByPost(postId);
        return ResponseEntity.ok(postId);
    }

}
