/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.repository;

import com.linksinnovation.elearning.model.Lecture;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.model.Viewer;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public interface ViewerRepository extends JpaRepository<Viewer, Long>{
    public Optional<Viewer> findByLectureAndUser(Lecture lecture,UserDetails user);

    public void deleteByLectureAndUser(Lecture lecture, UserDetails userDetails);

    public void deleteByLecture(Lecture lecture);
}
