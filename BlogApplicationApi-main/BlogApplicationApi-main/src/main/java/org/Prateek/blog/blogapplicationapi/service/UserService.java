package org.prateek.blog.blogapplicationapi.service;

import org.prateek.blog.blogapplicationapi.entities.User;
import org.prateek.blog.blogapplicationapi.payload.*;

import java.util.Optional;

public interface UserService {
    UserDTO getUser(Long userId);
    UserDTO updateUser(UpdateUserRequest request);
    void subscribeToCategory(Long userId, Long categoryId);
    Optional<User> getLoggedInUser();
}
