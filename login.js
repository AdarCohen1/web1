const lecturers = [
    { username: "Snir12", password: "123456", name: "Snir" },
    { username: "lec2", password: "123456", name: "Lecturer 2" },
    { username: "lec3", password: "123456", name: "Lecturer 3" }
];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorElement = document.getElementById("error");

    if (!username || !password) {
        errorElement.textContent = "Username and password cannot be empty.";
        errorElement.classList.remove("hidden");
        return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        errorElement.textContent = "Username can only contain alphanumeric characters.";
        errorElement.classList.remove("hidden");
        return;
    }

    const lecturer = lecturers.find(l => l.username === username && l.password === password);
    if (lecturer) {
        localStorage.setItem("lecturerName", lecturer.name);
        window.location.href = "lecturer_home.html";
    } else {
        errorElement.textContent = "Invalid username or password.";
        errorElement.classList.remove("hidden");
    }
});

document.getElementById("supportButton").addEventListener("click", function() {
    alert('For technical support, please contact support@e.braude.ac.il or call 04-1234567.');
});
