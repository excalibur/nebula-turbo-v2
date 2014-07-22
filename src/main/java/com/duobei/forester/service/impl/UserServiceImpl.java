package com.duobei.forester.service.impl;

import com.duobei.forester.core.domain.User;
import com.duobei.forester.dao.UserRepository;
import com.duobei.forester.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.crypto.hash.DefaultHashService;
import org.apache.shiro.crypto.hash.HashRequest;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by excalibur on 2014/6/28.
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DefaultHashService defaultHashService;

    @Override
    public void register(User user) {
        user.setRegisteTime(new DateTime());

        if (StringUtils.isNotBlank(user.getPassword())) {
            entryptPassword(user);
        }

        userRepository.save(user);
    }

    /**
     * 设定安全的密码，生成随机的salt并经过1024次 sha-1 hash
     */
    private void entryptPassword(User user) {

        HashRequest request = new HashRequest.Builder().setSource(ByteSource.Util.bytes(user.getPassword().trim()))
                .setSalt(ByteSource.Util.bytes(user.getUsername().trim())).setIterations(defaultHashService.getHashIterations()).build();

        String hex = defaultHashService.computeHash(request).toHex();
        user.setPassword(hex);
    }
}
