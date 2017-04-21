/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.repository;

import com.linksinnovation.elearning.dto.BasicConditionDTO;
import com.linksinnovation.elearning.model.report.ViewAmount;
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
public class ViewAmountRepository {
    @PersistenceContext
    private EntityManager em;
    
    private static final String queryString = "SELECT name_en,course_name,learning_progress,learning_total,pass,total,last_learning,last_test FROM report_amount_view";
    
    public List<ViewAmount> findByCondition(BasicConditionDTO amountDTO){
        if(null == amountDTO.getCategory() && null == amountDTO.getStart()){
            String queryAppend = queryString+" ORDER BY last_learning,name_en ASC";
            Query query = em.createNativeQuery(queryAppend);
            List<Object[]> resultList = query.getResultList();
            return mapObject(resultList);
        }else if(null != amountDTO.getCategory() && null == amountDTO.getStart()){
            String queryAppend = queryString+" WHERE category_id=:cat";
            if(null != amountDTO.getSubCategory()){
                queryAppend = queryAppend+" AND sub_category_id=:subcat";
            }
            queryAppend = queryAppend+" ORDER BY last_learning,name_en ASC";
            Query query = em.createNativeQuery(queryAppend);
            query.setParameter("cat", amountDTO.getCategory());
            if(null != amountDTO.getSubCategory()){
                query.setParameter("subcat", amountDTO.getSubCategory());
            }
            List<Object[]> resultList = query.getResultList();
            return mapObject(resultList);
        }else if(null != amountDTO.getCategory() && null != amountDTO.getStart() && null != amountDTO.getEnd()){
            String queryAppend = queryString+" WHERE last_learning BETWEEN :start AND :end AND category_id=:cat";
            if(null != amountDTO.getSubCategory()){
                queryAppend = queryAppend+" AND sub_category_id=:subcat";
            }
            queryAppend = queryAppend+" ORDER BY last_learning,name_en ASC";
            Query query = em.createNativeQuery(queryAppend);
            query.setParameter("start", amountDTO.getStart());
            query.setParameter("end", amountDTO.getEnd());
            query.setParameter("cat", amountDTO.getCategory());
            
            if(null != amountDTO.getSubCategory()){
                query.setParameter("subcat", amountDTO.getSubCategory());
            }
            List<Object[]> resultList = query.getResultList();
            return mapObject(resultList);
        }else if(null == amountDTO.getCategory() && null != amountDTO.getStart() && null != amountDTO.getEnd()){
            String queryAppend = queryString+" WHERE last_learning BETWEEN :start AND :end";
            queryAppend = queryAppend+" ORDER BY last_learning,name_en ASC";
            Query query = em.createNativeQuery(queryAppend);
            query.setParameter("start", amountDTO.getStart());
            query.setParameter("end", amountDTO.getEnd());
            List<Object[]> resultList = query.getResultList();
            return mapObject(resultList);
        }else{
            String queryAppend = queryString+" ORDER BY last_learning,name_en ASC";
            Query query = em.createNativeQuery(queryAppend);
            List<Object[]> resultList = query.getResultList();
            return mapObject(resultList);
        }
    }

    private List<ViewAmount> mapObject(List<Object[]> resultList) {
        List<ViewAmount> viewAmounts = new ArrayList<>();
        resultList.stream().map((o) -> new ViewAmount(o[0].toString(),o[1].toString(),(BigInteger)o[2],(BigInteger)o[3],(Integer)o[4],(Integer)o[5],(Date)o[6],(Date)o[7])).forEach((videoAmount) -> {
            viewAmounts.add(videoAmount);
        });
        return viewAmounts;
    }
}
