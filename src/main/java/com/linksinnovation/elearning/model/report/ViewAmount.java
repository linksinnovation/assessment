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
public class ViewAmount {
    private String name;
    private String courseName;
    private BigInteger learningProgress;
    private BigInteger learningTotal;
    private Integer pass;
    private Integer total;
    private Date lastLearning;
    private Date lastTest;

    public ViewAmount(String name, String courseName, BigInteger learningProgress, BigInteger learningTotal, Integer pass, Integer total, Date lastLearning, Date lastTest) {
        this.name = name;
        this.courseName = courseName;
        this.learningProgress = learningProgress;
        this.learningTotal = learningTotal;
        this.pass = pass;
        this.total = total;
        this.lastLearning = lastLearning;
        this.lastTest = lastTest;
    }

    public String getName() {
        return name;
    }

    public String getCourseName() {
        return courseName;
    }

    public BigInteger getLearningProgress() {
        return learningProgress;
    }

    public BigInteger getLearningTotal() {
        return learningTotal;
    }

    public Integer getPass() {
        return pass;
    }

    public Integer getTotal() {
        return total;
    }

    public Date getLastLearning() {
        return lastLearning;
    }

    public Date getLastTest() {
        return lastTest;
    }
    
}
