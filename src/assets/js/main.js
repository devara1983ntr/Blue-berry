// Blueberry - main.js

// --- Configuration & Constants ---
const API_BASE_URL = 'https://api.example.com'; // Placeholder for a real API

// --- Global State ---
const AppState = {
  isAgeVerified: localStorage.getItem('isAgeVerified') === 'true',
  currentUser: null,
  theme: 'dark', // 'light' or 'dark'
};

// --- Component Loader ---
// Injects reusable HTML components into the page
const loadComponent = async (componentName, targetElementId) => {
  try {
    const response = await fetch(`../components/${componentName}.html`);
    if (!response.ok) {
      throw new Error(`Failed to load component: ${componentName}`);
    }
    const componentHTML = await response.text();
    const targetElement = document.getElementById(targetElementId);
    if (targetElement) {
      targetElement.innerHTML = componentHTML;
    } else {
      console.warn(`Target element with ID "${targetElementId}" not found.`);
    }
  } catch (error) {
    console.error(error);
  }
};

// --- Event Listeners & Page-Specific Logic ---
document.addEventListener('DOMContentLoaded', () => {
  // --- Age Verification Check ---
  if (!AppState.isAgeVerified && !window.location.pathname.includes('age-verification.html')) {
    window.location.href = 'age-verification.html';
  }

  // --- Age Verification Logic ---
  const verifyAgeBtn = document.getElementById('verify-age-btn');
  if (verifyAgeBtn) {
    verifyAgeBtn.addEventListener('click', () => {
      setLocalStorage('isAgeVerified', 'true');
      window.location.href = 'welcome.html';
    });
  }

  // --- Load Common Components ---
  loadComponent('header', 'main-header');
  loadComponent('footer', 'main-footer');

  console.log('Blueberry JS Initialized!');
});

// --- Utility Functions ---
const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};
