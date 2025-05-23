package org.prateek.blog.blogapplicationapi.payload;

import org.prateek.blog.blogapplicationapi.entities.ActivityType;
import org.prateek.blog.blogapplicationapi.entities.Post;

import java.util.Date;
import java.util.List;

public record PostDTO(
        Long postId,
        String title,
        String content,
        String description,
        String bannerUrl,
        Boolean draft,
        Date published,
        Date lastUpdated,
        Integer views,
        List<TagDTO> tags,
        CategoryDTO category,
        UserDTO user,
        List<ActivityDTO> activities,
        Long likesCount,
        Long bookmarkedCount
) {
    public PostDTO(Post post) {
            this(post.getPostId(),
                    post.getTitle(),
                    post.getContent(),
                    post.getDescription(),
                    post.getBannerUrl(),
                    post.getDraft(),
                    post.getPublished(),
                    post.getLastUpdated(),
                    post.getViews(),
                    post.getTags().stream().map(TagDTO::new).toList(),
                    new CategoryDTO(post.getCategory()),
                    new UserDTO(post.getUser()),
                    post.getPostActivities().stream().map(ActivityDTO::new).toList(),
                    post.getPostActivities().stream()
                            .filter(activity -> activity.getActivityType().equals(ActivityType.LIKE))
                            .count(),
                    post.getPostActivities().stream()
                            .filter(activity -> activity.getActivityType().equals(ActivityType.BOOKMARK))
                            .count()
            );
        }
}
