package com.linksinnovation.elearning.repository;

import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.model.enumuration.UserType;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
public interface UserDetailsRepository extends JpaRepository<UserDetails,String> {
    public UserDetails findByUsernameAndType(String username,UserType type);
    public List<UserDetails> findByNameEnIgnoreCaseLike(String username);
    public Page<UserDetails> findByNameEnIgnoreCaseLike(String username,Pageable pageable);
}
