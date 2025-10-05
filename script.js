"use strict";

// Global variables
let currentPage = 1;
const totalPages = 4;

// Google Sheets configuration
const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  // Set up form event listeners
  setupFormListeners();

  // Set up keyboard navigation
  setupKeyboardNavigation();

  // Initialize page display
  showPage(1);
}

// Page navigation functions
function showPage(pageNumber) {
  // Hide all pages
  const pages = document.querySelectorAll(".invitation-page");
  pages.forEach((page) => {
    page.style.display = "none";
  });

  // Show the requested page
  const targetPage = document.getElementById(`page${pageNumber}`);
  if (targetPage) {
    targetPage.style.display = "flex";
    currentPage = pageNumber;

    // Update page indicators
    updatePageIndicators();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function showPage1() {
  showPage(1);
}

function showPage2() {
  showPage(2);
}

function showPage3() {
  showPage(3);
}

function showPage4() {
  showPage(4);
}

function updatePageIndicators() {
  const nextBtn = document.querySelector(".next-page-btn");
  const prevBtn = document.querySelector(".prev-page-btn");

  if (nextBtn) {
    nextBtn.style.display = currentPage < totalPages ? "block" : "none";
  }

  if (prevBtn) {
    prevBtn.style.display = currentPage > 1 ? "block" : "none";
  }
}

// RSVP Modal functions
function openRSVPForm(event) {
  // Prevent event bubbling to parent clickable card
  if (event) {
    event.stopPropagation();
  }

  const modal = document.getElementById("rsvpModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus on first input
    const firstInput = modal.querySelector("input");
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
}

function closeRSVPForm() {
  const modal = document.getElementById("rsvpModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";

    // Reset form
    resetRSVPForm();
  }
}

function resetRSVPForm() {
  const form = document.getElementById("rsvpForm");
  if (form) {
    form.reset();
  }
}

// Form setup and validation
function setupFormListeners() {
  const form = document.getElementById("rsvpForm");

  if (form) {
    form.addEventListener("submit", handleFormSubmission);
  }
}

// Form submission handling
async function handleFormSubmission(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector(".submit-btn");
  const formData = new FormData(form);

  // Disable submit button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    // Validate form
    if (!validateForm(formData)) {
      throw new Error("Please fill in all required fields");
    }

    // Prepare data for submission
    const rsvpData = prepareRSVPData(formData);

    // Submit to Google Sheets
    await submitToGoogleSheets(rsvpData);

    // Show success message
    showSuccessMessage();

    // Close modal
    closeRSVPForm();
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    showErrorMessage(error.message);
  } finally {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit RSVP";
  }
}

function validateForm(formData) {
  const requiredFields = ["guestName", "attendance"];

  for (const field of requiredFields) {
    if (!formData.get(field) || formData.get(field).trim() === "") {
      return false;
    }
  }

  return true;
}

function prepareRSVPData(formData) {
  const data = {
    timestamp: new Date().toISOString(),
    guestName: formData.get("guestName"),
    phone: formData.get("phone") || "",
    attendance: formData.get("attendance"),
    message: formData.get("message") || "",
  };

  return data;
}

// Google Sheets integration
async function submitToGoogleSheets(data) {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("RSVP submitted successfully:", result);
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);

    // For development/testing, you can uncomment the following line
    // to simulate successful submission when Google Sheets is not set up
    // console.log('Simulated submission:', data);

    throw new Error("Failed to submit RSVP. Please try again later.");
  }
}

// Success and error message handling
function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function showErrorMessage(message) {
  // Create a simple alert for now - you can enhance this with a proper modal
  alert(`Error: ${message}`);
}

// Keyboard navigation
function setupKeyboardNavigation() {
  document.addEventListener("keydown", function (event) {
    // Close modals with Escape key
    if (event.key === "Escape") {
      closeRSVPForm();
      closeSuccessMessage();
    }

    // Page navigation with arrow keys
    if (event.key === "ArrowLeft" && currentPage > 1) {
      showPage(currentPage - 1);
    } else if (event.key === "ArrowRight" && currentPage < totalPages) {
      showPage(currentPage + 1);
    }
  });
}

// Utility functions
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatTime(time) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(time);
}

// Image loading optimization
function optimizeImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.loading = "lazy";
    img.addEventListener("error", function () {
      // Fallback for missing images
      this.style.display = "none";
    });
  });
}

// Initialize image optimization when DOM is loaded
document.addEventListener("DOMContentLoaded", optimizeImages);

// Smooth scrolling for better UX
function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add smooth scrolling to page navigation
const originalShowPage = showPage;
showPage = function (pageNumber) {
  originalShowPage(pageNumber);
  smoothScrollToTop();
};

// Export functions for global access
window.showPage1 = showPage1;
window.showPage2 = showPage2;
window.showPage3 = showPage3;
window.showPage4 = showPage4;
window.openRSVPForm = openRSVPForm;
window.closeRSVPForm = closeRSVPForm;
window.closeSuccessMessage = closeSuccessMessage;
