/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.controller.api;

import com.linksinnovation.elearning.model.Authority;
import com.linksinnovation.elearning.model.Course;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.model.enumuration.UserType;
import com.linksinnovation.elearning.repository.CourseRepositroy;
import com.linksinnovation.elearning.repository.UserDetailsRepository;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private CourseRepositroy courseRepositroy;
    @Autowired
    BCryptPasswordEncoder bcryptEncoder;

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public UserDetails get(@AuthenticationPrincipal String userDetails) {
        return userDetailsRepository.findOne(userDetails.toUpperCase());
    }

    @RequestMapping(value = "/user/{username}", method = RequestMethod.GET)
    public UserDetails getUser(@PathVariable("username") String username) {
        return userDetailsRepository.findOne(username);
    }

    @RequestMapping(value = "/listusers/p/{page}", method = RequestMethod.GET)
    public Page<UserDetails> get(@PathVariable("page") Integer page) {
        return userDetailsRepository.findAll(new PageRequest(page, 10, Sort.Direction.ASC, "username"));
    }

    @RequestMapping(value = "/user/search", method = RequestMethod.POST)
    public Page<UserDetails> search(@RequestBody Map<String, Object> params) {
        return userDetailsRepository.findByNameEnIgnoreCaseLike("%" + params.get("name") + "%", new PageRequest((Integer) params.get("page"), 10, Sort.Direction.ASC, "username"));
    }

    @RequestMapping(value = "/user/instructor", method = RequestMethod.POST)
    public UserDetails updateInstructor(@RequestBody Map<String, Object> params, @AuthenticationPrincipal String userDetails) {
        UserDetails user = userDetailsRepository.findOne(userDetails.toUpperCase());
        user.setInstructor(params.get("instructor").toString());
        return userDetailsRepository.save(user);
    }

    @RequestMapping(value = "/user/search/instructor", method = RequestMethod.POST)
    public List<UserDetails> searchInstructor(@RequestBody Map<String, String> params) {
        Course course = courseRepositroy.findOne(Long.parseLong(params.get("course")));
        List<UserDetails> users = userDetailsRepository.findByNameEnIgnoreCaseLike("%" + params.get("search") + "%");
        users.removeAll(course.getInstructors());
        return users;
    }

    @PreAuthorize("hasAuthority('Super Administrator')")
    @RequestMapping(value = "/user/saverole", method = RequestMethod.POST)
    public UserDetails saveRole(@RequestBody Map<String, String> params) {
        UserDetails userDetails = userDetailsRepository.findOne(params.get("username").toUpperCase());
        if (userDetails.getType().equals(UserType.ISERVICE)) {
            userDetails.setAuthority(new Authority(params.get("authority")));
        }else{
            userDetails.setNameEn(params.get("name"));
            userDetails.setEesgName(params.get("level"));
        }
        return userDetailsRepository.save(userDetails);
    }

    @RequestMapping(value = "/user/avatar", method = RequestMethod.POST)
    public String avatarUpload(@RequestParam("name") String name, @RequestParam("file") MultipartFile file, @AuthenticationPrincipal String user) throws Exception {
        if (!file.isEmpty()) {
            String fileName = user + "-" + name;

            byte[] bytes = file.getBytes();
            try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File("/mnt/data/images/avatar/" + fileName)))) {
                stream.write(bytes);
            }

            UserDetails userDetails = userDetailsRepository.findOne(user.toUpperCase());
            userDetails.setAvatar(fileName);
            userDetailsRepository.save(userDetails);

            return fileName;
        } else {
            throw new Exception("You failed to upload because the file was empty.");
        }
    }

    @PreAuthorize("hasAuthority('Super Administrator')")
    @RequestMapping(value = "/user/add", method = RequestMethod.POST)
    public boolean addUser(@RequestBody Map<String, String> map) {
        UserDetails findOne = userDetailsRepository.findOne(map.get("username").toUpperCase());
        if (findOne != null) {
            return false;
        }
        UserDetails userDetails = new UserDetails();
        userDetails.setUserName(map.get("username").toUpperCase());
        userDetails.setPassword(bcryptEncoder.encode(map.get("password")));
        userDetails.setNameEn(map.get("name"));
        userDetails.setEesgName(map.get("level"));
        userDetails.setType(UserType.LOCAL);
        userDetails.addAuthority(new Authority("User"));
        userDetailsRepository.save(userDetails);
        return true;
    }
    
    @PreAuthorize("hasAuthority('Super Administrator')")
    @RequestMapping(value = "/user/delete", method = RequestMethod.DELETE)
    public boolean deleteUser(@RequestBody Map<String, String> map) {
        UserDetails findOne = userDetailsRepository.findOne(map.get("username").toUpperCase());
        if (!findOne.getType().equals(UserType.LOCAL)) {
            return false;
        }
        userDetailsRepository.delete(findOne);
        return true;
    }

}
