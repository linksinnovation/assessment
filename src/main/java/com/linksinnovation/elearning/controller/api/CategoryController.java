package com.linksinnovation.elearning.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.linksinnovation.elearning.controller.jsonview.View;
import com.linksinnovation.elearning.model.Course;
import com.linksinnovation.elearning.model.Menu;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.model.enumuration.CourseStatus;
import com.linksinnovation.elearning.repository.CourseRepositroy;
import com.linksinnovation.elearning.repository.MenuRepository;
import com.linksinnovation.elearning.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CourseRepositroy courseRepositroy;
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @JsonView(View.SCREEN.class)
    @RequestMapping(value = "/p/{page}", method = RequestMethod.GET)
    public Page<Course> get(@PathVariable("page") Integer page, @AuthenticationPrincipal String user) {
        UserDetails userDetails = userDetailsRepository.findOne(user.toUpperCase());
        Page<Course> courses = courseRepositroy.findByStatusAndPermission(CourseStatus.PUBLISH, userDetails.getEesgName(), new PageRequest(page, 16, Sort.Direction.DESC, "id"));
        courses.getContent().stream().forEach((course) -> {
            course.getWishlists().stream().filter((wishlist) -> (wishlist.getUser().equals(userDetails))).forEach((_item) -> {
                course.setWishlist(true);
            });
        });

        return courses;
    }

    @JsonView(View.SCREEN.class)
    @RequestMapping(value = "/{id}/p/{page}", method = RequestMethod.GET)
    public Page<Course> get(@PathVariable("id") Long id, @PathVariable("page") Integer page, @AuthenticationPrincipal String user) {
        Menu menu = menuRepository.findOne(id);
        UserDetails userDetails = userDetailsRepository.findOne(user.toUpperCase());
        Page<Course> courses = courseRepositroy.findByCategoryOrSubCategoryAndStatusAndPermission(menu, CourseStatus.PUBLISH, userDetails.getEesgName(), new PageRequest(page, 16, Sort.Direction.DESC, "id"));
        courses.getContent().stream().forEach((course) -> {
            course.getWishlists().stream().filter((wishlist) -> (wishlist.getUser().equals(userDetails))).forEach((_item) -> {
                course.setWishlist(true);
            });
        });
        return courses;
    }
}
