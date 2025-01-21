package tn.maiko26.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.maiko26.backend.model.relations.TaskComment;

public interface TaskCommentRepository extends JpaRepository<TaskComment, Long> {
}
