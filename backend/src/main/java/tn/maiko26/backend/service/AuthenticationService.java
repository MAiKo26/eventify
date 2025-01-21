package tn.maiko26.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tn.maiko26.backend.exception.CustomException;
import tn.maiko26.backend.exception.ResourceNotImplementedException;
import tn.maiko26.backend.model.User;
import tn.maiko26.backend.repository.UserRepository;
import tn.maiko26.backend.util.JwtUtil;

import java.security.SecureRandom;

@Slf4j
@Service
public class AuthenticationService {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final SecureRandom random = new SecureRandom();
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private EmailSenderService emailSenderService;

    public String login(String email, String password) {


        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("Invalid email", HttpStatus.BAD_REQUEST));

//        if (!passwordEncoder.matches(password, user.getPassword())) {
//            throw new CustomException("Invalid password", HttpStatus.BAD_REQUEST);
//        }

        if (!user.getVerified()) {
            throw new CustomException("Email not verified.", HttpStatus.BAD_REQUEST);
        }

        return jwtUtil.generateToken(user.getEmail());
    }

    public void logout(String token) {
        throw new ResourceNotImplementedException();

//        if (jwtUtil.validateToken(token)) {
//            sessionRepository.deleteBySessionId(token);
//        }
    }

    public void register(String email, String password, String name) {
        throw new ResourceNotImplementedException();
//
//
//        if (userRepository.findByEmail(email).isPresent()) throw new IllegalArgumentException("Email already exists");
//
//
//        String hashedPassword = passwordEncoder.encode(password);
//
//        User user = new User(email, hashedPassword, name);
//
//
//        byte[] verificationTokenBytes = new byte[32];
//        random.nextBytes(verificationTokenBytes);
//        String verificationToken = Base64.getEncoder().encodeToString(verificationTokenBytes);
//
//        user.setVerificationToken(verificationToken);
//        user.setIsVerified(false);
//        user.setCreatedAt(new Date());
//        userRepository.save(user);
//
//        emailSenderService.sendVerificationEmail(email, verificationToken);
//
//    }
//


    }
}
