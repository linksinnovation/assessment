package com.linksinnovation.elearning.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
@Entity
public class Section {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    @ManyToOne
    @JsonBackReference
    private Course course;
    @JsonManagedReference
    @OrderBy("id ASC")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "section")
    private Set<Lecture> lectures = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Lecture> getLectures() {
        return lectures;
    }

    public void setLectures(Set<Lecture> lectures) {
        lectures.stream().forEach((lecture) -> {
            lecture.setSection(this);
        });
        this.lectures = lectures;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
    
    

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Section section = (Section) o;

        return id != null ? id.equals(section.id) : section.id == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
