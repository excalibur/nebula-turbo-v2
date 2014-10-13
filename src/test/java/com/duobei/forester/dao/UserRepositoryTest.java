package com.duobei.forester.dao;

import com.duobei.forester.test.SpringTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;

/**
 * [description]
 *
 * @author faith
 * @since 0.0.1
 */
@Transactional
public class UserRepositoryTest extends SpringTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void test01() throws Exception {

        // userRepository.findOne(1L);
    }
}
