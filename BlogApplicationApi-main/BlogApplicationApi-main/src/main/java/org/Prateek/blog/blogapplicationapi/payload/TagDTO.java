package org.prateek.blog.blogapplicationapi.payload;

import org.prateek.blog.blogapplicationapi.entities.Tag;

public record TagDTO(
    Long id,
    String name
) {
    public TagDTO(Tag tag){
        this(tag.getId(), tag.getName());
    }
}
