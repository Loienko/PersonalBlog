package net.ukr.dreamsicle.controller.page;

import net.ukr.dreamsicle.Constants;
import net.ukr.dreamsicle.controller.AbstractController;
import net.ukr.dreamsicle.entity.Article;
import net.ukr.dreamsicle.entity.Comment;
import net.ukr.dreamsicle.exception.RedirectToValidUrlException;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/article/*")
public class ArticleController extends AbstractController {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String requestUrl = req.getRequestURI();
        try {
            viewArticle(req, resp, requestUrl);
        } catch (RedirectToValidUrlException e) {
            resp.sendRedirect(e.getUrl());
        } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
            resp.sendRedirect("/404?url=" + requestUrl);
        }
    }

    private void viewArticle(HttpServletRequest req, HttpServletResponse resp, String requestUrl) throws RedirectToValidUrlException, IOException, ServletException {
        String id = StringUtils.split(requestUrl, "/")[1];
        Article article = getBusinessService().viewArticle(Long.parseLong(id), requestUrl);
        if (article == null) {
            resp.sendRedirect("/404?url=" + requestUrl);
        } else {
            req.setAttribute("article", article);
            List<Comment> comments = getBusinessService().listComments(article.getId(), 0, Constants.LIMIT_COMMENTS_PER_PAGE);
            req.setAttribute("comments", comments);
            forwardToPage("article.jsp", req, resp);
        }
    }
}
