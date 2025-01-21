package tn.maiko26.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.maiko26.backend.model.Event;

public interface EventRepository extends JpaRepository<Event,Long> {
}
