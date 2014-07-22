package com.duobei.forester.dao;

import com.duobei.forester.core.domain.User;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by excalibur on 2014/6/27.
 */
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    User findByUsername(String username);
}
