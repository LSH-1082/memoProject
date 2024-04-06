package org.web.application.personalproject.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.web.application.personalproject.dto.UserDTO;
import org.web.application.personalproject.entity.UserEntity;
import org.web.application.personalproject.repository.UserRepository;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public boolean existCheckEmail(UserDTO dto){
        return userRepository.existEmail(dto.getEmail());
    }

    public String login(UserDTO dto) {
        if(!existCheckEmail(dto)) return "Login failed";
            //password 만 가져와서 비교하면 되는거잖아 차피 아이디는 존재하는지 if 문에서 체크 했으니까
        String checkPass = userRepository.findPassword(userRepository.findIdx(dto.getEmail()));
        if(checkPass.equals(dto.getPassword())) return "Login success";
        else return "Login failed";
    }

    public String register(UserDTO dto) {
        //todo 이메일 맨 앞부분이나 중간에 띄어쓰기 있으면 판별 못함 해결 해야함
        if(dto.getPassword().isEmpty() || dto.getName().isEmpty() || dto.getEmail().isEmpty()) return "Not fill";
        if(existCheckEmail(dto)) return "Already exists email";
        UserEntity entity = UserEntity.builder()
                .email(dto.getEmail())
                .name(dto.getName())
                .password(dto.getPassword())    //todo password를 해쉬암호 해서 넣어야 한다
                .img("default") //프로필 사진 컬럼 옵션 설정이 not null 이기때문에 기본 이미지 Path 를 넣어준다

                .createDate(LocalDateTime.now())    //todo 나중에 시간 자동으로 넣어주게 한다
                .modifyDate(LocalDateTime.now())
                .build();
        userRepository.save(entity);
        return "Register success";
    }
}