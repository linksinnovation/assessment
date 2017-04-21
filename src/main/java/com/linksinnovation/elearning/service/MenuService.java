package com.linksinnovation.elearning.service;

import com.linksinnovation.elearning.model.Menu;
import com.linksinnovation.elearning.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
@Service
@Transactional
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    public List<Menu> update(List<Menu> menus){
        menuRepository.save(menus);
        List<Menu> menuList = menuRepository.findByParentIsNullOrderByOrderedAsc();
        menuList.removeAll(menus);
        menuRepository.delete(menuList);
        return menuRepository.findAll();
    }
}
