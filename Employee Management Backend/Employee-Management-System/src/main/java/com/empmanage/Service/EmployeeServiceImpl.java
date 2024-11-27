package com.empmanage.Service;

import com.empmanage.Exception.ResourceNotFoundException;
import com.empmanage.Model.Employee;
import com.empmanage.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// Service implementation class for managing employees
@Service  // Marks this class as a Spring service which contain buisness logic
public class EmployeeServiceImpl implements EmployeeService {


    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee addEmployee(Employee employee) {
        // Saves a new employee to the database
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        // Fetches all employees from the database
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        // Fetches an employee by ID, throws an exception if not found
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        // Updates an existing employee's details
        Employee existingEmployee = getEmployeeById(id);
        existingEmployee.setName(employee.getName());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setPhone(employee.getPhone());
        existingEmployee.setDepartment(employee.getDepartment());
        return employeeRepository.save(existingEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        // Deletes an employee by ID
        Employee existingEmployee = getEmployeeById(id);
        employeeRepository.delete(existingEmployee);
    }
}
