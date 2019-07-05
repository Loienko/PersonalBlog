package net.ukr.dreamsicle.entity;

import java.sql.Timestamp;

public class Account extends AbstractEntity<Long> {
    private String email;
    private String name;
    private String avatar;
    private Timestamp created;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Timestamp getCreated() {
        return created;
    }

    public void setCreated(Timestamp created) {
        this.created = created;
    }

    public boolean isAvatarExists() {
        return avatar != null;
    }

    public String getNoAvatar() {
        return "/static/img/no_avatar/no_avatar.png";
    }
}
