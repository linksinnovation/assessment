/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.controller.api;

import com.linksinnovation.elearning.model.Lecture;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.model.Viewer;
import com.linksinnovation.elearning.repository.LectureRepository;
import com.linksinnovation.elearning.repository.UserDetailsRepository;
import com.linksinnovation.elearning.repository.ViewerRepository;
import java.util.Date;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@RestController
@RequestMapping("/api/viewer")
public class ViewerController {
    
    @Autowired
    private LectureRepository lectureRepository;
    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private ViewerRepository viewerRepository;
    
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public void get(@PathVariable("id") Long id,@AuthenticationPrincipal String username){
        Lecture lecture = lectureRepository.findOne(id);
        UserDetails userDetails = userDetailsRepository.findOne(username);
        Optional<Viewer> viOptional = viewerRepository.findByLectureAndUser(lecture, userDetails);
        Viewer viewer;
        if(viOptional.isPresent()){
            viewer = viOptional.get();
            viewer.setUpdateDate(new Date());
        }else{
            viewer = new Viewer();
            viewer.setLecture(lecture);
            viewer.setUser(userDetails);
            viewer.setUpdateDate(new Date());
        }
        viewerRepository.save(viewer);
    }
}
