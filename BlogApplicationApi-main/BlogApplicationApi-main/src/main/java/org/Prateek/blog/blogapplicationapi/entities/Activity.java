    package org.prateek.blog.blogapplicationapi.entities;

    import com.fasterxml.jackson.annotation.JsonBackReference;
    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import lombok.Data;
    import lombok.Getter;
    import lombok.RequiredArgsConstructor;
    import lombok.Setter;

    import java.time.LocalDateTime;

    @Entity
    @Setter
    @Getter
    @RequiredArgsConstructor
    @Table(name = "activity")
    public class Activity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "activity_id")
        private Long activityId;

        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        @JsonBackReference
        private User user;

        @Enumerated(EnumType.STRING)
        @Column(name = "activity_type", nullable = false)
        private ActivityType activityType;

        @ManyToOne
        @JoinColumn(name = "post_id", nullable = false)
        @JsonBackReference
        private Post post;

        @Column(name = "activity_date", nullable = false)
        private LocalDateTime activityDate;
    }
