package com.duobei.forester.test;


import com.duobei.forester.config.ApplicationConfig;
import com.duobei.forester.config.DataSourceConfig;
import org.junit.runner.RunWith;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.mock.jndi.SimpleNamingContextBuilder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.naming.NamingException;
import javax.sql.DataSource;

/**
 * 单元测试基础类
 * <p/>
 * 主要仿制了一个jndi来模拟Tomcat的Jndi数据连接池
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ApplicationConfig.class, DataSourceConfig.class})
public abstract class SpringTest {

    static {
        //创建测试用的DataSource
        EmbeddedDatabaseBuilder databaseBuilder = new EmbeddedDatabaseBuilder();
        DataSource dataSource = databaseBuilder.setType(EmbeddedDatabaseType.HSQL).build();
        try {
            SimpleNamingContextBuilder builder = SimpleNamingContextBuilder.emptyActivatedContextBuilder();
            builder.bind("java:/comp/env/jdbc/database", dataSource);
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }


}
