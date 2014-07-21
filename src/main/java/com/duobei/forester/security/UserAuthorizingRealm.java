package com.duobei.forester.security;

import com.duobei.forester.dao.UserRepository;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * [description]
 *
 * @author faith
 * @since 0.0.1
 */
public class UserAuthorizingRealm extends AuthorizingRealm {

    @Autowired
    private UserRepository userRepository;

    /**
     * 登录
     * @param principals
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        UsernamePasswordToken token = (UsernamePasswordToken) principals;

        String username = token.getUsername();
        char[] paswword = token.getPassword();

        return null;
    }

    /**
     * 授权
     * @param token
     * @return
     * @throws org.apache.shiro.authc.AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        return null;
    }
}
