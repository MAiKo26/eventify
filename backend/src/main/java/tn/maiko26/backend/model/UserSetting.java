package tn.maiko26.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_settings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(name = "email_digest", nullable = false, columnDefinition = "boolean default true")
    private Boolean emailDigest = true;

    @Column(name = "task_reminders", nullable = false, columnDefinition = "boolean default true")
    private Boolean taskReminders = true;
}
