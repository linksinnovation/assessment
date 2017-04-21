/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.model.authen;

import com.linksinnovation.elearning.model.UserDetails;
import java.util.List;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class UserInfo {
    private String outputCode;
    private List<UserDetails> results;

    public String getOutputCode() {
        return outputCode;
    }

    public void setOutputCode(String outputCode) {
        this.outputCode = outputCode;
    }

    public List<UserDetails> getResults() {
        return results;
    }

    public void setResults(List<UserDetails> results) {
        this.results = results;
    }
    
    
}
