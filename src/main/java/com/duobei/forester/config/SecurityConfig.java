package com.duobei.forester.config;

import com.duobei.forester.security.UserAuthorizingRealm;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.mgt.WebSecurityManager;
import org.apache.shiro.web.session.mgt.ServletContainerSessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * [description]
 *
 * @author faith
 * @since 0.0.1
 */
@Configuration
public class SecurityConfig {

    @Autowired
    private UserAuthorizingRealm userAuthorizingRealm;

    @Bean
    public WebSecurityManager webSecurityManager() {
        DefaultWebSecurityManager webSecurityManager = new DefaultWebSecurityManager();
        webSecurityManager.setRealm(userAuthorizingRealm);

        webSecurityManager.setSessionManager(sessionManager());

        return webSecurityManager;
    }

    @Bean
    public SessionManager sessionManager() {
        SessionManager sessionManager = new ServletContainerSessionManager();

        return sessionManager;
    }

    @Bean
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        LifecycleBeanPostProcessor lifecycleBeanPostProcessor = new LifecycleBeanPostProcessor();
        return lifecycleBeanPostProcessor;
    }

    @Bean(name = "shiroFilter")
    public ShiroFilterFactoryBean shiroFilter() {
        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(webSecurityManager());
//        shiroFilter.setLoginUrl();
//        shiroFilter.setUnauthorizedUrl();
//        shiroFilter.setFilterChainDefinitionMap();

        return shiroFilter;
    }
}
