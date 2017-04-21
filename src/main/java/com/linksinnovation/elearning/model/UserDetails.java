package com.linksinnovation.elearning.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.linksinnovation.elearning.model.enumuration.UserType;
import java.util.ArrayList;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
@Entity
public class UserDetails implements org.springframework.security.core.userdetails.UserDetails {

    @Id
    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserType type;
    private String eesgName;
    private String personalPaId;
    private String personalPsaName;
    private String nameEn;
    private String personalPsaId;
    private String personalPaName;
    private String eesgId;
    private String foa;
    private String email;
    private String attorneyName;
    private String actOrgNameTh;
    private String eegName;
    private String positionId;
    private String positionEn;
    private String lnameTh;
    private String personalId;
    private String positionTh;
    private String actOrgID;
    private String fnameTh;
    private String eegId;
    private String actOrgNameEn;
    private String attorneyId;
    @Column(nullable = false)
    private String avatar = "default.png";
    @Column(length = 4000)
    private String instructor;
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Wishlist> wishlists;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Authority> authorities;

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
    public void setUserName(String username){
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(List<Authority> authorities) {
        this.authorities = authorities;
    }
    
    public void setAuthority(Authority authority){
        this.authorities = new ArrayList<>();
        this.authorities.add(authority);
    }
    
    public void addAuthority(Authority authority){
        if(this.authorities == null){
            this.authorities = new ArrayList<>();
        }
        this.authorities.add(authority);
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEesgName() {
        return eesgName;
    }

    public void setEesgName(String eesgName) {
        this.eesgName = eesgName;
    }

    public String getPersonalPaId() {
        return personalPaId;
    }

    public void setPersonalPaId(String personalPaId) {
        this.personalPaId = personalPaId;
    }

    public String getPersonalPsaName() {
        return personalPsaName;
    }

    public void setPersonalPsaName(String personalPsaName) {
        this.personalPsaName = personalPsaName;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getPersonalPsaId() {
        return personalPsaId;
    }

    public void setPersonalPsaId(String personalPsaId) {
        this.personalPsaId = personalPsaId;
    }

    public String getPersonalPaName() {
        return personalPaName;
    }

    public void setPersonalPaName(String personalPaName) {
        this.personalPaName = personalPaName;
    }

    public String getEesgId() {
        return eesgId;
    }

    public void setEesgId(String eesgId) {
        this.eesgId = eesgId;
    }

    public String getFoa() {
        return foa;
    }

    public void setFoa(String foa) {
        this.foa = foa;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAttorneyName() {
        return attorneyName;
    }

    public void setAttorneyName(String attorneyName) {
        this.attorneyName = attorneyName;
    }

    public String getActOrgNameTh() {
        return actOrgNameTh;
    }

    public void setActOrgNameTh(String actOrgNameTh) {
        this.actOrgNameTh = actOrgNameTh;
    }

    public String getEegName() {
        return eegName;
    }

    public void setEegName(String eegName) {
        this.eegName = eegName;
    }

    public String getPositionId() {
        return positionId;
    }

    public void setPositionId(String positionId) {
        this.positionId = positionId;
    }

    public String getPositionEn() {
        return positionEn;
    }

    public void setPositionEn(String positionEn) {
        this.positionEn = positionEn;
    }

    public String getLnameTh() {
        return lnameTh;
    }

    public void setLnameTh(String lnameTh) {
        this.lnameTh = lnameTh;
    }

    public String getPersonalId() {
        return personalId;
    }

    public void setPersonalId(String personalId) {
        this.personalId = personalId;
    }

    public String getPositionTh() {
        return positionTh;
    }

    public void setPositionTh(String positionTh) {
        this.positionTh = positionTh;
    }

    public String getActOrgID() {
        return actOrgID;
    }

    public void setActOrgID(String actOrgID) {
        this.actOrgID = actOrgID;
    }

    public String getFnameTh() {
        return fnameTh;
    }

    public void setFnameTh(String fnameTh) {
        this.fnameTh = fnameTh;
    }

    public String getEegId() {
        return eegId;
    }

    public void setEegId(String eegId) {
        this.eegId = eegId;
    }

    public String getActOrgNameEn() {
        return actOrgNameEn;
    }

    public void setActOrgNameEn(String actOrgNameEn) {
        this.actOrgNameEn = actOrgNameEn;
    }

    public String getAttorneyId() {
        return attorneyId;
    }

    public void setAttorneyId(String attorneyId) {
        this.attorneyId = attorneyId;
    }

    public UserType getType() {
        return type;
    }

    public void setType(UserType type) {
        this.type = type;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public List<Wishlist> getWishlists() {
        return wishlists;
    }

    public void setWishlists(List<Wishlist> wishlists) {
        this.wishlists = wishlists;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 53 * hash + Objects.hashCode(this.username);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final UserDetails other = (UserDetails) obj;
        if (!Objects.equals(this.username, other.username)) {
            return false;
        }
        return true;
    }
    
    
    
}
