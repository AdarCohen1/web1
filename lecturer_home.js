const lecturerCourses = {
    "Snir": [
        { name: "מבוא למחשוב ענן", description: "Introduction to Cloud Computing" },
        { name: "טכנולוגיות WEB", description: "Web Technologies" },
        { name: "אלגוריתמים", description: "Algorithms" },
        { name: "קריפטו", description: "Cryptography" }
    ],
    "Lecturer 2": [
        { name: "מבוא למחשוב ענן", description: "Introduction to Cloud Computing" },
        { name: "הסתברות", description: "Probability" },
        { name: "מבוא לבדיקות תוכנה", description: "Introduction to Software Testing" },
        { name: "כריית נתונים", description: "Data Mining" }
    ],
    "Lecturer 3": [
        { name: "טכנולוגיות WEB", description: "Web Technologies" },
        { name: "מחשוב זמן אמת", description: "Real-Time Computing" },
        { name: "פיזיקה", description: "Physics" },
        { name: "מבוא לבינה מלאכותית", description: "Introduction to Artificial Intelligence" }
    ]
};

// Create sample lectures for a semester
const createLectures = (numLectures) => {
    const lectures = [];
    for (let i = 1; i <= numLectures; i++) {
        lectures.push({ lectureId: i, date: new Date(2024, 0, i).toLocaleDateString() });
    }
    return lectures;
};

function renderCourses() {
    const lecturerName = localStorage.getItem("lecturerName");
    const courses = lecturerCourses[lecturerName] || [];
    const coursesContainer = document.getElementById("courses");
    coursesContainer.innerHTML = ''; // Clear previous content

    courses.forEach(course => {
        const lectures = createLectures(12); // Example: 12 lectures in a semester
        const courseElement = document.createElement("div");
        courseElement.className = "bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow";
        courseElement.innerHTML = `
            <h2 class="text-xl font-bold mb-4">${course.name}</h2>
            <p class="text-gray-700 mb-4">${course.description}</p>
            <div class="scrollable space-y-4">
                ${lectures.map(lecture => `
                    <div class="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition">
                        <h3 class="text-lg font-semibold">Lecture ${lecture.lectureId}</h3>
                        <p class="text-gray-600">${lecture.date}</p>
                        <button onclick="manageAttendance('${course.name}', ${lecture.lectureId})" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-2">Manage Attendance</button>
                    </div>
                `).join('')}
            </div>
        `;
        coursesContainer.appendChild(courseElement);
    });
}

function manageAttendance(course, lectureId) {
    window.location.href = `manage_attendance.html?course=${course}&lecture=${lectureId}`;
}

function displayLecturerName() {
    const lecturerName = localStorage.getItem("lecturerName");
    document.getElementById("lecturerName").textContent = lecturerName;
}

function logout() {
    localStorage.removeItem("lecturerName");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    displayLecturerName();
    renderCourses();
});
