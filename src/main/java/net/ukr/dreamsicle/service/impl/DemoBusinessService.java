package net.ukr.dreamsicle.service.impl;

import net.ukr.dreamsicle.entity.Account;
import net.ukr.dreamsicle.entity.Article;
import net.ukr.dreamsicle.entity.Comment;
import net.ukr.dreamsicle.exception.ApplicationException;
import net.ukr.dreamsicle.exception.ValidateException;
import net.ukr.dreamsicle.form.CommentForm;
import net.ukr.dreamsicle.model.SocialAccount;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;

public class DemoBusinessService extends BusinessServiceImpl {
    DemoBusinessService(ServiceManager serviceManager) {
        super(serviceManager);
    }

    @Override
    public Comment createComment(CommentForm form) throws ValidateException {
        form.validate(i18nService);
        try (Connection connection = dataSource.getConnection()) {
            SocialAccount socialAccount = socialService.getSocialAccount(form.getAuthToken());
            Account account = new Account();
            account.setId(0L);
            account.setAvatar(socialAccount.getAvatar());
            account.setCreated(new Timestamp(System.currentTimeMillis()));
            account.setEmail(socialAccount.getEmail());
            account.setName(socialAccount.getName());
            Comment comment = new Comment(form.getIdArticle(), account, form.getContent(), new Timestamp(System.currentTimeMillis()));
            Article article = sql.findArticleForNewCommentNotification(connection, form.getIdArticle());
            sendNewCommentNotification(article, form.getContent(), form.getLocale());
            return comment;
        } catch (SQLException e) {
            throw new ApplicationException("Can't execute db command: " + e.getMessage(), e);
        }
    }
}
