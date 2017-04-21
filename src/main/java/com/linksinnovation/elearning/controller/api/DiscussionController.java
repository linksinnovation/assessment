/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.controller.api;

import com.linksinnovation.elearning.model.Course;
import com.linksinnovation.elearning.model.Reply;
import com.linksinnovation.elearning.model.Topic;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.repository.AnswerRepository;
import com.linksinnovation.elearning.repository.CourseRepositroy;
import com.linksinnovation.elearning.repository.ReplyRepository;
import com.linksinnovation.elearning.repository.TopicRepository;
import com.linksinnovation.elearning.repository.UserDetailsRepository;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@RestController
@RequestMapping("/api/discussion")
public class DiscussionController {
    
    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private CourseRepositroy courseRepositroy;
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private ReplyRepository replyRepository;
    
    @RequestMapping(value = "/savetopic",method = RequestMethod.POST)
    public Course saveTopic(@RequestBody Map<String,String> params,@AuthenticationPrincipal String username){
        UserDetails user = userDetailsRepository.findOne(username.toUpperCase());
        Topic topic = new Topic();
        topic.setMessage(params.get("message"));
        topic.setUser(user);
        Course course = courseRepositroy.findOne(Long.parseLong(params.get("course")));
        course.addTopic(topic);
        courseRepositroy.save(course);
        return courseRepositroy.findOne(Long.parseLong(params.get("course")));
    }
    
    @RequestMapping(value = "/savereply",method = RequestMethod.POST)
    public Course saveReply(@RequestBody Map<String,String> params,@AuthenticationPrincipal String username){
        UserDetails user = userDetailsRepository.findOne(username.toUpperCase());
        Topic topic = topicRepository.findOne(Long.parseLong(params.get("topic")));
        Reply reply = new Reply();
        reply.setMessage(params.get("message"));
        reply.setUser(user);
        topic.addReply(reply);
        topicRepository.save(topic);
        return courseRepositroy.findOne(Long.parseLong(params.get("course")));
    }
    
    @PreAuthorize("hasAuthority('Super Administrator') or hasAuthority('Administrator')")
    @RequestMapping(value = "/delete/topic",method = RequestMethod.POST)
    public void deleteTopic(@RequestBody Map<String,Long> params){
        topicRepository.delete(params.get("id"));
    }
    
    @PreAuthorize("hasAuthority('Super Administrator') or hasAuthority('Administrator')")
    @RequestMapping(value = "/delete/answer",method = RequestMethod.POST)
    public void deleteAnswer(@RequestBody Map<String,Long> params){
        replyRepository.delete(params.get("id"));
    }
}
