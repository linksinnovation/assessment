/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.model.report;

import java.util.Date;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class QuizReport {
    private String course;
    private String name;
    private Integer pass;
    private Integer total;
    private Date updateDate;

    public QuizReport(String course, String name, Integer pass, Integer total,Date updateDate) {
        this.course = course;
        this.name = name;
        this.pass = pass;
        this.total = total;
        this.updateDate = updateDate;
    }

    public String getCourse() {
        return course;
    }

    public String getName() {
        return name;
    }

    public Integer getPass() {
        return pass;
    }

    public Integer getTotal() {
        return total;
    }

    public Date getUpdateDate() {
        return updateDate;
    }
    
    
}
