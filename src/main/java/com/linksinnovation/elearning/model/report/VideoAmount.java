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
public class VideoAmount {
    private String courseId;
    private String course;
    private String categoryId;
    private String category;
    private String subCategoryId;
    private String subCategory;
    private Date updateDate;
    private BigInteger view;

    public VideoAmount(String courseId, String course, String categoryId, String category, String subCategoryId, String subCategory, Date updateDate, BigInteger view) {
        this.courseId = courseId;
        this.course = course;
        this.categoryId = categoryId;
        this.category = category;
        this.subCategoryId = subCategoryId;
        this.subCategory = subCategory;
        this.updateDate = updateDate;
        this.view = view;
    }

    public String getCourseId() {
        return courseId;
    }

    public String getCourse() {
        return course;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public String getCategory() {
        return category;
    }

    public String getSubCategoryId() {
        return subCategoryId;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public BigInteger getView() {
        return view;
    }

    
    
    
    
}
