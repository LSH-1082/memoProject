package org.web.application.personalproject.security.filter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.web.application.personalproject.entity.UserEntity;
import org.web.application.personalproject.security.dto.CustomUserDetails;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String authorization = request.getHeader("Authorization");
            if (authorization == null || !authorization.startsWith("Bearer ")) {
                log.error("Token Error: Token is NULL");
                filterChain.doFilter(request, response);
                return;
            }

            String token = authorization.replace("Bearer ", "");
            jwtUtil.isExpired(token);

            String email = jwtUtil.getUsername(token);
            String name = jwtUtil.getName(token);

            UserEntity userEntity = UserEntity.builder()
                    .email(email)
                    .name(name)
                    .build();
            CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);

            Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authToken);

            filterChain.doFilter(request, response);
        }
        catch(ExpiredJwtException e){
            log.error("Token Error: Token is expired");
            filterChain.doFilter(request, response);
        }
    }
}