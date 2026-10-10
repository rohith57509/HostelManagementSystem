package com.hostel.hostelmanagement.config;

import com.hostel.hostelmanagement.entity.StudentLocation;
import com.hostel.hostelmanagement.entity.User;
import com.hostel.hostelmanagement.enums.Role;
import com.hostel.hostelmanagement.repository.StudentLocationRepository;
import com.hostel.hostelmanagement.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seed(UserRepository userRepo, PasswordEncoder enc, StudentLocationRepository locRepo) {
        return args -> {
            if (!userRepo.existsByEmail("admin@hostel.com")) {
                userRepo.save(new User("System Admin", "admin@hostel.com", enc.encode("admin123"), Role.ADMIN));
            }
            if (!userRepo.existsByEmail("warden@hostel.com")) {
                userRepo.save(new User("Demo Warden", "warden@hostel.com", enc.encode("warden123"), Role.WARDEN));
            }
            if (!userRepo.existsByEmail("student@hostel.com")) {
                User s = new User("Demo Student", "student@hostel.com", enc.encode("student123"), Role.STUDENT);
                s.setStudentId("STU-2026-001");
                s.setDepartment("Computer Science");
                userRepo.save(s);
            }

            // Seed sample locations for demo students if empty
            if (locRepo.count() == 0) {
                List<User> students = userRepo.findAll().stream()
                        .filter(u -> u.getRole() == Role.STUDENT)
                        .toList();

                if (!students.isEmpty()) {
                    // Demo Student 1: Inside Campus
                    User s1 = students.get(0);
                    locRepo.save(new StudentLocation(s1, 28.6139, 77.2090, "Hostel Block A - Study Room", "ON_CAMPUS", true));

                    // Other students if exist
                    if (students.size() > 1) {
                        locRepo.save(new StudentLocation(students.get(1), 28.6145, 77.2105, "Central Dining Hall", "ON_CAMPUS", true));
                    }
                    if (students.size() > 2) {
                        locRepo.save(new StudentLocation(students.get(2), 28.6250, 77.2180, "Off-Campus City Market", "OFF_CAMPUS", true));
                    }
                    if (students.size() > 3) {
                        locRepo.save(new StudentLocation(students.get(3), 28.5355, 77.3910, "Metro Station (Outstation Leave)", "OFF_CAMPUS", true));
                    }
                }
            }
        };
    }
}