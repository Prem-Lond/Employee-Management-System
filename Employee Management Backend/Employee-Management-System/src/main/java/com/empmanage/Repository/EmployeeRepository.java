package com.empmanage.Repository;

import com.empmanage.Model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


// Repository interface for Employee entity
// JpaRepository provides built-in methods for CRUD operations
@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
}
