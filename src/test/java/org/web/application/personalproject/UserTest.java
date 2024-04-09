package org.web.application.personalproject;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.web.application.personalproject.repository.UserRepository;

@SpringBootTest
public class UserTest {
    @Autowired
    UserRepository userRepository;

    @Test
    public void userTest(){
        userRepository.deleteByEmail("qwer");
    }
}
