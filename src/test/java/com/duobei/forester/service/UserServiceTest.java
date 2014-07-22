package com.duobei.forester.service;

import com.duobei.forester.config.SecurityConfig;
import com.duobei.forester.test.ShiroTest;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.crypto.hash.DefaultHashService;
import org.apache.shiro.crypto.hash.HashRequest;
import org.apache.shiro.util.ByteSource;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * [description]
 *
 * @author faith
 * @since 0.0.1
 */
public class UserServiceTest extends ShiroTest{



    @Autowired
    private UserService userService;

    @Autowired
    private DefaultHashService defaultHashService;

    @Test
    public void testRegister() throws Exception {

//        userService.register(null);


    }

    @Test
    public void testPassword() throws Exception {
        HashRequest request = new HashRequest.Builder().setSource(ByteSource.Util.bytes("hello"))
                .setSalt(ByteSource.Util.bytes("jiangzuotong")).setIterations(defaultHashService.getHashIterations()).build();

        String hex = defaultHashService.computeHash(request).toHex();
        System.out.println(hex);

        HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(defaultHashService.getHashAlgorithmName());
        matcher.setHashIterations(defaultHashService.getHashIterations());

        UsernamePasswordToken token = new UsernamePasswordToken();
        token.setUsername("faith");
        token.setPassword(new char[]{'h', 'e', 'l', 'l', 'o'});

        SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo("faith", hex
                , ByteSource.Util.bytes(SecurityConfig.PrivateSaltString + "jiangzuotong")
                , "sdasdasd");

        System.out.println(matcher.doCredentialsMatch(token, simpleAuthenticationInfo));
    }

    @Test
    public void test03() throws Exception {

        System.out.println(defaultHashService.getPrivateSalt().toHex());
        System.out.println(ByteSource.Util.bytes("duobei-jiangzuotong").toHex());
    }
}
