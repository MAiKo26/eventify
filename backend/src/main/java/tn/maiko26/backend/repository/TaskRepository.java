package tn.maiko26.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.maiko26.backend.model.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
