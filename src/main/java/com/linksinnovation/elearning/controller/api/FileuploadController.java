package com.linksinnovation.elearning.controller.api;

import com.linksinnovation.elearning.model.Course;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.repository.CourseRepositroy;
import com.linksinnovation.elearning.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Optional;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
@Controller
@RequestMapping("/api")
public class FileuploadController {

    @Autowired
    private CourseRepositroy courseRepositroy;
    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @ResponseBody
    @RequestMapping(value = "/fileupload", method = RequestMethod.POST)
    public String coverUpload(@RequestParam("course") Long id,@RequestParam("name") String name, @RequestParam("file") MultipartFile file) throws Exception {
        if (!file.isEmpty()) {
            try {
                String userName = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                UserDetails userDetails = userDetailsRepository.findOne(userName.toUpperCase());
                Optional<Course> course = courseRepositroy.findByIdAndCreator(id, userDetails);
                if (course.isPresent()) {
                    String fileName = "cover-"+id+"-"+name;
                    Course c = course.get();
                    c.setCover(fileName);
                    courseRepositroy.save(c);

                    byte[] bytes = file.getBytes();
                    try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File("/mnt/data/images/" + fileName)))) {
                        stream.write(bytes);
                    }

                    return fileName;
                }

                throw new Exception("User no permission");
            } catch (Exception e) {
                throw new Exception("You failed to upload " + file.getName() + " => " + e.getMessage());
            }
        } else {
            throw new Exception("You failed to upload because the file was empty.");
        }
    }
}
