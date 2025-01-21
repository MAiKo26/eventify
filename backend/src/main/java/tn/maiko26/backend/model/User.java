package tn.maiko26.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tn.maiko26.backend.model.relations.TaskComment;

import java.sql.Timestamp;
import java.util.ArrayList;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "verified")
    private Boolean verified;

    @Column(name = "online")
    private Boolean online;

    @Column(name = "role")
    private String role;

    @JsonManagedReference
    @OneToMany(mappedBy = "senderId")
    private java.util.Collection<Message> chatMessages = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "user")
    private java.util.Collection<TaskComment> userComments = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.Collection<Event> createdEvents = new ArrayList<>();

    @JsonManagedReference
    @ManyToMany(mappedBy = "participants")
    private java.util.Collection<Event> participatedEvents = new ArrayList<>();

    @JsonManagedReference
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private UserSetting userSetting;


}