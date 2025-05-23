package org.prateek.blog.blogapplicationapi.controllers;

import lombok.RequiredArgsConstructor;
import org.prateek.blog.blogapplicationapi.payload.*;
import org.prateek.blog.blogapplicationapi.service.CommentService;
import org.prateek.blog.blogapplicationapi.utils.AppConstant;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/add")
    public ResponseEntity<?> createCommentHandler(@RequestBody CreateCommentRequest createCommentRequest) {
        CommentDTO createdComment = commentService.createComment(createCommentRequest);
        return ResponseEntity.ok(createdComment);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> updateCommentHandler(@RequestBody UpdateCommentRequest updateCommentRequest) {
        CommentDTO updatedComment = commentService.updateComment(updateCommentRequest);
        return ResponseEntity.ok(updatedComment);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteCommentHandler(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok("comment deleted successfully");
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<CommentPageResponse> getAllCommentsByPost(
            @PathVariable Long postId,
            @RequestParam(value ="pageNumber", defaultValue = AppConstant.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value ="pageSize", defaultValue = AppConstant.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstant.DEFAULT_COMMENT_SORT_FIELD, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstant.DEFAULT_SORT_CRITERIA, required = false) String sortDir
    ) {
        CommentPageResponse commentPageResponse = commentService.getAllCommentsByPost(postId, pageNumber, pageSize, sortBy, sortDir);
        return ResponseEntity.ok(commentPageResponse);
    }

    @GetMapping("/user")
    public ResponseEntity<CommentPageResponse> getAllCommentsByUser(
            @RequestParam(value ="pageNumber", defaultValue = AppConstant.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(value ="pageSize", defaultValue = AppConstant.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstant.DEFAULT_COMMENT_SORT_FIELD, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstant.DEFAULT_SORT_CRITERIA, required = false) String sortDir
    ) {
        CommentPageResponse commentPageResponse = commentService.getAllCommentsByUser(pageNumber, pageSize, sortBy, sortDir);
        return ResponseEntity.ok(commentPageResponse);
    }
}
