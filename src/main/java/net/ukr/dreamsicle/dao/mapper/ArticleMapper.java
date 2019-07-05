package net.ukr.dreamsicle.dao.mapper;

import net.ukr.dreamsicle.entity.Article;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ArticleMapper extends AbstractMapper<Article> {
    @Override
    public Article handleItem(ResultSet resultSet) throws SQLException {
        Article article = convert.toBean(resultSet, Article.class);
        article.setIdCategory(resultSet.getInt("id_category"));
        return article;
    }
}
