package tn.maiko26.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.maiko26.backend.model.Message;

public interface ChatRespository extends JpaRepository<Message,Long> {
}
