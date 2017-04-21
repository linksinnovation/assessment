/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.utils.time;

import java.util.concurrent.TimeUnit;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class TimeConvert {
    private TimeConvert(){}
    
    public static String fromMilisec(Long millis){
        StringBuilder sb = new StringBuilder();
        sb.append(TimeUnit.MILLISECONDS.toMinutes(millis));
        sb.append(":");
        sb.append(TimeUnit.MILLISECONDS.toSeconds(millis) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(millis)));
        return sb.toString();
    }
}
