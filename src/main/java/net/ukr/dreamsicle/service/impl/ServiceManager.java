package net.ukr.dreamsicle.service.impl;

import net.ukr.dreamsicle.service.*;
import net.ukr.dreamsicle.util.AppUtil;
import org.apache.commons.dbcp2.BasicDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContext;
import java.sql.SQLException;
import java.util.Properties;

public class ServiceManager {
    private static final String SERVICE_MANAGER = "SERVICE_MANAGER";
    private static final Logger LOGGER = LoggerFactory.getLogger(ServiceManager.class);
    final Properties applicationProperties = new Properties();
    final ServletContext applicationContext;
    final BasicDataSource dataSource;
    final SocialService socialService;
    final AvatarService avatarService;
    final I18nService i18nService;
    final NotificationService notificationService;
    final BusinessService businessService;

    private ServiceManager(ServletContext context) {
        applicationContext = context;
        AppUtil.loadProperties(applicationProperties, "application.properties");
        dataSource = createBasicDataSource();
        socialService = new GooglePlusSocialService(this);
//        socialService = new FacebookSocialService(this);
        avatarService = new FileStorageAvatarService(this);
        i18nService = new I18nServiceImpl();
        notificationService = new AsyncEmailNotificationService(this);
        businessService = new BusinessServiceImpl(this);
//        notificationService = new DemoNotificationService();
//        businessService = new DemoBusinessService(this);
        LOGGER.info("ServiceManager instance created");
    }

    public static ServiceManager getInstance(ServletContext context) {
        ServiceManager instance = (ServiceManager) context.getAttribute(SERVICE_MANAGER);
        if (instance == null) {
            instance = new ServiceManager(context);
            context.setAttribute(SERVICE_MANAGER, instance);
        }
        return instance;
    }

    public void destroy() {
        try {
            dataSource.close();
        } catch (SQLException e) {
            LOGGER.error("Close dataSource failed: " + e.getMessage(), e);
        }
        notificationService.shutdown();
        LOGGER.info("ServiceManager instance destroyed");
    }

    public BusinessService getBusinessService() {
        return businessService;
    }

    public I18nService getI18nService() {
        return i18nService;
    }

    public String getApplicationProperty(String property) {
//        return applicationProperties.getProperty(property);
        String value = applicationProperties.getProperty(property);
        if (value.startsWith("${sysEnv.")) {
            value = value.replace("${sysEnv.", "").replace("}", "");
            return System.getProperty(value, value);
        } else {
            return value;
        }
    }

    private BasicDataSource createBasicDataSource() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDefaultAutoCommit(false);
        dataSource.setRollbackOnReturn(true);
        dataSource.setDriverClassName(getApplicationProperty("db.driver"));
        dataSource.setUrl(getApplicationProperty("db.url"));
        dataSource.setUsername(getApplicationProperty("db.username"));
        dataSource.setPassword(getApplicationProperty("db.password"));
        dataSource.setInitialSize(Integer.parseInt(getApplicationProperty("db.pool.initSize")));
        dataSource.setMaxTotal(Integer.parseInt(getApplicationProperty("db.pool.maxSize")));
        return dataSource;
    }
}