package org.web.application.personalproject.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageDTO {
    private String pageName;
    private String pageContent;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
}
