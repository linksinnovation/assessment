/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.model.report;

import java.math.BigInteger;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class ProgressReport {
    private String name;
    private String course;
    private Integer pass;
    private Integer total;
    private BigInteger view;
    private BigInteger totalLecture;

    public ProgressReport(String name, String course, Integer pass, Integer total, BigInteger view, BigInteger totalLecture) {
        this.name = name;
        this.course = course;
        this.pass = pass;
        this.total = total;
        this.view = view;
        this.totalLecture = totalLecture;
    }

    public String getName() {
        return name;
    }

    public String getCourse() {
        return course;
    }

    public Integer getPass() {
        return pass;
    }

    public Integer getTotal() {
        return total;
    }

    public BigInteger getView() {
        return view;
    }

    public BigInteger getTotalLecture() {
        return totalLecture;
    }
    
    
}
