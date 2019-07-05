package net.ukr.dreamsicle.controller.page;


import net.ukr.dreamsicle.Constants;
import net.ukr.dreamsicle.controller.AbstractController;
import net.ukr.dreamsicle.entity.Article;
import net.ukr.dreamsicle.entity.Category;
import net.ukr.dreamsicle.model.Items;
import net.ukr.dreamsicle.model.Pagination;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet({"/news", "/news/*"})
public class NewsController extends AbstractController {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int offset = getOffset(request, Constants.LIMIT_ARTICLES_PER_PAGE);
        String requestUrl = request.getRequestURI();
        Items<Article> items = listArticles(requestUrl, offset, request);
        if (items == null) {
            response.sendRedirect("/404?url=" + requestUrl);
        } else {
            request.setAttribute("list", items.getItems());
            Pagination pagination = new Pagination.Builder(requestUrl + "?", offset, items.getCount()).
                    withLimit(Constants.LIMIT_ARTICLES_PER_PAGE).build();
            request.setAttribute("pagination", pagination);
            forwardToPage("news.jsp", request, response);
        }
    }

    private Items<Article> listArticles(String requestUrl, int offset, HttpServletRequest req) {
        Items<Article> items;
        if (requestUrl.endsWith("/news") || requestUrl.endsWith("/news/")) {
            items = getBusinessService().listArticles(offset, Constants.LIMIT_ARTICLES_PER_PAGE);
            req.setAttribute("isNewsPage", Boolean.TRUE);
        } else {
            String categoryUrl = requestUrl.replace("/news", "");
            Category category = getBusinessService().findCategoryByUrl(categoryUrl);
            if (category == null) {
                return null;
            }
            items = getBusinessService().listArticlesByCategory(categoryUrl, offset, Constants.LIMIT_ARTICLES_PER_PAGE);
            req.setAttribute("selectedCategory", category);
        }
        return items;
    }
}
