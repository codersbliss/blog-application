package org.prateek.blog.blogapplicationapi.payload;

import org.prateek.blog.blogapplicationapi.entities.Comment;

import java.util.Date;

public record CommentDTO(
        Long commentId,
        String commentText,
        UserDTO user,
        Date commentDate,
        Date lastEdited
        ) {
        public CommentDTO(Comment comment){
                this(comment.getCommentId(), comment.getCommentText(), new UserDTO(comment.getUser()), comment.getCommentDate(), comment.getLastEdited());
        }

}
