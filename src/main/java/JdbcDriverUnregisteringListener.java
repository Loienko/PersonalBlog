import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionListener;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Enumeration;

public class JdbcDriverUnregisteringListener implements ServletContextListener,
        HttpSessionListener, HttpSessionAttributeListener {

    /**
     * Instance of this class created like any other {@link ServletContextListener} on application startup.
     * We can manage order of call {@link #contextInitialized(ServletContextEvent)} and
     * {@link #contextDestroyed(ServletContextEvent)} via {@code web.xml}. But servlet container (like Tomcat) creates
     * all instances of listeners together.
     *
     * <p>So, if we initialize logger field ordinary (by class field in listener),
     * then it will be initialized before first {@link #contextInitialized(ServletContextEvent)} and we lose
     * opportunity to initialize system properties (like {@code LOG_FILE}) via
     *
     *
     * <p><b>Best practices is</b>: Do not directly initialize fields of servlet listeners. Use
     * {@link #contextInitialized(ServletContextEvent)} and {@link #contextDestroyed(ServletContextEvent)} methods</p>
     */
    private Logger logger;

    /**
     * {@inheritDoc}
     */
    @Override
    public void contextInitialized(ServletContextEvent event) {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void contextDestroyed(ServletContextEvent event) {
        logger = LoggerFactory.getLogger(getClass());
        deregisterDrivers(getDrivers());
    }

    /**
     * Retrieves an Enumeration with all of the currently loaded JDBC drivers.
     *
     * @return the list of JDBC Drivers
     */
    Enumeration<Driver> getDrivers() {
        return DriverManager.getDrivers();
    }

    /**
     * Unregistering JDBC drivers given as param.
     *
     * @param drivers {@link Enumeration} of {@link Driver} to unregister
     */
    void deregisterDrivers(Enumeration<Driver> drivers) {
        while (drivers.hasMoreElements()) {
            deregisterDriver(drivers.nextElement());
        }
    }

    /**
     * Unregistering single JDBC driver given as param.
     *
     * @param driver to unregister
     */
    void deregisterDriver(Driver driver) {
        try {
            DriverManager.deregisterDriver(driver);
            logger.info("Deregistering JDBC driver: {}", driver);
        } catch (SQLException e) {
            logger.warn("Error deregistering JDBC driver: {}. Root cause: ", driver, e);
        }
    }
}
