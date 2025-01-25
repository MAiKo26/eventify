package tn.maiko26.backend.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tn.maiko26.backend.exception.CustomException;
import tn.maiko26.backend.model.User;
import tn.maiko26.backend.repository.UserRepository;
import tn.maiko26.backend.util.JwtUtil;

@Slf4j
@Service
public class AuthenticationService {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;


    public String login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("Invalid email", HttpStatus.BAD_REQUEST));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new CustomException("Invalid password", HttpStatus.BAD_REQUEST);
        }

        if (!user.getVerified()) {
            throw new CustomException("Email not verified.", HttpStatus.BAD_REQUEST);
        }

        return jwtUtil.generateToken(user.getEmail());
    }

    public void logout(HttpServletRequest request) {
        String token = jwtUtil.extractTokenFromRequestHeader(request);
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("Invalid Email", HttpStatus.BAD_REQUEST));
        user.setOnline(false);

        userRepository.save(user);
    }

    public void register(String email, String password, String name) {

        if (userRepository.findByEmail(email).isPresent())
            throw new CustomException("Email already exists.", HttpStatus.BAD_REQUEST);


        String hashedPassword = passwordEncoder.encode(password);

        User user = new User();

        user.setEmail(email);
        user.setPassword(hashedPassword);
        user.setName(name);

        userRepository.save(user);

    }




}
