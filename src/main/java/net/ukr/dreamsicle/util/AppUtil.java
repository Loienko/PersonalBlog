package net.ukr.dreamsicle.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class AppUtil {
    public static void loadProperties(Properties properties, String classPathUrl) {
        try (InputStream inputStream = AppUtil.class.getClassLoader().getResourceAsStream(classPathUrl)) {
            properties.load(inputStream);
        } catch (IOException e) {
            throw new IllegalArgumentException("Can't load properties from classpath: " + classPathUrl, e);
        }
    }
}
