document.addEventListener("DOMContentLoaded", () => {
  const designation = "trainer"; // Adjust this based on the current page
  const employees = JSON.parse(localStorage.getItem(designation)) || [];

  if (employees.length === 0) {
    document.getElementById("noDataMessage").style.display = "block";
  } else {
    document.getElementById("noDataMessage").style.display = "none";
    displayEmployees(employees);
  }
});

function displayEmployees(employees) {
  const tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = ""; // Clear existing data

  employees.forEach((employee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${employee.name}</td>
          <td>${employee.number}</td>
          <td>${employee.designation}</td>
          <td>${employee.salary}</td>
          <td>${employee.gender}</td>
          <td><img src="${employee.image}" alt="Employee Image"></td>
          <td>
              <button class="edit" onclick="editEmployee(${index})">✎</button>
              <button class="delete" onclick="deleteEmployee(${index})">🗑️</button>
          </td>
      `;
    tbody.appendChild(row);
  });
}

function editEmployee(index) {
  const designation = "trainer"; // Adjust this based on the current page
  const employees = JSON.parse(localStorage.getItem(designation)) || [];
  const employee = employees[index];

  document.getElementById("employeeForm").style.display = "block";
  document.getElementById("employeeIndex").value = index;
  document.getElementById("name").value = employee.name;
  document.getElementById("number").value = employee.number;
  document.getElementById("designation").value = employee.designation;
  document.getElementById("salary").value = employee.salary;
  document.getElementById("gender").value = employee.gender;
  document.getElementById("image").value = employee.image;
}

function deleteEmployee(index) {
  const designation = "trainer"; // Adjust this based on the current page
  const employees = JSON.parse(localStorage.getItem(designation)) || [];
  employees.splice(index, 1);
  localStorage.setItem(designation, JSON.stringify(employees));
  location.reload(); // Refresh the page to update the table
}

document
  .getElementById("employeeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const index = document.getElementById("employeeIndex").value;
    let designation = document.getElementById("designation").value;
    const currentDesignation = "trainer"; // Adjust this based on the current page
    let employees = JSON.parse(localStorage.getItem(currentDesignation)) || [];

    const updatedEmployee = {
      name: document.getElementById("name").value,
      number: document.getElementById("number").value,
      designation: designation,
      salary: document.getElementById("salary").value,
      gender: document.getElementById("gender").value,
      image:
        document.getElementById("image").value || "path/to/default-image.jpg",
    };

    if (index !== "") {
      // Remove from the current designation if changed
      if (employees[index].designation !== designation) {
        deleteEmployee(index);
        employees = JSON.parse(localStorage.getItem(designation)) || [];
        employees.push(updatedEmployee);
      } else {
        employees[index] = updatedEmployee;
      }
    } else {
      employees.push(updatedEmployee);
    }

    // Update localStorage
    localStorage.setItem(currentDesignation, JSON.stringify(employees));
    if (designation !== currentDesignation) {
      // Move data to the new designation
      let newDesignationEmployees =
        JSON.parse(localStorage.getItem(designation)) || [];
      newDesignationEmployees.push(updatedEmployee);
      localStorage.setItem(
        designation,
        JSON.stringify(newDesignationEmployees)
      );
    }

    document.getElementById("employeeForm").style.display = "none";
    document.getElementById("successMessage").style.display = "block";
    setTimeout(() => {
      document.getElementById("successMessage").style.display = "none";
    }, 2000);

    displayEmployees(employees); // Update the table
  });

function cancelForm() {
  document.getElementById("employeeForm").style.display = "none";
}

document.getElementById("backToHome").addEventListener("click", () => {
  window.location.href = "index.html"; // Adjust to the correct path if necessary
});
