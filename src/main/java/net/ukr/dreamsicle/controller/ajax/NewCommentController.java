package net.ukr.dreamsicle.controller.ajax;

import net.ukr.dreamsicle.controller.AbstractController;
import net.ukr.dreamsicle.entity.Comment;
import net.ukr.dreamsicle.exception.ApplicationException;
import net.ukr.dreamsicle.exception.ValidateException;
import net.ukr.dreamsicle.form.CommentForm;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@WebServlet("/ajax/comment")
public class NewCommentController extends AbstractController {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            CommentForm form = createForm(req, CommentForm.class);
            Comment comment = getBusinessService().createComment(form);
            req.setAttribute("comments", Collections.singleton(comment));
            forwardToFragment("comments.jsp", req, resp);
        } catch (ValidateException e) {
            throw new ApplicationException("Invalid create comment try: " + e.getMessage(), e);
        }
    }
}

