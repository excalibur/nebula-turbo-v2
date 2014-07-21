package com.duobei.forester.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaDialect;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaDialect;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * Created by excalibur on 2014/6/24.
 */
@Configuration
@EnableJpaRepositories(basePackages = "com.duobei.forester.dao")
@EnableTransactionManagement
public class DataSourceConfig {

    private final static Logger log = LoggerFactory.getLogger(ApplicationConfig.class);

    @Value("${database.envContextName}")
    private String envContextName;

    @Value("${database.lookupName}")
    private String lookupName;

    @Value("${database.generateDdl}")
    private boolean generateDdl;

    @Bean
    public DataSource dataSource() {
        try {
            Context ctx = new InitialContext();
            Context envContext = (Context) ctx.lookup(envContextName);
            DataSource ds = (DataSource) envContext.lookup(lookupName);
            return ds;
        } catch (NamingException e) {
            log.error("create data source error", e);
        }
        return null;
    }

    @Bean
    public EntityManagerFactory entityManagerFactory() {
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();

        vendorAdapter.setDatabase(isWhatDatabase(dataSource()));
        vendorAdapter.setGenerateDdl(generateDdl);

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setPackagesToScan("com.duobei.forester.core.domain");
        factory.setDataSource(dataSource());

        factory.afterPropertiesSet();

        return factory.getObject();
    }

    @Bean
    public JpaDialect jpaDialect() {
        return new HibernateJpaDialect();
    }

    @Bean
    public PlatformTransactionManager transactionManager() {
        JpaTransactionManager txManager = new JpaTransactionManager();
        txManager.setEntityManagerFactory(entityManagerFactory());
        return txManager;
    }

    private Database isWhatDatabase(DataSource dataSource) {
        // 从DataSource中取出jdbcUrl.
        String jdbcUrl = null;
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            if (connection == null) {
                throw new IllegalStateException("Connection returned by DataSource [" + dataSource + "] was null");
            }
            jdbcUrl = connection.getMetaData().getURL();
        } catch (SQLException e) {
            throw new RuntimeException("Could not get database url", e);
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                }
            }
        }

        // 根据jdbc url判断dialect
        if (jdbcUrl.indexOf(":h2:") != -1) {
            return Database.H2;
        } else if (jdbcUrl.indexOf(":mysql:") != -1) {
            return Database.MYSQL;
        } else if (jdbcUrl.indexOf(":oracle:") != -1) {
            return Database.ORACLE;
        } else if (jdbcUrl.indexOf(":hsqldb:") != -1) {
            return Database.HSQL;
        } else {
            throw new IllegalArgumentException("Unknown Database of " + jdbcUrl);
        }
    }
}
