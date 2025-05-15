package org.prateek.blog.blogapplicationapi.service;

import org.prateek.blog.blogapplicationapi.payload.CategoryDTO;
import org.prateek.blog.blogapplicationapi.payload.CategoryPageResponse;

import java.util.List;

public interface CategoryService {
    CategoryDTO createCategory(CategoryDTO category);
    CategoryDTO updateCategoryDescriptionAndTitle(CategoryDTO category);
    void deleteCategory(Long categoryId);
    CategoryPageResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
    List<CategoryDTO> getAllCategories();
    CategoryDTO getCategory(Long categoryId);

    void followCategory(Long categoryId);
    void unfollowCategory(Long categoryId);

}
