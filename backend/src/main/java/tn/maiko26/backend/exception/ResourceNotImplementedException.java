package tn.maiko26.backend.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotImplementedException extends CustomException {
    public ResourceNotImplementedException() {
        super("This feature is not Implemented", HttpStatus.NOT_IMPLEMENTED);
    }
}