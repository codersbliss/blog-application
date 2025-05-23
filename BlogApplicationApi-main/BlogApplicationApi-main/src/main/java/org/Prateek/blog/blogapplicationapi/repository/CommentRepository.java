package org.prateek.blog.blogapplicationapi.repository;

import jakarta.transaction.Transactional;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.prateek.blog.blogapplicationapi.entities.Comment;
import org.prateek.blog.blogapplicationapi.entities.Post;
import org.prateek.blog.blogapplicationapi.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Modifying
    @Transactional
    @Query(value="delete from Comment c where c.user = ?1")
    void deleteByUser(User user);

    @Transactional
    @Query(value="delete from Comment c where c.post = ?1")
    void deleteByPost(Post post);

    Page<Comment> findByPost(Post post, Pageable p);

    Page<Comment> findByUser(User user, Pageable pageable);

    @Query("SELECT c.post.postId, COUNT(c.commentId) FROM Comment c WHERE c.commentDate > :startDate GROUP BY c.post.postId")
    List<Object[]> countCommentsByPostId(@Param("startDate") LocalDateTime startDate);
}
