package com.linksinnovation.elearning.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */

@Entity
public class Menu {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String url;
    private String icon;
    private String color;
    @Column(nullable = false)
    private Double ordered = 999999D;

    @ManyToOne
    @JoinColumn(name = "PARENT_ID")
    @JsonBackReference
    private Menu parent;

    @JsonManagedReference
    @OrderBy("ordered ASC")
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Menu> childs;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Double getOrdered() {
        return ordered;
    }

    public void setOrdered(Double ordered) {
        this.ordered = ordered;
    }

    public Menu getParent() {
        return parent;
    }

    public void setParent(Menu parent) {
        this.parent = parent;
    }

    public List<Menu> getChilds() {
        return childs;
    }

    public void setChilds(List<Menu> childs) {
        this.childs = childs;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @PrePersist
    private void updateParent() {
        if (this.getChilds() != null) {
            for (Menu menu : this.getChilds()) {
                menu.setParent(this);
            }
        }
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Menu menu = (Menu) o;

        return id != null ? id.equals(menu.id) : menu.id == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
