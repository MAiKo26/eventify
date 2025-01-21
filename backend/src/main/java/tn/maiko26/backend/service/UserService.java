package tn.maiko26.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import tn.maiko26.backend.exception.CustomException;
import tn.maiko26.backend.exception.ResourceNotImplementedException;
import tn.maiko26.backend.model.User;
import tn.maiko26.backend.repository.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public String getCurrentUserEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

    // Get user by email
    public User getUserByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new CustomException("User doesn't exist", HttpStatus.BAD_REQUEST));
    }

    public User getCurrentUser() {
        return userRepository.findByEmail(this.getCurrentUserEmail()).orElseThrow(() -> new CustomException("You are not Logged in.", HttpStatus.UNAUTHORIZED));
    }

    public User getUserById(Long id) {
        return userRepository.findUserById(id).orElseThrow(() -> new CustomException("User doesn't exist", HttpStatus.BAD_REQUEST));
    }

    public Long createUser(User user) {
        throw new ResourceNotImplementedException();
    }

    public void updateUser(Long id, User user) {
        throw new ResourceNotImplementedException();
    }

    public void deleteUser(String userId) {
        throw new ResourceNotImplementedException();
    }
}
