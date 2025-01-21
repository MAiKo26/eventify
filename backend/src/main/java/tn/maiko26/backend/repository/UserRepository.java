package tn.maiko26.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.maiko26.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findUserById(Long id);
}
