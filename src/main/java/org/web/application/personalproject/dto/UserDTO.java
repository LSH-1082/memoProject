package org.web.application.personalproject.dto;

import lombok.*;


@Builder
@Getter
@Setter
public class UserDTO {

    private String email;

    private String name;

    private String password;
}