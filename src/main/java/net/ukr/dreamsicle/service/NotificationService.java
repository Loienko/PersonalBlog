package net.ukr.dreamsicle.service;

public interface NotificationService {
    void sendNotification(String title, String content);

    void shutdown();
}
