package org.prateek.blog.blogapplicationapi.repository;


import org.prateek.blog.blogapplicationapi.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
