package org.prateek.blog.blogapplicationapi.serviceimpl;

import lombok.RequiredArgsConstructor;
import org.prateek.blog.blogapplicationapi.entities.Notification;
import org.prateek.blog.blogapplicationapi.entities.User;
import org.prateek.blog.blogapplicationapi.exceptions.ResourceNotFound;
import org.prateek.blog.blogapplicationapi.exceptions.UnAuthorizedOperationExcpetion;
import org.prateek.blog.blogapplicationapi.payload.NotificationDTO;
import org.prateek.blog.blogapplicationapi.payload.NotificationPageResponse;
import org.prateek.blog.blogapplicationapi.repository.NotificationRepository;
import org.prateek.blog.blogapplicationapi.service.NotificationService;
import org.prateek.blog.blogapplicationapi.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserService userService;

    @Override
    public NotificationPageResponse getNotificationsForUser(int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        User user = userService.getLoggedInUser().orElseThrow(()-> new UnAuthorizedOperationExcpetion("unauthorized"));
        Page<Notification> notificationsPage = notificationRepository.findByUser(user, pageRequest);

        List<NotificationDTO> notifications = notificationsPage
                .map(notification -> new NotificationDTO(
                        notification.getNotificationId(),
                        notification.getContent(),
                        notification.getType(),
                        notification.getIsRead(),
                        notification.getCreatedAt()))
                .toList();

        return new NotificationPageResponse(
                notifications,
                notificationsPage.getNumber(),
                notificationsPage.getSize(),
                notificationsPage.getTotalElements(),
                notificationsPage.getTotalPages(),
                notificationsPage.isLast());
    }
    public void saveNotification(User user, Notification notification) {
        notificationRepository.save(notification);
    }

    @Override
    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    @Override
    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
