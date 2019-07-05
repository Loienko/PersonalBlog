package net.ukr.dreamsicle.model;

import javax.faces.bean.RequestScoped;
import javax.inject.Named;

@Named
@RequestScoped
public class Login {
    private boolean logged;
    private String login;
    private String password;

    public boolean isLogged() {
        return logged;
    }

    public void setLogged(boolean logged) {
        this.logged = logged;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void doLogin() {
        logged = true;
        System.out.println("Logged: " + logged + " User: " + login + " Password: " + password);
    }
}
