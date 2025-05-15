package org.prateek.blog.blogapplicationapi.repository;

import org.prateek.blog.blogapplicationapi.entities.Notification;
import org.prateek.blog.blogapplicationapi.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Page<Notification> findByUser(User user, PageRequest pageRequest);
}
