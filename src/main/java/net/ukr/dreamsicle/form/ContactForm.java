package net.ukr.dreamsicle.form;

import net.ukr.dreamsicle.exception.ValidateException;
import net.ukr.dreamsicle.service.I18nService;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.validator.routines.EmailValidator;

public class ContactForm extends AbstractForm {
    private String name;
    private String email;
    private String text;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public void validate(I18nService i18nService) throws ValidateException {
        if (!EmailValidator.getInstance().isValid(email)) {
            throw new ValidateException("Email is invalid");
        }
        if (StringUtils.isBlank(name)) {
            throw new ValidateException("Name is required");
        }
        if (StringUtils.isBlank(text)) {
            throw new ValidateException("Text is required");
        }
    }
}
