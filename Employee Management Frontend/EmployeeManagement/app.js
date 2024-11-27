const baseUrl = "http://localhost:8080/employees";
let employees = [];
let filteredEmployees = [];
let currentPage = 1;
let pageSize = 5;
let editingEmployee = null; // To keep track of the employee being edited
let deletingEmployee = null; // To track the employee being deleted

// Fetch employees
async function fetchEmployees() {
  try {
    const response = await axios.get(baseUrl);
    employees = response.data;
    filteredEmployees = [...employees];
    renderTable();
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
}

// Add or Update employee
async function saveEmployee(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const department = document.getElementById("department").value;

  clearValidationErrors();

  if (name.length < 3) {
    showValidationError("name", "Name must be at least 3 characters long.");
    return;
  }

  if (!validateEmail(email)) {
    showValidationError(email, msg);
    return;
  }

  if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    showValidationError("phone", "Phone number must be 10 digits.");
    return;
  }

  if (!department) {
    showValidationError("department", "Department is required.");
    return;
  }

  const employee = { name, email, phone, department };

  try {
    if (editingEmployee) {
      // Update existing employee
      await axios.put(`${baseUrl}/${editingEmployee.id}`, employee);
      showAlert("Employee updated successfully.");
    } else {
      // Add new employee
      await axios.post(baseUrl, employee);
      showAlert("Employee added successfully.");
    }

    fetchEmployees();
    closeForm();
  } catch (error) {
    console.error("Error saving employee:", error);
  }
}

// Show validation error for a field
function showValidationError(fieldId, message) {
  const field = document.getElementById(fieldId);
  field.classList.add("is-invalid");
  let errorElement = field.parentNode.querySelector(".invalid-feedback");
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.classList.add("invalid-feedback");
    field.parentNode.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

// Clear validation errors
function clearValidationErrors() {
  const invalidFields = document.querySelectorAll(".is-invalid");
  invalidFields.forEach((field) => field.classList.remove("is-invalid"));
  const errorMessages = document.querySelectorAll(".invalid-feedback");
  errorMessages.forEach((msg) => msg.remove());
}

// // Validate email format
// function validateEmail(email) {
//   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//   return emailPattern.test(email) && !isEmailTaken(email);
// }
// Show validation error for email explicitly
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showValidationError("email", "Invalid email format.");
    return false;
  }

  if (
    employees.some(
      (emp) => emp.email === email && emp.id !== (editingEmployee?.id || null)
    )
  ) {
    showValidationError("email", "Email already exists.");
    return false;
  }
  return true;
}

// Check if email is already taken
function isEmailTaken(email) {
  return employees.some(
    (employee) =>
      employee.email === email &&
      (!editingEmployee || employee.id !== editingEmployee.id)
  );
}

