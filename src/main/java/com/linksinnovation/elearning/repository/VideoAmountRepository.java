/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.repository;

import com.linksinnovation.elearning.dto.BasicConditionDTO;
import com.linksinnovation.elearning.model.report.VideoAmount;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@Repository
public class VideoAmountRepository {
    @PersistenceContext
    private EntityManager em;
    
    private static final String queryString = "SELECT course_id,course,category_id,category,sub_category_id,sub_category,update_date,view FROM report_amount_video";
    
    public List<VideoAmount> findAll(){
        Query query = em.createNativeQuery(queryString);
        List<Object[]> resultList = query.getResultList();
        return mapObject(resultList);
    }
    
    public List<VideoAmount> findByCondition(BasicConditionDTO amountDTO){
        if(null == amountDTO.getCategory() && null == amountDTO.getStart()){
            Query query = em.createNativeQuery(queryString+" ORDER BY update_date ASC");
            List<Object[]> resultList = query.getResultList();
            return mapObject(resultList);
        }else if(null != amountDTO.getCategory() && null == amountDTO.getStart()){
            String queryAppend = queryString+" WHERE category_id=:cat";
            if(null != amountDTO.getSubCategory()){
                queryAppend = queryAppend+" AND sub_category_id=:subcat";
            }
            Query query = em.createNativeQuery(queryAppend+" ORDER BY update_date ASC");
            query.setParameter("cat", amountDTO.getCategory());
            if(null != amountDTO.getSubCategory()){
                query.setParameter("subcat", amountDTO.getSubCategory());
            }
            List<Object[]> resultList = query.getResultList();
            return mapObject(resultList);
        }else if(null != amountDTO.getCategory() && null != amountDTO.getStart() && null != amountDTO.getEnd()){
            String queryAppend = queryString+" WHERE update_date BETWEEN :start AND :end AND category_id=:cat";
            if(null != amountDTO.getSubCategory()){
                queryAppend = queryAppend+" AND sub_category_id=:subcat";
            }
            Query query = em.createNativeQuery(queryAppend+" ORDER BY update_date ASC");
            query.setParameter("start", amountDTO.getStart());
            query.setParameter("end", amountDTO.getEnd());
            query.setParameter("cat", amountDTO.getCategory());
            
            if(null != amountDTO.getSubCategory()){
                query.setParameter("subcat", amountDTO.getSubCategory());
            }
            List<Object[]> resultList = query.getResultList();
            return mapObject(resultList);
        }else if(null == amountDTO.getCategory() && null != amountDTO.getStart() && null != amountDTO.getEnd()){
            String queryAppend = queryString+" WHERE update_date BETWEEN :start AND :end";
            Query query = em.createNativeQuery(queryAppend +" ORDER BY update_date ASC");
            query.setParameter("start", amountDTO.getStart());
            query.setParameter("end", amountDTO.getEnd());
            List<Object[]> resultList = query.getResultList();
            return mapObject(resultList);
        }else{
            Query query = em.createNativeQuery(queryString+" ORDER BY update_date ASC");
            List<Object[]> resultList = query.getResultList();
            return mapObject(resultList);
        }
    }

    private List<VideoAmount> mapObject(List<Object[]> resultList) {
        List<VideoAmount> videoAmounts = new ArrayList<>();
        resultList.stream().map((o) -> new VideoAmount(o[0].toString(), o[1].toString(), o[2].toString(), o[3].toString(), ""+o[4], ""+o[5], (Date)o[6],(BigInteger)o[7])).forEach((videoAmount) -> {
            videoAmounts.add(videoAmount);
        });
        return videoAmounts;
    }
}
