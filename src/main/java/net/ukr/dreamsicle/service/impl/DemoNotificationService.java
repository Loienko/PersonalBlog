package net.ukr.dreamsicle.service.impl;

import net.ukr.dreamsicle.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DemoNotificationService implements NotificationService {

    private final static Logger LOGGER = LoggerFactory.getLogger(DemoNotificationService.class);

    @Override
    public void sendNotification(String title, String content) {
        LOGGER.info("New comment: title=" + title + ", content=" + content);
    }

    @Override
    public void shutdown() {

    }
}
