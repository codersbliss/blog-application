package org.prateek.blog.blogapplicationapi.payload;

import org.prateek.blog.blogapplicationapi.entities.Activity;
import org.prateek.blog.blogapplicationapi.entities.ActivityType;

public record ActivityDTO(
        Long activityId,
        Long userId,
        ActivityType activityType
) {
    public ActivityDTO(Activity acc){
        this(acc.getActivityId(), acc.getUser().getUserId(), acc.getActivityType());
    }
}
