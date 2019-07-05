package net.ukr.dreamsicle.form;

import net.ukr.dreamsicle.exception.ValidateException;
import net.ukr.dreamsicle.model.AbstractModel;
import net.ukr.dreamsicle.service.I18nService;

import java.util.Locale;

public class AbstractForm extends AbstractModel {
    protected Locale locale;
    public void setLocale(Locale locale) {
        this.locale = locale;
    }
    public Locale getLocale() {
        return locale;
    }
    public void validate(I18nService i18nService) throws ValidateException {
    }
}
