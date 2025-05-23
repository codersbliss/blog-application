package org.prateek.blog.blogapplicationapi.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@Table(name = "tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long id;

    @Column(nullable = false, name = "name", unique = true)
    private String name;

    @ManyToMany(mappedBy = "tags")
    private List<Post> posts;
}
