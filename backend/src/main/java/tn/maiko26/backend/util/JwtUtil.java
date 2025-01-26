package tn.maiko26.backend.util;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import tn.maiko26.backend.exception.CustomException;
import tn.maiko26.backend.model.User;
import tn.maiko26.backend.service.UserService;

import java.util.Date;
import java.util.List;

@Slf4j
@Component
public class JwtUtil {

    private final UserService userService;
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.algorithm}")
    private String jwtAlgorithm;

    @Value("${jwt.expiration}")
    private String jwtExpiration;

    public JwtUtil(UserService userService) {
        this.userService = userService;
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(jwtExpiration)))
                .signWith(SignatureAlgorithm.valueOf(jwtAlgorithm), jwtSecret)
                .compact();
    }

    public void validateToken(String token) throws CustomException {

        Jwts.parser()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token);

    }

    public String extractEmail(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractTokenFromRequestHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        throw new JwtException("No token provided.");
    }

    public Authentication getAuthentication(String email) {
        User user = userService.getUserByEmail(email);
        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
        return new UsernamePasswordAuthenticationToken(email, null, authorities);
    }
}