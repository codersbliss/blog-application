package org.prateek.blog.blogapplicationapi.payload;

import java.util.List;

public record SearchSuggestionResponse(List<String> suggestions) {
}
