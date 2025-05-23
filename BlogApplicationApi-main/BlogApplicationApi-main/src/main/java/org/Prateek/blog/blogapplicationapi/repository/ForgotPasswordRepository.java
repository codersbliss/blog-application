package org.prateek.blog.blogapplicationapi.repository;

import jakarta.transaction.Transactional;
import org.prateek.blog.blogapplicationapi.entities.ForgotPassword;
import org.prateek.blog.blogapplicationapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Long> {
    Optional<ForgotPassword> findByOtpAndUser(Long otp, User user);

    @Transactional
    @Modifying
    void deleteByUser(User user);

    Optional<ForgotPassword> findByToken(String token);
}
