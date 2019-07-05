package net.ukr.dreamsicle.service;

import net.ukr.dreamsicle.entity.Article;
import net.ukr.dreamsicle.entity.Category;
import net.ukr.dreamsicle.entity.Comment;
import net.ukr.dreamsicle.exception.RedirectToValidUrlException;
import net.ukr.dreamsicle.exception.ValidateException;
import net.ukr.dreamsicle.form.CommentForm;
import net.ukr.dreamsicle.form.ContactForm;
import net.ukr.dreamsicle.model.Items;

import java.util.List;
import java.util.Map;

public interface BusinessService {
    Map<Integer, Category> mapCategories();

    Items<Article> listArticles(int offset, int limit);

    Items<Article> listArticlesByCategory(String categoryUrl, int offset, int limit);

    /**
     * @return null if entity not found
     */
    Category findCategoryByUrl(String categoryUrl);

    Items<Article> listArticlesBySearchQuery(String searchQuery, int offset, int limit);

    /**
     * @return null if entity not found by idArticle
     */
    Article viewArticle(Long idArticle, String requestUrl) throws RedirectToValidUrlException;

    List<Comment> listComments(long idArticle, int offset, int limit);

    Comment createComment(CommentForm form) throws ValidateException;

    void createContactRequest(ContactForm form) throws ValidateException;
}
