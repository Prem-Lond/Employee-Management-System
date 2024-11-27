package com.empmanage.Service;

import com.empmanage.Model.Employee;

import java.util.List;

// Service interface defining operations for managing employees
public interface EmployeeService {

    Employee addEmployee(Employee employee);  // Adds a new employee
    List<Employee> getAllEmployees();   // Fetches all employees
    Employee getEmployeeById(Long id);  // Fetches a specific employee by ID
    Employee updateEmployee(Long id,Employee employee);  // Updates employee details
    void deleteEmployee(Long id);  // Deletes an employee by ID

}
