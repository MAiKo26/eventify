package tn.maiko26.backend.model.relations;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import tn.maiko26.backend.model.Task;
import tn.maiko26.backend.model.User;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "task_comments")
public class TaskComment {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", length = 255, nullable = false)
    private String content;

    @Column(name = "timestamp", nullable = false)
    private Timestamp timestamp;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "sender_id")
    private User user;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "task_id")
    private Task task;

}
