package net.ukr.dreamsicle.service;

import net.ukr.dreamsicle.model.SocialAccount;

public interface SocialService {

    SocialAccount getSocialAccount(String authToken);
}
