package com.empmanage.Controller;


import com.empmanage.Model.Employee;
import com.empmanage.Service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// REST controller for managing employee-related requests
@RestController  // Marks this class as a REST controller
@RequestMapping("/employees")  // Base URL for all employee-related APIs
@CrossOrigin(origins = "http://127.0.0.1:5500") // Allow requests from your frontend domain
public class EmployeeController {

    @Autowired
    private final EmployeeService employeeService;

    // Constructor injection for the service
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping  // Handles HTTP POST requests for adding a new employee
    public ResponseEntity<Employee> addEmployee(@Valid @RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.addEmployee(employee));
    }

    @GetMapping  // Handles HTTP GET requests to fetch all employees
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PutMapping("/{id}") // Handles HTTP PUT requests to update an employee by ID
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @Valid @RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employee));
    }

    @DeleteMapping("/{id}")  // Handles HTTP DELETE requests to delete an employee by ID
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
