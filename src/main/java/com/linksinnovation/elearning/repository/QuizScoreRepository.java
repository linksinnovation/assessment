/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.repository;

import com.linksinnovation.elearning.model.Course;
import com.linksinnovation.elearning.model.QuizScore;
import com.linksinnovation.elearning.model.UserDetails;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public interface QuizScoreRepository extends JpaRepository<QuizScore, Long>{
    Optional<QuizScore> findByUserAndCourse(UserDetails user,Course course);

    public void deleteByCourseAndUser(Course course, UserDetails userDetails);
}
