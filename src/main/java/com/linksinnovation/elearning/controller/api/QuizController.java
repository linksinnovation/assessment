/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.controller.api;

import com.linksinnovation.elearning.dto.AnswerDTO;
import com.linksinnovation.elearning.dto.ResultDTO;
import com.linksinnovation.elearning.model.Answer;
import com.linksinnovation.elearning.model.Course;
import com.linksinnovation.elearning.model.Quiz;
import com.linksinnovation.elearning.model.QuizScore;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.repository.AnswerRepository;
import com.linksinnovation.elearning.repository.CourseRepositroy;
import com.linksinnovation.elearning.repository.QuizRepository;
import com.linksinnovation.elearning.repository.QuizScoreRepository;
import com.linksinnovation.elearning.repository.UserDetailsRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Autowired
    private CourseRepositroy courseRepositroy;
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private QuizScoreRepository quizScoreRepository;

    @PreAuthorize("hasAuthority('Super Administrator') or hasAuthority('Administrator') or hasAuthority('Instructor')")
    @RequestMapping(value = "/{courseId}", method = RequestMethod.POST)
    public Course save(@PathVariable("courseId") Long courseId, @RequestBody Quiz quiz) {
        if (quiz.getId() != null) {
            Course course = courseRepositroy.findOne(courseId);
            quiz.setCourse(course);
            quizRepository.save(quiz);
            return courseRepositroy.findOne(courseId);
        } else {
            Course course = courseRepositroy.findOne(courseId);
            course.addQuiz(quiz);
            return courseRepositroy.save(course);
        }
    }
    
    @PreAuthorize("hasAuthority('Super Administrator') or hasAuthority('Administrator') or hasAuthority('Instructor')")
    @RequestMapping(value = "/{courseId}",method = RequestMethod.DELETE)
    public Course delete(@PathVariable("courseId") Long courseId,@RequestBody Quiz quiz){
        Course course = courseRepositroy.findOne(courseId);
        course.getQuizzes().remove(quiz);
        return courseRepositroy.save(course);
    }
    
    @RequestMapping(value = "/check/{courseId}",method = RequestMethod.POST)
    public List<ResultDTO> check(@PathVariable("courseId") Long courseId,@RequestBody List<AnswerDTO> answerDTOs,@AuthenticationPrincipal String username){
        List<ResultDTO> resultDTOs = new ArrayList<>();
        UserDetails userDetails = userDetailsRepository.findOne(username);
        Course course = courseRepositroy.findOne(courseId);
        int count = 0;
        for(AnswerDTO answerDTO : answerDTOs){
            Quiz quiz = quizRepository.findOne(answerDTO.getQuiz());
            Answer answer = answerRepository.findOne(answerDTO.getAnswer());
            ResultDTO resultDTO = new ResultDTO(quiz.getQuestion(),answer.getAnswer(),answer.isChecked());
            if(answer.isChecked()){
                count++;
            }
            resultDTOs.add(resultDTO);
        }
        Optional<QuizScore> qs = quizScoreRepository.findByUserAndCourse(userDetails, course);
        QuizScore quizScore;
        if(qs.isPresent()){
            quizScore = qs.get();
        }else{
            quizScore = new QuizScore();
        }
        quizScore.setPass(count);
        quizScore.setTotal(resultDTOs.size());
        quizScore.setUser(userDetails);
        quizScore.setCourse(course);
        quizScore.setUpdateDate(new Date());
        quizScoreRepository.save(quizScore);
        return resultDTOs;
    }
    
    @RequestMapping(value = "/score/{courseId}",method = RequestMethod.GET)
    public QuizScore getScore(@PathVariable("courseId") Long courseId,@AuthenticationPrincipal String username){
        UserDetails userDetails = userDetailsRepository.findOne(username);
        Course course = courseRepositroy.findOne(courseId);
        Optional<QuizScore> quizscore = quizScoreRepository.findByUserAndCourse(userDetails, course);
        if(quizscore.isPresent()){
            return quizscore.get();
        }else{
            return null;
        }
    }
}
