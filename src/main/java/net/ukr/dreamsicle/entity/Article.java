package net.ukr.dreamsicle.entity;


import org.apache.commons.lang3.StringUtils;

import java.sql.Timestamp;
import java.util.Objects;

public class Article extends AbstractEntity<Long> {
    private String title;
    private String url;
    private String logo;
    private String desc;
    private String content;
    private int idCategory;
    private Timestamp created;
    private long views;
    private int comments;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(int idCategory) {
        this.idCategory = idCategory;
    }

    public Timestamp getCreated() {
        return created;
    }

    public void setCreated(Timestamp created) {
        this.created = created;
    }

    public long getViews() {
        return views;
    }

    public void setViews(long views) {
        this.views = views;
    }

    public int getComments() {
        return comments;
    }

    public void setComments(int comments) {
        this.comments = comments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Article that = (Article) o;
        return idCategory == that.idCategory &&
                views == that.views &&
                comments == that.comments &&
                Objects.equals(title, that.title) &&
                Objects.equals(url, that.url) &&
                Objects.equals(logo, that.logo) &&
                Objects.equals(desc, that.desc) &&
                Objects.equals(content, that.content) &&
                Objects.equals(created, that.created);
    }

    @Override
    public int hashCode() {

        return Objects.hash(super.hashCode(), title, url, logo, desc, content, idCategory, created, views, comments);
    }

    public String getArticleLink() {
        return "/article/" + getId() + url;
    }

    public String getShortTitle() {
        if (StringUtils.length(title) > 20) {
            return title.substring(0, 17) + "...";
        } else {
            return title;
        }
    }
}
