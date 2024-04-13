package org.web.application.personalproject.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestHeader;
import org.web.application.personalproject.dto.UserDTO;
import org.web.application.personalproject.entity.UserEntity;
import org.web.application.personalproject.repository.UserRepository;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;


    public boolean existCheckEmail(UserDTO dto){
        return userRepository.existsByEmail(dto.getEmail());
    }

    public String login(UserDTO dto, HttpServletRequest req) {
        String username = dto.getEmail();
        String password = dto.getPassword();

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);

        token.setDetails(new WebAuthenticationDetails(req));

        Authentication auth = authenticationManager.authenticate(token);

        log.info("인증 여부: " + auth.isAuthenticated());

        User authUser = (User) auth.getPrincipal();

        log.info("유저 정보: " + authUser.getUsername());

        SecurityContextHolder.getContext().setAuthentication(auth);

        return null;
    }

    public String register(UserDTO dto) {
        try{
            if(!dto.getPassword().equals(dto.getPasswordCheck())) return "Password not equal";
            if(existCheckEmail(dto)) return "Email exists";

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity entity = UserEntity.builder()
                    .email(dto.getEmail())
                    .password(dto.getPassword())
                    .name(dto.getName())
                    .img("default")
                    .createDate(LocalDateTime.now())
                    .modifyDate(LocalDateTime.now())
                    .build();
            userRepository.save(entity);

            return "Register success";
        }
        catch(Exception e){
            log.error("Register Error: " + e);
            return "Login failed";
        }

    }

    public UserDTO getUserInfo(@RequestHeader(name = "Authorization") String header){

        return null;
    }

    @Transactional
    public String delete(UserDTO dto){
        if(userRepository.findByEmail(dto.getEmail()) == null) return "Delete failed";
        if(userRepository.deleteByEmail(dto.getEmail()) != null) return "Delete success";
        else return "Delete failed";
    }
}