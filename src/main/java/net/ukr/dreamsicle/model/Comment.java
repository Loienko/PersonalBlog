package net.ukr.dreamsicle.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    private long id_account;
    private long id_articles;
    private String content;
    private Timestamp timestamp;
}
