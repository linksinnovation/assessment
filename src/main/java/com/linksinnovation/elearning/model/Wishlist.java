/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@Entity
public class Wishlist {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Course course;
    @ManyToOne
    private UserDetails user;
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        if(course.getWishlists() == null){
            Set<Wishlist> arrayList = new HashSet<>();
            arrayList.add(this);
            course.setWishlists(arrayList);
        }else{
            course.getWishlists().add(this);
        }
        this.course = course;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserDetails getUser() {
        return user;
    }

    public void setUser(UserDetails user) {
        if(user.getWishlists() == null){
            ArrayList<Wishlist> arrayList = new ArrayList<>();
            arrayList.add(this);
            user.setWishlists(arrayList);
        }else{
            user.getWishlists().add(this);
        }
        this.user = user;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
    
    @PrePersist
    @PreUpdate
    public void defaultDate(){
        this.setUpdateDate(new Date());
    }
    
    @PreRemove
    public void preRemove(){
        this.getUser().getWishlists().remove(this);
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
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
        final Wishlist other = (Wishlist) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }  
    
}
