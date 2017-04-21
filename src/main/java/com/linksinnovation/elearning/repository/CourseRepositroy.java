package com.linksinnovation.elearning.repository;

import com.linksinnovation.elearning.model.Course;
import com.linksinnovation.elearning.model.Menu;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.model.enumuration.CourseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
public interface CourseRepositroy extends JpaRepository<Course, Long> {

    public List<Course> findByCreator(UserDetails userDetails);

    public List<Course> findByStatus(CourseStatus status);

    public List<Course> findByCategoryAndStatusOrSubCategoryAndStatus(Menu category, CourseStatus status1, Menu subCategory, CourseStatus status2);

    public Optional<Course> findByIdAndCreator(Long id, UserDetails userDetails);

    @Query("SELECT c FROM Course c, IN(c.permission) permission WHERE (c.title LIKE ?1 or c.subTitle LIKE ?2) AND permission=?3 ")
    public Page<Course> findByTitleLikeOrSubTitleLike(String string, String string0,String permission, Pageable pageable);

    @Query("SELECT c FROM Course c, IN(c.permission) permission WHERE c.status=?1 and permission=?2")
    public Page<Course> findByStatusAndPermission(CourseStatus courseStatus, String permission, Pageable pageable);

    @Query("SELECT c FROM Course c, IN(c.permission) permission WHERE (c.category=?1 OR c.subCategory=?1) AND c.status=?2 AND permission=?3")
    public Page<Course> findByCategoryOrSubCategoryAndStatusAndPermission(Menu cat, CourseStatus status, String permission, Pageable pageable);

    public void deleteByIdAndCreator(Long get, UserDetails userDetails);

    public List<Course> findByNewStatus(boolean b);

    public Page<Course> findByStatusOrderByUpdateDateDesc(CourseStatus courseStatus, Pageable pageRequest);
}