// Handle pagination
function handlePagination() {
  const pageCount = Math.ceil(filteredEmployees.length / pageSize);
  const paginationElement = document.getElementById("pagination");

  paginationElement.innerHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    const button = document.createElement("button");
    button.classList.add("page-link");
    button.textContent = i;
    button.onclick = () => changePage(i);
    li.appendChild(button);
    paginationElement.appendChild(li);
  }

  // Show the current page
  document.querySelectorAll(".page-item").forEach((item, index) => {
    if (index === currentPage - 1) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Change page function
function changePage(page) {
  currentPage = page;
  renderTable();
}

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString("en-GB", options).replace(",", ""); // Format as DD/MM/YYYY HH:mm:ss
}

// Render the employee table
function renderTable() {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);
  const tableBody = document.getElementById("employee-table-body");
  tableBody.innerHTML = "";

  currentEmployees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.department}</td>
            <td>${formatDateTime(employee.createdAt)}</td>
            <td>${formatDateTime(employee.updatedAt)}</td>
            <td>
                <button class="btn btn-info" onclick="editEmployee(${
                  employee.id
                })"><i class="fas fa-edit"></i> <!-- Solid style edit icon --> Edit</button>
                <button class="btn btn-danger" onclick="confirmDelete(${
                  employee.id
                })"><i class="far fa-trash-alt"></i> <!-- Regular style trash icon --> Delete</button>
            </td>
        `;
    tableBody.appendChild(row);
  });

  handlePagination();
}

// Sort employees by name
document.getElementById("sort-name-btn").addEventListener("click", function () {
  filteredEmployees.sort((a, b) => a.name.localeCompare(b.name));
  renderTable();
});

// Sort employees by department
document
  .getElementById("sort-department-btn")
  .addEventListener("click", function () {
    filteredEmployees.sort((a, b) => a.department.localeCompare(b.department));
    renderTable();
  });

// Edit employee
function editEmployee(id) {
    showForm();
  editingEmployee = employees.find((employee) => employee.id === id);
  document.getElementById("name").value = editingEmployee.name;
  document.getElementById("email").value = editingEmployee.email;
  document.getElementById("phone").value = editingEmployee.phone;
  document.getElementById("department").value = editingEmployee.department;
  document.getElementById("form-title").textContent = "Edit Employee";
  document.getElementById("employee-form-popup").style.display = "flex";
}

// Open delete confirmation popup
function confirmDelete(id) {
  deletingEmployee = id;
  document.getElementById("delete-confirmation-popup").style.display = "flex";
}

// Close delete confirmation popup
function closeDeleteConfirmation() {
  deletingEmployee = null;
  document.getElementById("delete-confirmation-popup").style.display = "none";
}

// Delete employee
async function deleteEmployee() {
  try {
    await axios.delete(`${baseUrl}/${deletingEmployee}`);
    showAlert("Employee deleted successfully."); // Use Bootstrap alert instead of JS alert
    fetchEmployees();
    closeDeleteConfirmation();
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
}

// function showAlert(message) {
//   const alertContainer = document.createElement("div");
//   alertContainer.classList.add(
//     "alert",
//     "alert-success",
//     "alert-dismissible",
//     "fade",
//     "show"
//   );
//   alertContainer.role = "alert";
//   alertContainer.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
//   document.body.appendChild(alertContainer);

//   // Auto-remove the alert after 5 seconds
//   setTimeout(() => {
//     alertContainer.remove();
//   }, 3000);
// }

function showAlert(message) {
  const alertContainer = document.createElement("div");
  alertContainer.classList.add(
    "alert",
    "alert-success",
    "alert-dismissible",
    "fade",
    "show",
    "position-absolute",
    "top-0",
    "start-50",
    "translate-middle-x",
    "mt-3",
    "shadow"
  );
  alertContainer.style.zIndex = "1055"; // Ensure it appears above other elements
  alertContainer.style.maxWidth = "400px"; // Restrict the width

  alertContainer.role = "alert";
  alertContainer.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  document.body.appendChild(alertContainer);

  // Auto-remove the alert after 3 seconds
  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
}

function showForm() {
  document.getElementById("employee-form-popup").style.display = "block";
  document.getElementById("pagination").style.display = "none"; // Hide pagination
}

// Close form
function closeForm() {
  document.getElementById("employee-form-popup").style.display = "none";
  document.getElementById("employee-form").reset();
  document.getElementById("pagination").style.display = "flex"; // Show pagination
  clearValidationErrors();
  editingEmployee = null;
}

// Search functionality
document.getElementById("search-input").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query)
  );
  renderTable();
});

// Open Add Employee form
document
  .getElementById("add-employee-btn")
  .addEventListener("click", function () {
    editingEmployee = null;
    document.getElementById("form-title").textContent = "Add Employee";
    document.getElementById("employee-form-popup").style.display = "flex";
  });

// Event listener for form submission
document
  .getElementById("employee-form")
  .addEventListener("submit", saveEmployee);

// Initial fetch of employees
fetchEmployees();
