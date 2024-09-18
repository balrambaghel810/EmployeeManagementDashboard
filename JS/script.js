// function toggleSidebar() {
//   const sidebar = document.getElementById("sidebar");
//   const isVisible = sidebar.style.transform === "translateX(0%)";
//   sidebar.style.transform = isVisible ? "translateX(-100%)" : "translateX(0%)";
// }

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const isVisible = sidebar.style.transform === "translateX(0%)";

  // Toggle the sidebar visibility
  sidebar.style.transform = isVisible ? "translateX(-100%)" : "translateX(0%)";

  // Show or hide the overlay based on the sidebar visibility
  overlay.style.display = isVisible ? "none" : "block";
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  // Hide the sidebar and the overlay when clicking outside
  sidebar.style.transform = "translateX(-100%)";
  overlay.style.display = "none";
}

function showForm() {
  // Your form display logic here
}

// ---------------------------------------cards data in localStorage --------------
// Show and hide the form
function showForm() {
  document.getElementById("employeeForm").style.display = "block";
}

function cancelForm() {
  document.getElementById("employeeForm").style.display = "none";
}

// --------------------------------------  --------------
function handleSubmit(event) {
  event.preventDefault();
  const designation = document.getElementById("designation").value;
  let url = "";

  switch (designation) {
    case "salesperson":
      url = "salesDepartment.html";
      break;
    case "trainer":
      url = "trainerDepartment.html";
      break;
    case "hr":
      url = "hrDepartment.html";
      break;
    case "telecaller":
      url = "telecallerDepartment.html";
      break;
    default:
      alert("Please select a designation");
      return;
  }

  // Collect form data
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  // Retrieve existing data from localStorage or initialize an empty array
  let employeeList = JSON.parse(localStorage.getItem(designation)) || [];
  employeeList.push(data); // Add the new employee data

  // Store updated data in localStorage
  localStorage.setItem(designation, JSON.stringify(employeeList));

  // Hide the form after submission
  document.getElementById("employeeForm").style.display = "none";

  // Show the success message
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";

  // Hide the success message after 2 seconds and stay on the home page
  setTimeout(() => {
    successMessage.style.display = "none";
    window.location.href = "index.html"; // Redirect to home page (or remove this line if not needed)
  }, 2000);
}
