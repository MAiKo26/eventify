package tn.maiko26.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.maiko26.backend.model.User;
import tn.maiko26.backend.model.UserSetting;

import java.util.Optional;

public interface UserSettingRepository extends JpaRepository<UserSetting, Long> {
}
