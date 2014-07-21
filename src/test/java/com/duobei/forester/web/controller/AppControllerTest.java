package com.duobei.forester.web.controller;


import com.duobei.forester.test.SpringMvcTest;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.servlet.ModelAndView;

import javax.sql.DataSource;

/**
 *  AppController测试类
 */
public class AppControllerTest extends SpringMvcTest {


    @Test
    public void testIndex() throws Exception {
        ResultActions ra = this.mockMvc.perform(MockMvcRequestBuilders.get("/").accept(MediaType.TEXT_HTML));
        MvcResult mr = ra.andReturn();
        ModelAndView modelAndView = mr.getModelAndView();
        System.out.println(modelAndView);

        Assert.assertEquals(modelAndView.getViewName(), "index");

    }


}
