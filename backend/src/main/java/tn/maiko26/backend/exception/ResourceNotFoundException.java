package tn.maiko26.backend.exception;


import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends CustomException {
    public ResourceNotFoundException() {
        super("Endpoint not found.", HttpStatus.NOT_FOUND);

    }
}