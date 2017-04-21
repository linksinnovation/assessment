package com.linksinnovation.elearning.controller.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.linksinnovation.elearning.controller.jsonview.View;
import com.linksinnovation.elearning.model.Course;
import com.linksinnovation.elearning.model.Lecture;
import com.linksinnovation.elearning.model.Rating;
import com.linksinnovation.elearning.model.Section;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.model.Viewer;
import com.linksinnovation.elearning.model.enumuration.CourseStatus;
import com.linksinnovation.elearning.repository.CourseRepositroy;
import com.linksinnovation.elearning.repository.QuizScoreRepository;
import com.linksinnovation.elearning.repository.RatingRepository;
import com.linksinnovation.elearning.repository.UserDetailsRepository;
import com.linksinnovation.elearning.repository.ViewerRepository;
import com.linksinnovation.elearning.service.CourseService;
import java.util.Arrays;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseRepositroy courseRepositroy;
    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private ViewerRepository viewerRepository;
    @Autowired
    private QuizScoreRepository quizScoreRepository;
    @Autowired
    private CourseService courseService;

    @PreAuthorize("hasAuthority('Super Administrator') or hasAuthority('Administrator') or hasAuthority('Instructor')")
    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public Long create(@AuthenticationPrincipal String username) {
        UserDetails userDetails = userDetailsRepository.findOne(username.toUpperCase());
        Course course = new Course();
        course.setCreator(userDetails);
        course.addInstructor(userDetails);
        String permissions[] = {"C 1", "C 2", "C 3", "C 4", "C 5", "C 6", "C 7", "C 8", "C 9", "C 10", "C 11", "C 12", "C 13", "UC1", "UC2", "UC3", "COO", "CEO"};
        course.setPermission(Arrays.asList(permissions));
        return courseRepositroy.save(course).getId();

    }

    @JsonView(View.SCREEN.class)
    @RequestMapping(method = RequestMethod.GET)
    public List<Course> get(@AuthenticationPrincipal String username) {
        UserDetails userDetails = userDetailsRepository.findOne(username.toUpperCase());
        return courseRepositroy.findByCreator(userDetails);
    }

    @PreAuthorize("hasAuthority('Super Administrator') or hasAuthority('Administrator') or hasAuthority('Instructor')")
    @RequestMapping(value = "/status", method = RequestMethod.POST)
    public Course toggleStatus(@RequestBody Course course) {
        Course findOne = courseRepositroy.findOne(course.getId());
        if (findOne.getStatus().equals(CourseStatus.DRAFT) || findOne.getStatus().equals(CourseStatus.UNPUBLISH)) {
            findOne.setStatus(CourseStatus.PUBLISH);
        } else {
            findOne.setStatus(CourseStatus.UNPUBLISH);
        }
        Course save = courseRepositroy.save(findOne);
        courseService.setNewStatus();
        return save;
    }

    @JsonView(View.DEFAULT.class)
    @RequestMapping(value = "/basic/{id}", method = RequestMethod.GET)
    public Course basic(@PathVariable("id") Long id, @AuthenticationPrincipal String username) {
        Course course = courseRepositroy.findOne(id);
        UserDetails userDetails = userDetailsRepository.findOne(username.toUpperCase());    
        if(!course.getPermission().contains(userDetails.getEesgName())){
            return null;
        }      
        List<Rating> ratings = ratingRepository.findByUserAndCourse(userDetails, course);
        course.getSections().stream().forEach((section) -> {
            section.getLectures().stream().forEach((lecture) -> {
                Optional<Viewer> optional = viewerRepository.findByLectureAndUser(lecture, userDetails);
                if (optional.isPresent()) {
                    lecture.setView(true);
                }else{
                    lecture.setView(false);
                }
            });
        });
        if (ratings.isEmpty()) {
            course.setPoint(0);
        } else {
            course.setPoint(ratings.get(0).getPoint());
        }
        return course;
    }
    
    @PreAuthorize("hasAuthority('Super Administrator') or hasAuthority('Administrator') or hasAuthority('Instructor')")
    @RequestMapping(value = "/basic/info/{id}", method = RequestMethod.GET)
    public Course basicInfo(@PathVariable("id") Long id, @AuthenticationPrincipal String username) {
        Course course = courseRepositroy.findOne(id);
        UserDetails userDetails = userDetailsRepository.findOne(username.toUpperCase());
        List<Rating> ratings = ratingRepository.findByUserAndCourse(userDetails, course);
        course.getSections().stream().forEach((section) -> {
            section.getLectures().stream().forEach((lecture) -> {
                Optional<Viewer> optional = viewerRepository.findByLectureAndUser(lecture, userDetails);
                if (optional.isPresent()) {
                    lecture.setView(true);
                }else{
                    lecture.setView(false);
                }
            });
        });
        if (ratings.isEmpty()) {
            course.setPoint(0);
        } else {
            course.setPoint(ratings.get(0).getPoint());
        }
        return course;
    }
    

    @PreAuthorize("hasAuthority('Super Administrator') or hasAuthority('Administrator') or hasAuthority('Instructor')")
    @RequestMapping(value = "/basic", method = RequestMethod.POST)
    public Course basic(@RequestBody Course course, @AuthenticationPrincipal String username) {
        Course findOne = courseRepositroy.findOne(course.getId());
        UserDetails userDetails = userDetailsRepository.findOne(username.toUpperCase());
        course.setCreator(userDetails);
        course.setLectures("0 lectures");
        course.setWishlists(findOne.getWishlists());
        course.setRatings(findOne.getRatings());
        course.setUpdateDate(new Date());
        return courseRepositroy.save(course);
    }

    @PreAuthorize("hasAuthority('Super Administrator') or hasAuthority('Administrator') or hasAuthority('Instructor')")
    @RequestMapping(value = "/instructor", method = RequestMethod.POST)
    public Course addInstructor(@RequestBody Map<String, String> params) {
        UserDetails userDetails = userDetailsRepository.findOne(params.get("username").toUpperCase());
        Course course = courseRepositroy.findOne(Long.parseLong(params.get("course")));
        course.addInstructor(userDetails);
        return courseRepositroy.save(course);
    }

    @PreAuthorize("hasAuthority('Super Administrator') or hasAuthority('Administrator') or hasAuthority('Instructor')")
    @RequestMapping(value = "/instructor", method = RequestMethod.DELETE)
    public Course removeInstructor(@RequestBody Map<String, String> params) {
        UserDetails userDetails = userDetailsRepository.findOne(params.get("username").toUpperCase());
        Course course = courseRepositroy.findOne(Long.parseLong(params.get("course")));
        course.removeInstructor(userDetails);
        return courseRepositroy.save(course);
    }

    @JsonView(View.SCREEN.class)
    @RequestMapping(value = "/search/{search}/p/{page}", method = RequestMethod.GET)
    public Page<Course> search(@PathVariable("search") String search, @PathVariable("page") Integer page, @AuthenticationPrincipal String user) {
        UserDetails userDetails = userDetailsRepository.findOne(user.toUpperCase());
        Page<Course> courses = courseRepositroy.findByTitleLikeOrSubTitleLike("%" + search + "%", "%" + search + "%", userDetails.getEesgName(), new PageRequest(page, 16, Sort.Direction.DESC, "id"));
        courses.getContent().stream().forEach((course) -> {
            course.getWishlists().stream().filter((wishlist) -> (wishlist.getUser().equals(userDetails))).forEach((_item) -> {
                course.setWishlist(true);
            });
        });
        return courses;
    }

    @PreAuthorize("hasAuthority('Super Administrator') or hasAuthority('Administrator') or hasAuthority('Instructor')")
    @Transactional(propagation = Propagation.REQUIRED)
    @RequestMapping(method = RequestMethod.DELETE)
    public void deleteCourse(@RequestBody Map<String, Long> params, @AuthenticationPrincipal String user) {
        UserDetails userDetails = userDetailsRepository.findOne(user.toUpperCase());
        Course course = courseRepositroy.findOne(params.get("id"));
        for(Section section : course.getSections()){
            for(Lecture lecture : section.getLectures()){
                viewerRepository.deleteByLecture(lecture);
            }
        }
        quizScoreRepository.deleteByCourseAndUser(course,userDetails);
        courseRepositroy.deleteByIdAndCreator(params.get("id"), userDetails);
    }

}
