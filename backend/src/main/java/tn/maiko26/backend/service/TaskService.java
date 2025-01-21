package tn.maiko26.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import tn.maiko26.backend.exception.CustomException;
import tn.maiko26.backend.exception.ResourceNotImplementedException;
import tn.maiko26.backend.model.Event;
import tn.maiko26.backend.model.Task;
import tn.maiko26.backend.model.relations.TaskComment;
import tn.maiko26.backend.repository.TaskCommentRepository;
import tn.maiko26.backend.repository.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {


    private final TaskRepository taskRepository;
    private final TaskCommentRepository taskCommentRepository;

    public TaskService(TaskRepository taskRepository, TaskCommentRepository taskCommentRepository) {
        this.taskRepository = taskRepository;
        this.taskCommentRepository = taskCommentRepository;
    }


    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        throw new ResourceNotImplementedException();
    }


    public Long createTask(Task task) {
        throw new ResourceNotImplementedException();
    }


    public void updateTask(Long id, Task task) {
        Optional<Task> existingTask = taskRepository.findById(id);
        if (existingTask.isPresent()) {
            Task updatedTask = existingTask.get();
            updatedTask.setTitle(task.getTitle());
            updatedTask.setDescription(task.getDescription());
            updatedTask.setStatus(task.getStatus());
            taskRepository.save(updatedTask);
        } else {
            throw new CustomException("Task doesn't exist", HttpStatus.BAD_REQUEST);
        }
    }


    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // Add comment to a task
    public TaskComment addCommentToTask(TaskComment taskComment) {
        return taskCommentRepository.save(taskComment); // Save the task comment entity
    }

}
