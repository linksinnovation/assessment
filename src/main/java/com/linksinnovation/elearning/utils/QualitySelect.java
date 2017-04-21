/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.utils;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class QualitySelect {

    private QualitySelect() {
    }

    public static Integer select(String quality) {
        Integer selectQuality = Integer.parseInt(quality);
        if (selectQuality >= 1080) {
            return 1080;
        } else if (selectQuality >= 720) {
            return 720;
        } else if (selectQuality >= 480) {
            return 480;
        } else {
            return 320;
        }
    }

    public static List<String> listQuality(String quality) {
        Integer selectQuality = Integer.parseInt(quality);
        List<String> qualities = new ArrayList<>();
        if (selectQuality >= 1080) {
            qualities.add("1080");
        }
        if (selectQuality >= 720) {
            qualities.add("720");
        }
        if (selectQuality >= 480) {
            qualities.add("480");
        }
        qualities.add("320");
        return qualities;
    }

}
