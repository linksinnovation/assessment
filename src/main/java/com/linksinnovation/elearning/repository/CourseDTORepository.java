/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.repository;

import com.linksinnovation.elearning.dto.CourseDTO;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@Repository
public class CourseDTORepository {
    @PersistenceContext
    private EntityManager em;
    
    private static final String query = "SELECT id,title FROM course";
    
    public List<CourseDTO> findAll(){
        String queryString = query+" WHERE status = 'PUBLISH'";
        Query q = em.createNativeQuery(queryString);
        return mapObject(q.getResultList());
    }

    public List<CourseDTO> findByCategory(Map<String, Long> map) {
        List<Object[]> result;
        if(null != map.get("category")){
            String queryString  = query+" WHERE category_id=:cat";
            if(null != map.get("subcategory")){
                queryString = queryString+" AND sub_category_id=:subcat";
            }
            Query q = em.createNativeQuery(queryString);
            q.setParameter("cat", map.get("category"));
            if(null != map.get("subcategory")){
                q.setParameter("subcat", map.get("subcategory"));
            }
            result = q.getResultList();
        }else{
            result = Collections.EMPTY_LIST;
        }
        return mapObject(result);
    }
    
    private List<CourseDTO> mapObject(List<Object[]> result){
        List<CourseDTO> courseDTOs = new ArrayList<>();
        result.stream().forEach((o) -> {
            courseDTOs.add(new CourseDTO((BigInteger)o[0], ""+o[1]));
        });
        return courseDTOs;
    }
}
