package org.prateek.blog.blogapplicationapi.controllers;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.prateek.blog.blogapplicationapi.auth.service.AuthService;
import org.prateek.blog.blogapplicationapi.auth.service.JwtService;
import org.prateek.blog.blogapplicationapi.auth.service.RefreshTokenService;
import org.prateek.blog.blogapplicationapi.auth.utils.AuthResponse;
import org.prateek.blog.blogapplicationapi.auth.utils.LoginRequest;
import org.prateek.blog.blogapplicationapi.auth.utils.RegisterRequest;
import org.prateek.blog.blogapplicationapi.entities.RefreshToken;
import org.prateek.blog.blogapplicationapi.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest){
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response){
        return ResponseEntity.ok(authService.login(loginRequest, response));
    }

    @GetMapping("/refresh_token")
    public ResponseEntity<AuthResponse> refreshToken(@CookieValue String refreshToken){
        System.out.println("RF : "+refreshToken);
        RefreshToken verified_refreshToken = this.refreshTokenService.verifyRefreshToken(refreshToken);
        User user = verified_refreshToken.getUser();
        String accessToken = jwtService.generateToken(user);
        AuthResponse authResponse = new AuthResponse(accessToken, verified_refreshToken.getRefreshToken(), user);
        return ResponseEntity.ok(authResponse);
    }
}
