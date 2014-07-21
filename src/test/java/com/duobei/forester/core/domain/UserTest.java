package com.duobei.forester.core.domain;

import org.junit.Test;

/**
 * [description]
 *
 * @author faith
 * @since 0.0.1
 */
public class UserTest {

    @Test
    public void test01() throws Exception {
        User user = new User();
        user.setUsername("faith");
        user.setId(1L);
        System.out.println(user.hashCode());

        User user2 = new User();
        user2.setUsername("faith");
        user2.setId(1L);
        System.out.println(user2.hashCode());
    }
}
