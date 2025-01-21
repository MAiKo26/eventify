package tn.maiko26.backend.exception;

import jakarta.servlet.ServletException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.ErrorResponse;


@Getter
public class CustomException extends RuntimeException {
    private final HttpStatus statusCode;

    public CustomException(String message, HttpStatus statusCode) {
        super(message);
        this.statusCode = statusCode;

    }

    public CustomException(HttpStatus statusCode) {
        this.statusCode = statusCode;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof CustomException)) return false;
        final CustomException other = (CustomException) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getStatusCode() != other.getStatusCode()) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof CustomException;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + this.getStatusCode().value();
        return result;
    }

    public String toString() {
        return "CustomException(statusCode=" + this.getStatusCode() + ")";
    }
}