package org.prateek.blog.blogapplicationapi.serviceimpl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.prateek.blog.blogapplicationapi.entities.*;
import org.prateek.blog.blogapplicationapi.exceptions.InvalidParameterException;
import org.prateek.blog.blogapplicationapi.exceptions.ResourceNotFound;
import org.prateek.blog.blogapplicationapi.exceptions.UnAuthorizedOperationExcpetion;
import org.prateek.blog.blogapplicationapi.payload.*;
import org.prateek.blog.blogapplicationapi.repository.*;
import org.prateek.blog.blogapplicationapi.service.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final FileService fileService;
    private final NotificationService notificationService;
    private final UserService userService;



    @Value("${project.image}")
    private String path;

    @Override
    public PostDTO createPost(CreatePostRequest request, Long userId) {
        Category category = this.categoryRepository.findById(request.categoryId())
                .orElseThrow(()->new ResourceNotFound("Category", "categoryId", request.categoryId().toString()));
        User user = userService.getLoggedInUser()
                .orElseThrow(()->new ResourceNotFound("User", "userId", userId.toString()));

        Post post = new Post();
        post.setTitle(request.postTitle());
        post.setContent(request.postContent());
        post.setDescription(request.postDescription());
        post.setDraft(request.draft());
        post.setPublished(new Date());
        post.setLastUpdated(new Date());
        post.setUser(user);
        post.setCategory(category);

        //save tags
        List<Tag> tags=null;
        if(!request.tags().isEmpty()){
            tags = request.tags().stream()
            .map(tagName -> tagRepository.findByName(tagName.toLowerCase())
            .orElseGet(() -> {
                Tag newTag = new Tag();
                newTag.setName(tagName.toLowerCase());
                return tagRepository.save(newTag);
            })).toList();
        }
        post.setTags(tags);
        post.setBannerUrl(request.bannerUrl());
        post.setPostActivities(new ArrayList<>());

        //save post to database
        Post saved_post = this.postRepository.save(post);

        //create a notification of new post
        category.getSubscribers().forEach((subscriber)->{
            Notification notification = new Notification();
            notification.setUser(subscriber);
            notification.setType(NotificationType.NEW_POST);
            notification.setContent(saved_post.getPostId().toString());
            notificationService.saveNotification(user, notification);
        });

        return new PostDTO(saved_post);
    }

    @Override
    public PostDTO updatePost(PostUpdateRequest postUpdateRequest) {
        Post post = this.postRepository.findById(postUpdateRequest.postId())
                .orElseThrow(() -> new ResourceNotFound("Post", "postId", postUpdateRequest.postId().toString()));

        User user = userRepository.findById(postUpdateRequest.userId())
                .orElseThrow(() -> new ResourceNotFound("User", "userId", postUpdateRequest.userId().toString()));

        Category category = this.categoryRepository.findById(postUpdateRequest.categoryId())
                .orElseThrow(()->new ResourceNotFound("Category", "categoryId", postUpdateRequest.categoryId().toString()));

        if (!post.getUser().getUserId().equals(user.getUserId())) {
            throw new UnAuthorizedOperationExcpetion("You are not authorized to update this post.");
        }

        //if the post is still a draft
        if(postUpdateRequest.draft()) {
            if (postUpdateRequest.postTitle().isBlank()) {
                throw new RuntimeException("post title is empty!!!");
            }
            if (postUpdateRequest.postContent().isBlank()) {
                throw new RuntimeException("post content is empty!!!");
            }
            if (postUpdateRequest.bannerUrl().isBlank()) throw new InvalidParameterException("banner is required!!!");
        }
        if(!postUpdateRequest.draft()){
            if (postUpdateRequest.postContent().isBlank()) {
                throw new InvalidParameterException("post content cannot be blank!!!");
            }
            if (postUpdateRequest.tags().isEmpty()) throw new InvalidParameterException("at least one tag is required!!!");
            if(postUpdateRequest.postDescription().isBlank()){
                throw new InvalidParameterException("add a small description to your post!!!");
            }
        }

        // Fetch and set tags
        List<Tag> tags = new ArrayList<>();
        for (String tagName : postUpdateRequest.tags()) {
            Tag tag = this.tagRepository.findByName(tagName)
                    .orElseGet(() -> {
                        Tag created_tag = new Tag();
                        created_tag.setName(tagName);
                        return created_tag;
                    }); // If tag does not exist, create a new one
            // Save the tag if it is newly created
            if (tag.getId() == null) {
                tag = this.tagRepository.save(tag);
            }
            tags.add(tag);
        }
        post.setTags(tags);
        post.setDescription(postUpdateRequest.postDescription());
        post.setTitle(postUpdateRequest.postTitle());
        post.setContent(postUpdateRequest.postContent());
        post.setBannerUrl(postUpdateRequest.bannerUrl());
        post.setCategory(category);
        post.setLastUpdated(new Date());
        post.setDraft(postUpdateRequest.draft());

        Post updated_post = this.postRepository.save(post);
        return new PostDTO(updated_post);
    }

    @Override
    public void deletePost(Long postId, Long userId) throws IOException {
        Post post = this.postRepository.findById(postId)
                .orElseThrow(()-> new ResourceNotFound("Post", "postId", postId.toString()));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFound("User", "userId", userId.toString()));

        if (!post.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("You are not authorized to update this post.");
        }

        this.fileService.deleteResource(path, post.getBannerUrl());
        this.postRepository.delete(post);
    }

    @Override
    public PostPageResponse getPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Post> page_post = this.postRepository.findAll(pageable);
        List<PostDTO> posts = page_post.getContent().stream().map(PostDTO::new).toList();
        return new PostPageResponse(posts,
                    page_post.getNumber(),
                page_post.getSize(),
                page_post.getTotalElements(),
                page_post.getTotalPages(), page_post.isLast());
    }

    @Override
    public PostDTO getPostById(Long postId) {
        Post post = this.postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFound("Post", "postId", postId.toString()));
        return new PostDTO(post);
    }

    @Override
    public PostPageResponse getPostsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = Sort.by(sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Category category = this.categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFound("Category", "categoryId", categoryId.toString()));

        Page<Post> postsPage = postRepository.findByCategory(category, pageable);

        List<PostDTO> posts = postsPage.getContent().stream().map(PostDTO::new).toList();

        return new PostPageResponse(
                posts,
                postsPage.getNumber(),
                postsPage.getSize(),
                postsPage.getTotalElements(),
                postsPage.getTotalPages(),
                postsPage.isLast()
        );
    }

    @Override
    public PostPageResponse getPostsByUser(Long userId, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFound("User", "userId", userId.toString()));

        Page<Post> postsPage = postRepository.findByUser(user, pageable);

        List<PostDTO> posts = postsPage.getContent().stream().map(PostDTO::new).toList();

        return new PostPageResponse(
                posts,
                postsPage.getNumber(),
                postsPage.getSize(),
                postsPage.getTotalElements(),
                postsPage.getTotalPages(),
                postsPage.isLast()
        );
    }

    @Override
    public PostPageResponse getPostsByTag(String tagName, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        // Retrieve the tag from the repository
        Tag tag = this.tagRepository.findByName(tagName)
                .orElseThrow(() -> new ResourceNotFound("Tag", "tagName", tagName));

        // Fetch posts associated with the tag using the repository method
        Page<Post> postsPage = postRepository.findByTagsContaining(tag, pageable);

        // Convert Page<Post> to a list of PostDto
        List<PostDTO> posts = postsPage.getContent().stream().map(PostDTO::new).toList();

        // Create and return a PostResponse object containing the paginated post data
        return new PostPageResponse(
                posts,
                postsPage.getNumber(),
                postsPage.getSize(),
                postsPage.getTotalElements(),
                postsPage.getTotalPages(),
                postsPage.isLast()
        );
    }

    @Override
    public PostPageResponse searchPosts(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = Sort.by(sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<Post> postsPage = postRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(keyword, pageable);

        List<PostDTO> posts = postsPage.getContent().stream().map(PostDTO::new).toList();

        return new PostPageResponse(
                posts,
                postsPage.getNumber(),
                postsPage.getSize(),
                postsPage.getTotalElements(),
                postsPage.getTotalPages(),
                postsPage.isLast()
        );
    }

    @Override
    public PostPageResponse getPublishedPostsByUser(Long userId, boolean draft, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = Sort.by(sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        var user = this.userRepository.findById(userId).orElseThrow(() -> new ResourceNotFound("User", "userId", userId.toString()));
        Page<Post> postsPage = postRepository.findPostByUserAndDraft(user, draft, pageable);

        List<PostDTO> posts = postsPage.getContent().stream().map(PostDTO::new).toList();

        return new PostPageResponse(
                posts,
                postsPage.getNumber(),
                postsPage.getSize(),
                postsPage.getTotalElements(),
                postsPage.getTotalPages(),
                postsPage.isLast()
        );
    }

    @Override
    public PostPageResponse getTrendingPosts(Integer pageNumber, Integer pageSize) {
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        // Fetch trending posts based on the sum of likes and comments
        Page<Post> trendingPostsPage = postRepository.findTrendingPosts(oneWeekAgo, pageable);

        // Convert to DTOs
        List<PostDTO> postDTs = trendingPostsPage.getContent().stream().map(PostDTO::new).collect(Collectors.toList());

        // Create and return the response
        return new PostPageResponse(
                postDTs,
                trendingPostsPage.getNumber(),
                trendingPostsPage.getSize(),
                trendingPostsPage.getTotalElements(),
                trendingPostsPage.getTotalPages(),
                trendingPostsPage.isLast());
    }

    @Override
    public List<PostDTO> getRecommendedPostsOfCategory(Long categoryId, Integer pageNumber, Integer pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        Category category = this.categoryRepository.findById(categoryId).orElseThrow(()-> new ResourceNotFound("Category", "categoryId", categoryId.toString()));
        List<Post> posts = postRepository.findPopularPostsByCategory(category, pageRequest);
        return posts.stream().map(PostDTO::new).toList();
    }

    @Override
    public void incrementPostViews(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFound("Post", "id", postId.toString()));
        post.setViews(post.getViews() + 1);
        postRepository.save(post);
    }

    @Override
    public PostPageResponse getPostsFromSubscribedCategories(Long userId, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        var user = userRepository.findById(userId).orElseThrow(()-> new ResourceNotFound("User", "userId", userId.toString()));
        //get user subscribed categories
        List<Category> subscribedCategories = user.getSubscribedCategories();
        subscribedCategories.forEach(category -> System.out.println(category.getTitle()));

        //make page request
        Sort sort = Sort.by(sortDir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Post> postsPage = postRepository.findByCategoryIn(subscribedCategories, pageable);
        List<PostDTO> posts = postsPage.getContent().stream().map(PostDTO::new).toList();
        return new PostPageResponse(
                posts,
                postsPage.getNumber(),
                postsPage.getSize(),
                postsPage.getTotalElements(),
                postsPage.getTotalPages(),
                postsPage.isLast()
        );
    }

}
