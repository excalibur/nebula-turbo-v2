package com.duobei.forester.test;

import com.duobei.forester.config.WebSpringConfig;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

/**
 * Created by excalibur on 2014/6/23.
 */
@WebAppConfiguration
@ContextConfiguration(classes = {WebSpringConfig.class})
public abstract class SpringMvcTest extends SpringTest {

    protected MockMvc mockMvc;

    @Autowired
    protected WebApplicationContext wac;

    @Before
    public void setUp() throws Exception {

        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }


}
