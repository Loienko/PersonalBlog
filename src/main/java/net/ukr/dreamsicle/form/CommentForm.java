package net.ukr.dreamsicle.form;

import net.ukr.dreamsicle.exception.ValidateException;
import net.ukr.dreamsicle.service.I18nService;
import org.apache.commons.lang3.StringUtils;

public class CommentForm extends AbstractForm {
    private Long idArticle;
    private String content;
    private String authToken;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getIdArticle() {
        return idArticle;
    }

    public void setIdArticle(Long idArticle) {
        this.idArticle = idArticle;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

    @Override
    public void validate(I18nService i18nService) throws ValidateException {
        if (idArticle == null) {
            throw new ValidateException("idArticle is required");
        }
        if (StringUtils.isBlank(content)) {
            throw new ValidateException("content is required");
        }
        if (StringUtils.isBlank(authToken)) {
            throw new ValidateException("authToken is required");
        }
    }
}