/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.service;

import com.linksinnovation.elearning.model.Course;
import com.linksinnovation.elearning.model.enumuration.CourseStatus;
import com.linksinnovation.elearning.repository.CourseRepositroy;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@Service
public class CourseService {
    
    @Autowired
    private CourseRepositroy courseRepositroy;
    
    @Transactional
    public void setNewStatus(){
        List<Course> courses = courseRepositroy.findByNewStatus(true);
        for(Course c : courses){
            c.setNewStatus(false);
        }
        courseRepositroy.save(courses);
        Page<Course> page = courseRepositroy.findByStatusOrderByUpdateDateDesc(CourseStatus.PUBLISH,new PageRequest(0, 20));
        for(Course c : page.getContent()){
            c.setNewStatus(true);
        }
        courseRepositroy.save(page.getContent());
    }
}
