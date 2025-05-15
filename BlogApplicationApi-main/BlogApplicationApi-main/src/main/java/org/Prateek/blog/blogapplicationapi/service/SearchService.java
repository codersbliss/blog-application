package org.prateek.blog.blogapplicationapi.service;

import org.prateek.blog.blogapplicationapi.payload.SearchResultPageResponse;
import org.prateek.blog.blogapplicationapi.payload.SearchRequest;
import org.prateek.blog.blogapplicationapi.payload.SearchSuggestionResponse;

public interface SearchService {
    SearchSuggestionResponse getSuggestions(SearchRequest req);
    SearchResultPageResponse getSearchResult(SearchRequest req);
}
