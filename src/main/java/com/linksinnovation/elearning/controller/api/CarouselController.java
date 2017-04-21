/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.controller.api;

import com.linksinnovation.elearning.dto.CourseDTO;
import com.linksinnovation.elearning.model.Carousel;
import com.linksinnovation.elearning.repository.CarouselRepository;
import com.linksinnovation.elearning.repository.CourseDTORepository;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
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
@RequestMapping("/api/carousel")
public class CarouselController {

    @Autowired
    private CourseDTORepository courseDTORepository;
    @Autowired
    private CarouselRepository carouselRepository;

    @RequestMapping(value = "/course", method = RequestMethod.GET)
    public List<CourseDTO> listCourse() {
        return courseDTORepository.findAll();
    }
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Carousel> get(){
        return carouselRepository.findAll();
    }
    
    @PreAuthorize("hasAuthority('Super Administrator')")
    @RequestMapping(value= "/{id}" ,method = RequestMethod.GET)
    public Carousel get(@PathVariable("id") Long id){
        return carouselRepository.findOne(id);
    }
    
    @PreAuthorize("hasAuthority('Super Administrator')")
    @RequestMapping(value= "/{id}" ,method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id){
        carouselRepository.delete(id);
    }
    
    @PreAuthorize("hasAuthority('Super Administrator')")
    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public List<Carousel> create(){
        Carousel carousel = new Carousel();
        carousel.setImages("example.png");
        carouselRepository.save(carousel);
        return carouselRepository.findAll();
    }

    @PreAuthorize("hasAuthority('Super Administrator')")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Carousel save(@RequestParam("id") Long id,@RequestParam("course") Long course, @RequestParam(value="name",required = false) String name, @RequestParam(value="file",required = false) MultipartFile file) throws Exception {
        Carousel carousel = carouselRepository.findOne(id);
        if(null != file){
            String fileName = carousel.getId()+"-"+name;
            byte[] bytes = file.getBytes();
            try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File("/mnt/data/images/slide/" + fileName)))) {
                stream.write(bytes);
            }
            carousel.setImages(fileName);
        }
        carousel.setCourse(course);
        return carouselRepository.save(carousel);
    }
}
