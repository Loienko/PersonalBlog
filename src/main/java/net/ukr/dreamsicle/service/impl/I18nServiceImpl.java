package net.ukr.dreamsicle.service.impl;

import net.ukr.dreamsicle.service.I18nService;

import java.util.Locale;
import java.util.ResourceBundle;

class I18nServiceImpl implements I18nService {

    @Override
    public String getMessage(String key, Locale locale, Object... args) {
        String value = ResourceBundle.getBundle("i18n/messages", locale).getString(key);
        for (int i = 0; i < args.length; i++) {
            value = value.replace("{" + i + "}", args[i].toString());
        }
        return value;
    }
}
