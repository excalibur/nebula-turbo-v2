package com.duobei.forester.security;

import com.duobei.forester.core.domain.User;
import com.duobei.forester.dao.UserRepository;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.crypto.hash.DefaultHashService;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.joda.time.DateTime;
import org.joda.time.Period;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.io.Serializable;

/**
 * [description]
 *
 * @author faith
 * @since 0.0.1
 */
@Service
@Transactional
public class UserAuthorizingRealm extends AuthorizingRealm {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DefaultHashService defaultHashService;

    /**
     * 授权
     * @param principals
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {


        System.out.println("=============授权==========");
        return null;
    }

    /**
     * 登录
     * @param token
     * @return
     * @throws org.apache.shiro.authc.AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token){
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;

        String username = usernamePasswordToken.getUsername();
        String host = usernamePasswordToken.getHost();

        // 查询用户
        User user = userRepository.findByUsername(username);
        if (user == null){
            throw new UnknownAccountException();
        }

        if (!user.isEnabled()){
            throw new DisabledAccountException();
        }

        if (!user.isAccountNonLocked()){
            throw new LockedAccountException();
        }

        // 计算密码过期时间
        DateTime updateTime = user.getPasswordChangeTime();
        int passwordExpiredDays = user.getPasswordExpiredDays();
        Period period = Period.days(passwordExpiredDays);

        if (updateTime.plus(period).isBeforeNow()){
            user.setCredentialsNonExpired(false);
        }

        if (!user.isAccountNonExpired()){
            throw new ExpiredCredentialsException();
        }

        char[] password = usernamePasswordToken.getPassword();

        // 更新用户信息
        userRepository.save(user);
        return new SimpleAuthenticationInfo(new ShiroUser(username, "大树"), "123456",
                null);
    }

    /**
     * 设定Password校验的Hash算法与迭代次数.
     */
    @PostConstruct
    public void initCredentialsMatcher() {
        HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(defaultHashService.getHashAlgorithmName());
        matcher.setHashIterations(defaultHashService.getHashIterations());

        setCredentialsMatcher(matcher);
    }



    /**
     * 自定义Authentication对象，使得Subject除了携带用户的登录名外还可以携带更多信息.
     */
    public static class ShiroUser implements Serializable {
        public String username;
        public String name;

        public ShiroUser(String username, String name) {
            this.username = username;
            this.name = name;
        }

        public String getName() {
            return name;
        }

        /**
         * 本函数输出将作为默认的<shiro:principal/>输出.
         */
        @Override
        public String toString() {
            return username;
        }

        /**
         * 重载equals,只计算username
         */
        @Override
        public int hashCode() {
            return HashCodeBuilder.reflectionHashCode(this, "username");
        }

        /**
         * 重载equals,只比较username
         */
        @Override
        public boolean equals(Object obj) {
            return EqualsBuilder.reflectionEquals(this, obj, "username");
        }
    }
}
