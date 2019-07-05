package net.ukr.dreamsicle.dao.mapper;

import net.ukr.dreamsicle.entity.Category;
import org.apache.commons.dbutils.BasicRowProcessor;
import org.apache.commons.dbutils.ResultSetHandler;
import org.apache.commons.dbutils.RowProcessor;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class MapCategoryMapper implements ResultSetHandler<Map<Integer, Category>> {
    private RowProcessor convert = new BasicRowProcessor();

    @Override
    public Map<Integer, Category> handle(ResultSet rs) throws SQLException {
        Map<Integer, Category> map = new HashMap<>();
        while (rs.next()) {
            Category category = convert.toBean(rs, Category.class);
            map.put(category.getId(), category);
        }
        return map;
    }
}
