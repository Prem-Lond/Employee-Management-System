package com.empmanage.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity // Marks this class as a JPA entity
@Data // Lombok annotation to generate getters, setters, equals, hashCode, and toString methods
@Table(name = "employees",uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class Employee {


    @Id  // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increments the ID in the database
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 3,message = "Name must be at least 3 character long")
    private String name;

    @NotBlank(message = "Email is required")   // Validates that the name is not null or empty
    @Email(message = "Email should be valid")   // Ensures the name has a minimum length
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "\\d{10}",message = "Phone number must be 10 digits")  // Ensures the phone number is exactly 10 digits
    private String phone;

    @NotBlank(message = "Department is required")
    private String department;

    @CreationTimestamp  // Automatically sets the creation timestamp
    @Column(updatable = false)   // Ensures this field cannot be updated
    private LocalDateTime createdAt;

    @UpdateTimestamp   // Automatically updates the timestamp on modifications
    private LocalDateTime updatedAt;

}
