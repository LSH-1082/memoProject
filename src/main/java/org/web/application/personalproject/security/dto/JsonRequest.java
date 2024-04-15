package org.web.application.personalproject.security.dto;

import lombok.Builder;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Builder
public class JsonRequest {
    private String code;
    private String msg;
    private LocalDateTime time;
}
