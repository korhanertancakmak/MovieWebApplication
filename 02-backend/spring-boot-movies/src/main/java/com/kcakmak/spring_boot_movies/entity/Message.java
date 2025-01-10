package com.kcakmak.spring_boot_movies.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @JsonProperty("id")
    private Long id;

    @Column(name = "user_email", nullable = false, length = 255)
    @JsonProperty("userEmail")
    private String userEmail;

    @Column(name = "title", nullable = false, length = 255)
    @JsonProperty("title")
    private String title;

    @Column(name = "question", nullable = false, columnDefinition = "TEXT")
    @JsonProperty("question")
    private String question;

    @Column(name = "admin_email", nullable = true, length = 255)
    @JsonProperty("adminEmail")
    private String adminEmail;

    @Column(name = "response", nullable = true, columnDefinition = "TEXT")
    @JsonProperty("response")
    private String response;

    @Column(name = "closed", nullable = false)
    @JsonProperty("closed")
    private boolean closed;

    public Message() {
    }

    public Message(String title, String question) {
        this.title = title;
        this.question = question;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAdminEmail() {
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }
}
