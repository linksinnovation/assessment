package com.linksinnovation.elearning.repository;

import com.linksinnovation.elearning.model.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
public interface LectureRepository extends JpaRepository<Lecture,Long> {
}
