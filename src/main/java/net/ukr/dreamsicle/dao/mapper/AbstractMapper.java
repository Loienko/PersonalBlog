package net.ukr.dreamsicle.dao.mapper;

import org.apache.commons.dbutils.BasicRowProcessor;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.RowProcessor;

import java.sql.ResultSet;
import java.sql.SQLException;

public abstract class AbstractMapper<T> implements ResultSetHandler<T> {

    protected final RowProcessor convert = new BasicRowProcessor();
    boolean shouldBeIterateThroughResultSet = true;

    @Override
    public T handle(ResultSet resultSet) throws SQLException {
        if (shouldBeIterateThroughResultSet) {
            if (resultSet.next()) {
                return handleItem(resultSet);
            } else return null;
        } else return handleItem(resultSet);
    }

    public abstract T handleItem(ResultSet resultSet) throws SQLException;
}
