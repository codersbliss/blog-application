package org.prateek.blog.blogapplicationapi.service;

import org.prateek.blog.blogapplicationapi.entities.Notification;
import org.prateek.blog.blogapplicationapi.entities.User;
import org.prateek.blog.blogapplicationapi.payload.NotificationPageResponse;

public interface NotificationService {
    NotificationPageResponse getNotificationsForUser(int pageNumber, int pageSize);
    void saveNotification(User user, Notification notification);
    void markAsRead(Long notificationId);
    void deleteNotification(Long notificationId);
}
