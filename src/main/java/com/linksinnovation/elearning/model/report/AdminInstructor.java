/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.model.report;

import java.math.BigInteger;
import java.util.Date;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class AdminInstructor {
    private String name;
    private String title;
    private BigInteger view;
    private Integer quiz;
    private Date update_date;

    public AdminInstructor(String name, String title, BigInteger view, Integer quiz, Date update_date) {
        this.name = name;
        this.title = title;
        this.view = view;
        this.quiz = quiz;
        this.update_date = update_date;
    }

    public String getName() {
        return name;
    }

    public String getTitle() {
        return title;
    }

    public BigInteger getView() {
        return view;
    }

    public Integer getQuiz() {
        return quiz;
    }

    public Date getUpdate_date() {
        return update_date;
    }
    
    
    
}
