const loginLink = document.getElementById('login-link');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeButtonLogin = document.querySelector('#login-modal .close-button');
const closeButtonSignup = document.querySelector('#signup-modal .close-button');
const signupButton = document.querySelector('.signup-button');
const toggleButton = document.getElementById('toggle-header');
const headerNav = document.getElementById('header-nav');
const banner = document.querySelector('.banner');
const bannerImages = document.querySelectorAll('.banner img');


// Open login modal
loginLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginModal.style.display = 'flex';
});

// Close login modal
closeButtonLogin.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

// Open signup modal from login modal
signupButton.addEventListener('click', () => {
  loginModal.style.display = 'none'; // Close login modal
  signupModal.style.display = 'flex'; // Open signup modal
});

// Close signup modal
closeButtonSignup.addEventListener('click', () => {
  signupModal.style.display = 'none';
});

// Close modals when clicking outside
loginModal.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = 'none';
  }
});

signupModal.addEventListener('click', (e) => {
  if (e.target === signupModal) {
    signupModal.style.display = 'none';
  }
});

// Toggle header navigation
toggleButton.addEventListener('click', () => {
  headerNav.classList.toggle('show'); // Toggle the 'show' class
});

// Banner auto-change feature
let currentIndex = 0;

function updateBanner() {
  bannerImages.forEach((img, index) => {
    img.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
  });
  currentIndex = (currentIndex + 1) % bannerImages.length;
}

setInterval(updateBanner, 5000); // Change banner every 3 seconds

// Initialize banner position
updateBanner();


document.addEventListener("DOMContentLoaded", function () {
  // Select all "Donate Now" buttons
  const donateButtons = document.querySelectorAll(".donate-button");
  const donateModal = document.getElementById("donate-modal");
  const closeDonateButton = donateModal.querySelector(".close-button");

  // Add click event to each "Donate Now" button
  donateButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior
      donateModal.style.display = "block"; // Show the modal
    });
  });

  // Close modal when the close button is clicked
  closeDonateButton.addEventListener("click", function () {
    donateModal.style.display = "none"; // Hide the modal
  });

  // Optional: Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === donateModal) {
      donateModal.style.display = "none"; // Hide the modal
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const donateElement = document.getElementById("donate"); // Element with ID "donate"
  const donateModal = document.getElementById("donate-modal"); // Modal to show
  const closeDonateButton = donateModal.querySelector(".close-button"); // Close button in modal

  // Event listener to open the modal when clicking "donate" element
  donateElement.addEventListener("click", function () {
    donateModal.style.display = "block"; // Show the modal
  });

  // Event listener to close the modal when clicking the close button
  closeDonateButton.addEventListener("click", function () {
    donateModal.style.display = "none"; // Hide the modal
  });

  // Optional: Close the modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === donateModal) {
      donateModal.style.display = "none"; // Hide the modal
    }
  });
});
