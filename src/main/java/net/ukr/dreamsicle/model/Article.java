package net.ukr.dreamsicle.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    private String title;
    private String url;
    private String logo;
    private String desc;
    private String content;
    private int id_category;
    private Timestamp timestamp;
    private long views;


    private int comments;
}
