package tn.maiko26.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.maiko26.backend.service.AuthenticationService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication",description = "Authentication Endpoints")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService){
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestData request) {
        try {
            String token = authenticationService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok().body(new AuthResponse(token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> payload) {
        String sessionId = payload.get("verificationToken");

        authenticationService.logout(sessionId);
        return ResponseEntity.ok().body("Logged out successfully");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestData request) {

        authenticationService.register(request.getEmail(), request.getPassword(),request.getName());
        return ResponseEntity.ok().body(Map.of("message", "Email Sent Successfully"));

    }




}

@Data
class LoginRequestData {
    private String email;
    private String password;
}

@Data
class RegisterRequestData {
    private String email;
    private String password;
    private String name;
}

class PasswordResetRequestDTO {
    private String newPassword;
    private String resetPasswordToken;

    public PasswordResetRequestDTO() {
    }

    public String getNewPassword() {
        return this.newPassword;
    }

    public String getResetPasswordToken() {
        return this.resetPasswordToken;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public void setResetPasswordToken(String resetPasswordToken) {
        this.resetPasswordToken = resetPasswordToken;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof PasswordResetRequestDTO)) return false;
        final PasswordResetRequestDTO other = (PasswordResetRequestDTO) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$newPassword = this.getNewPassword();
        final Object other$newPassword = other.getNewPassword();
        if (this$newPassword == null ? other$newPassword != null : !this$newPassword.equals(other$newPassword))
            return false;
        final Object this$resetPasswordToken = this.getResetPasswordToken();
        final Object other$resetPasswordToken = other.getResetPasswordToken();
        if (this$resetPasswordToken == null ? other$resetPasswordToken != null : !this$resetPasswordToken.equals(other$resetPasswordToken))
            return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof PasswordResetRequestDTO;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $newPassword = this.getNewPassword();
        result = result * PRIME + ($newPassword == null ? 43 : $newPassword.hashCode());
        final Object $resetPasswordToken = this.getResetPasswordToken();
        result = result * PRIME + ($resetPasswordToken == null ? 43 : $resetPasswordToken.hashCode());
        return result;
    }

    public String toString() {
        return "PasswordResetRequestDTO(newPassword=" + this.getNewPassword() + ", resetPasswordToken=" + this.getResetPasswordToken() + ")";
    }
}

class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
