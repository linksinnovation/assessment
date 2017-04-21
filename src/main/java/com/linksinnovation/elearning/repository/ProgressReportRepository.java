/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.linksinnovation.elearning.repository;

import com.linksinnovation.elearning.dto.QuizConditionDTO;
import com.linksinnovation.elearning.model.report.ProgressReport;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
@Repository
public class ProgressReportRepository {

    @PersistenceContext
    private EntityManager em;

    private static final String query = "select name,course,pass,total,view,total_lecture from report_progress where creator=:creator";
    private static final String queryUser = "select name,course,pass,total,view,total_lecture from report_progress where username=:username";

    public List<ProgressReport> findReport(QuizConditionDTO conditionDTO, String username) {
        if (null != conditionDTO.getCategory()) {
            String queryString = query + " AND category_id=:cat";
            if (null != conditionDTO.getSubcategory()) {
                queryString = queryString + " AND sub_category_id=:subcat";
            }
            if (null != conditionDTO.getCourse()) {
                queryString = queryString + " AND course_id=:course";
            }
            if (null != conditionDTO.getStart() && null != conditionDTO.getEnd()) {
                queryString = queryString + " AND update_date BETWEEN :start AND :end";
            }
            queryString = queryString + " ORDER BY course_id,name ASC";

            Query q = em.createNativeQuery(queryString);
            q.setParameter("cat", conditionDTO.getCategory());
            q.setParameter("creator", username);
            if (null != conditionDTO.getSubcategory()) {
                q.setParameter("subcat", conditionDTO.getSubcategory());
            }
            if (null != conditionDTO.getCourse()) {
                q.setParameter("course", conditionDTO.getCourse());
            }
            if (null != conditionDTO.getStart() && null != conditionDTO.getEnd()) {
                q.setParameter("start", conditionDTO.getStart());
                q.setParameter("end", conditionDTO.getEnd());
            }
            return mapObject(q.getResultList());
        } else if (null == conditionDTO.getCategory()) {
            String queryString = query;
            if (null != conditionDTO.getStart() && null != conditionDTO.getEnd()) {
                queryString = queryString + " AND update_date BETWEEN :start AND :end";
            }
            queryString = queryString + " ORDER BY course_id,name ASC";
            Query q = em.createNativeQuery(queryString);
            q.setParameter("creator", username);
            if (null != conditionDTO.getStart() && null != conditionDTO.getEnd()) {
                q.setParameter("start", conditionDTO.getStart());
                q.setParameter("end", conditionDTO.getEnd());
            }
            return mapObject(q.getResultList());
        } else {
            String queryString = query + " ORDER BY course_id,name ASC";
            Query q = em.createNativeQuery(queryString);
            q.setParameter("creator", username);
            return mapObject(q.getResultList());
        }
    }

    public List<ProgressReport> findUserReport(QuizConditionDTO conditionDTO, String username) {
        if (null != conditionDTO.getCategory()) {
            String queryString = queryUser + " AND category_id=:cat";
            if (null != conditionDTO.getSubcategory()) {
                queryString = queryString + " AND sub_category_id=:subcat";
            }
            if (null != conditionDTO.getCourse()) {
                queryString = queryString + " AND course_id=:course";
            }
            if (null != conditionDTO.getStart() && null != conditionDTO.getEnd()) {
                queryString = queryString + " AND update_date BETWEEN :start AND :end";
            }
            queryString = queryString + " ORDER BY course_id,name ASC";

            Query q = em.createNativeQuery(queryString);
            q.setParameter("cat", conditionDTO.getCategory());
            q.setParameter("username", username);
            if (null != conditionDTO.getSubcategory()) {
                q.setParameter("subcat", conditionDTO.getSubcategory());
            }
            if (null != conditionDTO.getCourse()) {
                q.setParameter("course", conditionDTO.getCourse());
            }
            if (null != conditionDTO.getStart() && null != conditionDTO.getEnd()) {
                q.setParameter("start", conditionDTO.getStart());
                q.setParameter("end", conditionDTO.getEnd());
            }
            return mapObject(q.getResultList());
        } else if (null == conditionDTO.getCategory()) {
            String queryString = queryUser;
            if (null != conditionDTO.getStart() && null != conditionDTO.getEnd()) {
                queryString = queryString + " AND update_date BETWEEN :start AND :end";
            }
            queryString = queryString + " ORDER BY course_id,name ASC";
            Query q = em.createNativeQuery(queryString);
            q.setParameter("username", username);
            if (null != conditionDTO.getStart() && null != conditionDTO.getEnd()) {
                q.setParameter("start", conditionDTO.getStart());
                q.setParameter("end", conditionDTO.getEnd());
            }
            return mapObject(q.getResultList());
        } else {
            String queryString = queryUser + " ORDER BY course_id,name ASC";
            Query q = em.createNativeQuery(queryString);
            q.setParameter("username", username);
            return mapObject(q.getResultList());
        }
    }

    private List<ProgressReport> mapObject(List<Object[]> resultList) {
        List<ProgressReport> instructorReports = new ArrayList<>();
        for (Object[] o : resultList) {
            instructorReports.add(new ProgressReport("" + o[0], "" + o[1], (Integer) o[2], (Integer) o[3], (BigInteger) o[4], (BigInteger) o[5]));
        }
        return instructorReports;
    }
}
