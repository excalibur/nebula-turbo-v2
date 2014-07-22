package com.duobei.forester.config;

import com.duobei.forester.security.UserAuthorizingRealm;
import com.duobei.forester.service.impl.UserServiceImpl;
import org.apache.shiro.crypto.hash.DefaultHashService;
import org.apache.shiro.crypto.hash.Sha1Hash;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.util.SimpleByteSource;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.filter.authc.PassThruAuthenticationFilter;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.mgt.WebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.apache.shiro.web.session.mgt.ServletContainerSessionManager;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

import javax.servlet.Filter;
import java.util.HashMap;
import java.util.Map;

/**
 * [description]
 *
 * @author faith
 * @since 0.0.1
 */
@Configuration
public class SecurityConfig {

    public static final String PrivateSaltString = "duobei";

    @Bean
    public WebSecurityManager webSecurityManager(UserAuthorizingRealm userAuthorizingRealm) {
        DefaultWebSecurityManager webSecurityManager = new DefaultWebSecurityManager();
        webSecurityManager.setRealm(userAuthorizingRealm);

        webSecurityManager.setSessionManager(sessionManager());

        return webSecurityManager;
    }

    @Bean
    public SessionManager sessionManager() {
        SessionManager sessionManager = new DefaultWebSessionManager();
        return sessionManager;
    }

    @Bean
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        LifecycleBeanPostProcessor lifecycleBeanPostProcessor = new LifecycleBeanPostProcessor();
        return lifecycleBeanPostProcessor;
    }

    @Bean
    @DependsOn(value = "lifecycleBeanPostProcessor")
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator autoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        autoProxyCreator.setProxyTargetClass(true);
        return autoProxyCreator;
    }

    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(WebSecurityManager webSecurityManager) {
        AuthorizationAttributeSourceAdvisor advisor = new AuthorizationAttributeSourceAdvisor();
        advisor.setSecurityManager(webSecurityManager);
        return advisor;
    }

    @Bean(name = "shiroFilter")
    public ShiroFilterFactoryBean shiroFilter(WebSecurityManager webSecurityManager, @Value("${login.url}") String loginUrl,
                                              @Value("${unauthorized.url}") String unauthorizedUrl,
                                              @Value("${logout.url}") String logoutUrl,
                                              @Value("${assets.url}") String assetsUrl) {
        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(webSecurityManager);

        shiroFilter.setLoginUrl(loginUrl);
        shiroFilter.setUnauthorizedUrl(unauthorizedUrl);


        Map<String, String> filterChainDefinitionMap = new HashMap<>();
        filterChainDefinitionMap.put(loginUrl, "authc");
        filterChainDefinitionMap.put(unauthorizedUrl, "anon");
        filterChainDefinitionMap.put(assetsUrl, "anon");
        filterChainDefinitionMap.put(logoutUrl, "logout");

        filterChainDefinitionMap.put("/**", "user");

        shiroFilter.setFilterChainDefinitionMap(filterChainDefinitionMap);




        return shiroFilter;
    }

    @Bean
    public DefaultHashService defaultHashService(){
        DefaultHashService hashService = new DefaultHashService();
        hashService.setHashAlgorithmName("SHA-1");
        hashService.setHashIterations(1024);
        //私盐，默认无
        hashService.setPrivateSalt(new SimpleByteSource(PrivateSaltString));
        //是否生成公盐，默认false
        hashService.setGeneratePublicSalt(true);
        return hashService;
    }
}
