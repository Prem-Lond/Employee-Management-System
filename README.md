# Setup and Run Instructions

## Backend Setup:

### Clone the repository:
bash
Copy code

git clone https://github.com/Prem-Lond/Employee-Management-System.git

cd Employee-Management-System


Open the project in an IDE like IntelliJ or Eclipse.
Configure the database connection in application.properties and change username and password which is your mysql workbench:

 


# Configure the database connection in application.properties:
Set up your MySQL database configuration in the application.properties file. Change the username and password based on your MySQL Workbench credentials.


spring.datasource.url = jdbc:mysql://localhost:3306/empmanage?createDatabaseIfNotExist=true

spring.datasource.username = root

spring.datasource.password = prem123

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto = update


# Enable Cross-Origin Resource Sharing (CORS): 

Replace the frontend URL with the correct URL for your frontend in the Cross-Origin setting in the EmployeeController.

@RestController

@CrossOrigin(origins = "http://127.0.0.1:5500")

@RequestMapping("/employees")

public class EmployeeController {

}



# Run the Spring Boot application:
bash
Copy code
./mvnw spring-boot:run



# Frontend Setup:

Add the Employee Management System Fronend Folder in Vs-Code and open with live server 


# Brief Descriptions of Implemented Features

## Backend Features - 

### 1. CRUD Operations:

The system supports Create, Read, Update, and Delete operations for employee data.
Data is managed through RESTful APIs.

### 2. Validation:

Name: Must be at least 3 characters long.

Email: Must be unique and follow a valid email format.

Phone: Must be a valid 10-digit number.

Department: Required field.

### 3. Exception Handling:

Handles duplicate email entries with appropriate error messages.

Returns meaningful responses for invalid input.

### 4. Database Integration:

Data is stored in a MySQL database, with tables automatically created by Spring Boot's JPA.


## Frontend Features - 

### 1. Responsive Design:

The UI is designed using HTML, CSS, and Bootstrap to ensure responsiveness on various devices.

### 2. Employee List:

Displays all employees in a dynamic table with pagination.

### 3. Add Employee:

Popup form to add a new employee with input validation.

### 4. Update Employee:

Popup form pre-filled with employee details for updating information.

### 5. Validation:

Name: Must be at least 3 characters long.

Email: Must be unique and follow a valid email format.

Phone: Must be a valid 10-digit number.

Department: Required field.

### 6. Search:

Filter employees by name or department.

### 7. Pagination:

Allows navigation between pages for
