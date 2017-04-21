package com.linksinnovation.elearning.service;

import com.linksinnovation.elearning.model.enumuration.UserType;
import com.linksinnovation.elearning.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userDetailsRepository.findByUsernameAndType(s.toUpperCase(), UserType.LOCAL);
    }
}
