// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjRgvekqCqJT0HQXSX7T1uB4RLBB08s-c",
    authDomain: "bitmailer-1c622.firebaseapp.com",
    projectId: "bitmailer-1c622",
    storageBucket: "bitmailer-1c622.appspot.com",
    messagingSenderId: "462433082836",
    appId: "1:462433082836:web:062756acb1be9c0cd80a41",
    measurementId: "G-ZS7T5H77LH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to update the theme icon based on the current theme
function updateThemeIcon() {
    const body = document.body;
    const themeToggleButton = document.querySelector('.theme-toggle');
    if (body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = '🌞'; // Sun icon for light theme
    } else {
        themeToggleButton.textContent = '🌙'; // Moon icon for dark theme
    }
}

// Function to toggle between light and dark themes
window.toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    updateThemeIcon();
};

// Function to sign out the user
window.signOutUser = () => {
    signOut(auth).then(() => {
        localStorage.clear();
        window.location.href = 'http://127.0.0.1:8080/index.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
};

// Navigate to Mail Request Form
window.goToMailRequest = () => {
    window.location.href = 'http://127.0.0.1:8080/mail_request_form.html';
}

// Modify the existing code to handle form details display
window.onload = () => {
    const formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const submissionsContainer = document.getElementById('submitted-forms-container');

    if (formSubmissions.length === 0) {
        submissionsContainer.innerHTML = '<p>No submissions yet.</p>';
    } else {
        formSubmissions.forEach(submission => {
            const box = document.createElement('div');
            box.classList.add('submission-box');
            box.innerHTML = `
                <h4>${submission.subject}</h4>
                <p><strong>To:</strong> ${submission.to}</p>
                <p><strong>Date:</strong> ${submission.date}</p>
                <p><strong>From:</strong> ${submission.fromTime}</p>
                <p><strong>To:</strong> ${submission.toTime}</p>
                <p><strong>Department:</strong> ${submission.department}</p>
                <p><strong>Year:</strong> ${submission.year}</p>
                <span class="status ${submission.status === 'Accepted' ? 'status-accepted' : submission.status === 'Rejected' ? 'status-rejected' : 'status-pending'}">${submission.status}</span>
                <button onclick='showFormDetails(${JSON.stringify(submission).replace(/'/g, "\\'")})'>View Details</button>
            `;

            if (submission.status === 'Rejected') {
                box.innerHTML += `<p class="rejection-reason"><strong>Reason:</strong> ${submission.rejectionReason}</p>`;
            }

            submissionsContainer.appendChild(box);
        });
    }

    // Existing user info and theme handling code
    const userDisplayName = localStorage.getItem('userDisplayName');
    const userIcon = localStorage.getItem('userIcon');

    if (userDisplayName && userIcon) {
        document.getElementById('user-name').textContent = userDisplayName;
        document.getElementById('user-icon').textContent = userIcon;
    } else {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const displayName = user.displayName || 'User';
                const icon = (user.displayName || 'U').charAt(0).toUpperCase();
                localStorage.setItem('userDisplayName', displayName);
                localStorage.setItem('userIcon', icon);

                document.getElementById('user-name').textContent = displayName;
                document.getElementById('user-icon').textContent = icon;
            } else {
                window.location.href = 'http://127.0.0.1:8080/index.html';
            }
        });
    }
    updateThemeIcon();
};
