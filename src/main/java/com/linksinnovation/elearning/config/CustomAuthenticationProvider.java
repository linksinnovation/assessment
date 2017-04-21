package com.linksinnovation.elearning.config;

import com.linksinnovation.elearning.model.Authority;
import com.linksinnovation.elearning.model.UserDetails;
import com.linksinnovation.elearning.model.authen.Authen;
import com.linksinnovation.elearning.model.authen.UserInfo;
import com.linksinnovation.elearning.model.enumuration.UserType;
import com.linksinnovation.elearning.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;

/**
 * @author Jirawong Wongdokpuang <jiraowng@linksinnovation.com>
 */
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (iserviceAuthen(authentication)) {
            UserDetails findOne = userDetailsRepository.findOne(authentication.getName().toUpperCase());
            List<GrantedAuthority> grantedAuths;
            if (findOne != null) {
                grantedAuths = (List<GrantedAuthority>) findOne.getAuthorities();
            } else {
                grantedAuths = new ArrayList<>();
                grantedAuths.add(new SimpleGrantedAuthority("User"));
            }
            Authentication auth = new UsernamePasswordAuthenticationToken(authentication.getName(), authentication.getCredentials().toString(), grantedAuths);
            return auth;
        } else {
            return null;
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    private boolean iserviceAuthen(Authentication authentication) {
        RestTemplate rest = new RestTemplate();
        Map<String, String> map = new HashMap<>();
        map.put("username", authentication.getName());
        map.put("password", authentication.getCredentials().toString());

        ResponseEntity<Authen> postForEntity = null;
        if (!mockAuthen(authentication.getCredentials().toString())) {
            postForEntity = rest.postForEntity("http://iservice.mitrphol.com/iAuthen/rest/authenInfo/Authen", map, Authen.class);
        }

        if (mockAuthen(authentication.getCredentials().toString()) || postForEntity.getBody().getResults().get(0).isAuthenStatus()) {
            ResponseEntity<UserInfo> forEntity = rest.getForEntity("http://iservice.mitrphol.com/iHR/rest/personal/GetMitrpholEmployee/APPTIVIDIA_DEV/" + authentication.getName(), UserInfo.class);
            if (forEntity.getBody().getResults().size() > 0) {
                UserDetails user = forEntity.getBody().getResults().get(0);
                UserDetails findOne = userDetailsRepository.findOne(user.getUsername());
                if (findOne != null) {
                    user.setAvatar(findOne.getAvatar());
                    user.setInstructor(findOne.getInstructor());
                    user.setAuthorities((List<Authority>) findOne.getAuthorities());
                } else {
                    Authority authority = new Authority("User");
                    user.addAuthority(authority);
                }
                user.setType(UserType.ISERVICE);
                userDetailsRepository.save(user);
                return true;
            }
        }

        return false;
    }

    /**
     * 
     * @param pass
     * @return 
     * 
     * Mock Password Remove it in production
     * 
     */
    private boolean mockAuthen(String pass) {
        return pass.equals("p@ss2015");
    }
}
