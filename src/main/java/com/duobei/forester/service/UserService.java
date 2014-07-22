package com.duobei.forester.service;

import com.duobei.forester.core.domain.User;
import com.duobei.forester.core.exception.RegisterException;

/**
 * Created by excalibur on 2014/6/28.
 */
public interface UserService {

    void register(User user)throws RegisterException;
}
