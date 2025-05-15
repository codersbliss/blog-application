package org.prateek.blog.blogapplicationapi.payload;

import org.prateek.blog.blogapplicationapi.entities.NotificationType;

import java.util.Date;

public record NotificationDTO(Long id,
                              String message,
                              NotificationType type,
                              Boolean isRead,
                              Date createdAt) {
}
