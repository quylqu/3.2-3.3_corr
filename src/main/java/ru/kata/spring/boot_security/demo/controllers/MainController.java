package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {
    @GetMapping("/")
    public String mainPage() {
        return "index";
    }
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

}