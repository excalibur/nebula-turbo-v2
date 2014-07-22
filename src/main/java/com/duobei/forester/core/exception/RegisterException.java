package com.duobei.forester.core.exception;

/**
 * [description]
 *
 * @author faith
 * @since 0.0.1
 */
public class RegisterException extends Exception{

    public RegisterException() {
        super();
    }

    public RegisterException(String message) {
        super(message);
    }

    public RegisterException(String message, Throwable cause) {
        super(message, cause);
    }

    public RegisterException(Throwable cause) {
        super(cause);
    }
}
