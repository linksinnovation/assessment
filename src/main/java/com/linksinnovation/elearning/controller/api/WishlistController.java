/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.linksinnovation.elearning.controller.jsonview.View;
import com.linksinnovation.elearning.model.Course;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.model.Wishlist;
import com.linksinnovation.elearning.repository.CourseRepositroy;
import com.linksinnovation.elearning.repository.UserDetailsRepository;
import com.linksinnovation.elearning.repository.WishlistRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;
    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private CourseRepositroy courseRepositroy;

    @JsonView(View.SCREEN.class)
    @RequestMapping(value = "/p/{page}", method = RequestMethod.GET)
    public Page<Course> get(@PathVariable("page") Integer page, @AuthenticationPrincipal String username) {
        UserDetails userDetails = userDetailsRepository.findOne(username.toUpperCase());
        List<Wishlist> findByUser = wishlistRepository.findByUser(userDetails);
        List<Course> courses = new ArrayList<>();
        findByUser.stream().forEach((wishlist) -> {
            Course course = wishlist.getCourse();
            course.setWishlist(true);
            courses.add(course);
        });

        int pageSize = 16;
        int first = page * pageSize;
        int last = first + (pageSize);
        last = (last > courses.size()) ? courses.size() : last;

        return new PageImpl<>(courses.subList(first, last), new PageRequest(page, pageSize, Sort.Direction.DESC, "id"), courses.size());
    }

    @RequestMapping(method = RequestMethod.POST)
    public boolean add(@RequestBody Map<String, Object> params, @AuthenticationPrincipal String username) {
        UserDetails userDetails = userDetailsRepository.findOne(username.toUpperCase());
        Course course = courseRepositroy.findOne(new Long(params.get("id").toString()));
        Optional<Wishlist> optional = wishlistRepository.findByUserAndCourse(userDetails, course);
        Wishlist wishlist;
        if (optional.isPresent()) {
            wishlistRepository.delete(optional.get());
        } else {
            wishlist = new Wishlist();
            wishlist.setUser(userDetails);
            wishlist.setCourse(course);
            wishlistRepository.save(wishlist);
        }

        return true;
    }
}
