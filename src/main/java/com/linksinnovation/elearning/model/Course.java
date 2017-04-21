package com.linksinnovation.elearning.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.linksinnovation.elearning.controller.jsonview.View;
import com.linksinnovation.elearning.model.enumuration.CourseStatus;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
@Entity
public class Course {

    @Id
    @GeneratedValue
    @JsonView({View.DEFAULT.class,View.SCREEN.class})
    private Long id;

    @JsonView({View.DEFAULT.class,View.SCREEN.class})
    private String title;

    @JsonView({View.DEFAULT.class,View.SCREEN.class})
    private String subTitle;

    @JsonView({View.DEFAULT.class})
    @Column(length = 4000)
    private String details;

    @JsonView({View.DEFAULT.class,View.SCREEN.class})
    @Column(nullable = false)
    private String cover = "draft.jpg";

    @JsonView({View.DEFAULT.class,View.SCREEN.class})
    private String lectures = "0 lectures";

    @JsonView({View.DEFAULT.class,View.SCREEN.class})
    private String hours = "0 hours video";

    @JsonView({View.DEFAULT.class,View.SCREEN.class})
    private Integer point;

    @JsonView({View.DEFAULT.class,View.SCREEN.class})
    @Enumerated(EnumType.STRING)
    private CourseStatus status = CourseStatus.DRAFT;

    @OneToOne
    @JsonView({View.DEFAULT.class})
    private Menu category;

    @OneToOne
    @JsonView({View.DEFAULT.class})
    private Menu subCategory;

    @OneToOne
    @JsonView({View.DEFAULT.class})
    private UserDetails creator;

    @ManyToMany
    @JsonView({View.DEFAULT.class,View.SCREEN.class})
    private List<UserDetails> instructors;
    
    @JsonView({View.DEFAULT.class,View.SCREEN.class})
    private boolean instructorDetails = true;

    @JsonView({View.DEFAULT.class})
    @JsonManagedReference
    @OrderBy("id ASC")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true,mappedBy = "course")
    private Set<Section> sections = new HashSet<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "course")
    private Set<Wishlist> wishlists;

    @JsonView({View.DEFAULT.class})
    @JsonManagedReference
    @OrderBy("id DESC")
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "course")
    private Set<Topic> topics;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "course")
    @JsonIgnore
    private Set<Rating> ratings;

    @JsonView({View.DEFAULT.class})
    @JsonManagedReference
    @OrderBy("id ASC")
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true, mappedBy = "course")
    private Set<Quiz> quizzes = new HashSet<>();

    @JsonView({View.DEFAULT.class})
    @ElementCollection
    private List<String> permission = new ArrayList<>();

    @JsonView({View.DEFAULT.class})
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    @Transient
    @JsonSerialize
    @JsonDeserialize
    @JsonView({View.DEFAULT.class,View.SCREEN.class})
    private boolean wishlist = false;
    
    private boolean newStatus = false;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getLectures() {
        return lectures;
    }

    public void setLectures(String lectures) {
        this.lectures = lectures;
    }

    public String getHours() {
        return hours;
    }

    public void setHours(String hours) {
        this.hours = hours;
    }

    public CourseStatus getStatus() {
        return status;
    }

    public void setStatus(CourseStatus status) {
        this.status = status;
    }

    public Menu getCategory() {
        return category;
    }

    public void setCategory(Menu category) {
        this.category = category;
    }

    public Menu getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(Menu subCategory) {
        this.subCategory = subCategory;
    }

    public UserDetails getCreator() {
        return creator;
    }

    public void setCreator(UserDetails creator) {
        this.creator = creator;
    }

    public List<UserDetails> getInstructors() {
        return instructors;
    }

    public void setInstructors(List<UserDetails> instructors) {
        this.instructors = instructors;
    }

    public void addInstructor(UserDetails instructor) {
        if (this.instructors == null) {
            this.instructors = new ArrayList<>();
        }
        this.instructors.add(instructor);
    }

    public void removeInstructor(UserDetails instructor) {
        this.instructors.remove(instructor);
    }

    public Set<Section> getSections() {
        return sections;
    }

    public void setSections(Set<Section> sections) {
        sections.stream().forEach((section) -> {
            section.setCourse(this);
        });
        this.sections = sections;
    }

    public Set<Wishlist> getWishlists() {
        return wishlists;
    }

    public void setWishlists(Set<Wishlist> wishlists) {
        this.wishlists = wishlists;
    }

    public boolean isWishlist() {
        return wishlist;
    }

    public void setWishlist(boolean wishlist) {
        this.wishlist = wishlist;
    }

    public Set<Topic> getTopics() {
        return topics;
    }

    public void setTopics(Set<Topic> topics) {
        this.topics = topics;
    }

    public void addTopic(Topic topic) {
        if (this.topics == null) {
            this.topics = new HashSet<>();
        }
        topic.setCourse(this);
        this.topics.add(topic);
    }

    public Set<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(Set<Rating> ratings) {
        this.ratings = ratings;
    }

    public void addRating(Rating rating) {
        if (this.ratings == null) {
            this.ratings = new HashSet<>();
        }
        rating.setCourse(this);
        this.ratings.add(rating);
    }

    public Integer getVote() {
        if (this.ratings == null) {
            return 0;
        }
        return this.ratings.size();
    }

    public float getPercentRate() {
        if (this.ratings == null || 0 == this.ratings.size()) {
            return 0f;
        }
        int total = this.ratings.size() * 5;
        int sum = this.ratings.stream().mapToInt(r -> r.getPoint()).sum();
        return ((float) sum / (float) total) * 100;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Set<Quiz> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(Set<Quiz> quizzes) {
        this.quizzes = quizzes;
    }

    public void addQuiz(Quiz quiz) {
        quiz.setCourse(this);
        this.quizzes.add(quiz);
    }

    public List<String> getPermission() {
        return permission;
    }

    public void setPermission(List<String> permission) {
        this.permission = permission;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public boolean isNewStatus() {
        return newStatus;
    }

    public void setNewStatus(boolean newStatus) {
        this.newStatus = newStatus;
    }

    public boolean isInstructorDetails() {
        return instructorDetails;
    }

    public void setInstructorDetails(boolean instructorDetails) {
        this.instructorDetails = instructorDetails;
    }


    
    

    @PrePersist
    @PreUpdate
    public void summary() {
        Long lectures = 0L;
        Long hours = 0L;
        for (Section section : this.sections) {
            lectures += section.getLectures().size();
            for (Lecture lecture : section.getLectures()) {
                hours += lecture.getDuration();
            }
        }

        this.updateDate = new Date();
        this.lectures = lectures + " lectures";
        this.hours = TimeUnit.MILLISECONDS.toHours(hours) + " hours video";
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 19 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Course other = (Course) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

}
