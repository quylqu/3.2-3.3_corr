package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.entities.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    List<Role> findAllRole();

    Set<Role> findByIdRoles(List<Long> roles);
}
