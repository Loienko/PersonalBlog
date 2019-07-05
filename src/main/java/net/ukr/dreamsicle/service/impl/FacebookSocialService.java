package net.ukr.dreamsicle.service.impl;

import net.ukr.dreamsicle.model.SocialAccount;
import net.ukr.dreamsicle.service.SocialService;

import java.util.Arrays;
import java.util.List;

public class FacebookSocialService implements SocialService {
    private final String facebookClientId;
    private final List<String> issuers;

    public FacebookSocialService(ServiceManager serviceManager) {
        this.facebookClientId = serviceManager.getApplicationProperty("");
        this.issuers = Arrays.asList("", "");
    }

    @Override
    public SocialAccount getSocialAccount(String authToken) {

        return null;
    }
}
