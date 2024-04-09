package org.web.application.personalproject.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class PageDTO {
    private String pageName;
    private String pageContent;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
}
