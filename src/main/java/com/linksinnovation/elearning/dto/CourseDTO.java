/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.dto;

import java.math.BigInteger;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class CourseDTO {
    private BigInteger id;
    private String title;

    public CourseDTO(BigInteger id, String title) {
        this.id = id;
        this.title = title;
    }

    public BigInteger getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }
    
    
}
