/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.model.authen;

import java.util.List;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class Authen {
    private String outputCode;
    private List<AuthenResult> results;

    public String getOutputCode() {
        return outputCode;
    }

    public void setOutputCode(String outputCode) {
        this.outputCode = outputCode;
    }

    public List<AuthenResult> getResults() {
        return results;
    }

    public void setResults(List<AuthenResult> results) {
        this.results = results;
    }
    
    
}
