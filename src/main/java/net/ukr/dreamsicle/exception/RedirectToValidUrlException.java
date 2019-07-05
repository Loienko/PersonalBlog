package net.ukr.dreamsicle.exception;

public class RedirectToValidUrlException extends Exception {
    private String url;

    public RedirectToValidUrlException(String url) {
        super("Should be redirect to " + url);
        this.url = url;
    }

    public String getUrl() {
        return url;
    }
}
