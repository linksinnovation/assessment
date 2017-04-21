/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.controller.api;

import com.linksinnovation.elearning.model.Course;
import com.linksinnovation.elearning.model.Rating;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.repository.CourseRepositroy;
import com.linksinnovation.elearning.repository.RatingRepository;
import com.linksinnovation.elearning.repository.UserDetailsRepository;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@RestController
@RequestMapping("/api/rating")
public class RatingController {

    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private CourseRepositroy courseRepositroy;
    @Autowired
    private RatingRepository ratingRepository;

    @RequestMapping(method = RequestMethod.POST)
    public void rate(@RequestBody Map<String, String> params, @AuthenticationPrincipal String username) {
        UserDetails userDetails = userDetailsRepository.findOne(username.toUpperCase());
        Course course = courseRepositroy.findOne(Long.parseLong(params.get("course")));
        List<Rating> ratings = ratingRepository.findByUserAndCourse(userDetails, course);
        Rating rating;
        if (ratings.size() > 0) {
            rating = ratings.get(0);
            rating.setPoint(Integer.parseInt(params.get("point")));
            ratingRepository.save(rating);
        } else {
            rating = new Rating();
            rating.setPoint(Integer.parseInt(params.get("point")));
            rating.setUser(userDetails);
            course.addRating(rating);
            courseRepositroy.save(course);
        } 
    }
}
