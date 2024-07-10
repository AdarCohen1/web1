const students = [
  { id: 1, name: "Snir Yehuda", attended: false },
  { id: 2, name: "Amit Benita", attended: false },
  { id: 3, name: "Adar Cohen", attended: false },
  { id: 4, name: "Yarden Barel", attended: false },
  { id: 5, name: "Lior Salman", attended: false },
];

function renderStudents() {
  const savedAttendance = JSON.parse(localStorage.getItem("attendanceData"));
  if (savedAttendance) {
    savedAttendance.forEach((savedStudent) => {
      const student = students.find((s) => s.id === savedStudent.id);
      if (student) {
        student.attended = savedStudent.attended;
      }
    });
  }

  const studentList = document.querySelector("#student-list");
  studentList.innerHTML = "";
  students.forEach((student) => {
    const tr = document.createElement("tr");
    tr.className = "bg-white hover:bg-gray-100 transition-colors";
    tr.innerHTML = `
            <td class="py-2 px-4 border-b">${student.name}</td>
            <td class="py-2 px-4 border-b text-center">
                <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" ${
                      student.attended ? "checked" : ""
                    } name="toggle" id="student-${
      student.id
    }" class="toggle-checkbox absolute block w-6 h-6 rounded-full appearance-none cursor-pointer" onchange="updateAttendance(${
      student.id
    })"/>
                    <label for="student-${
                      student.id
                    }" class="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"></label>
                </div>
            </td>
        `;
    studentList.appendChild(tr);
  });
  updateAttendanceRate();
}

function updateAttendance(id) {
  const student = students.find((s) => s.id === id);
  student.attended = !student.attended;
  updateAttendanceRate();
}

function updateAttendanceRate() {
  const totalStudents = students.length;
  const attendedStudents = students.filter((s) => s.attended).length;
  const attendanceRate = (attendedStudents / totalStudents) * 100;
  document.getElementById(
    "attendanceRate"
  ).textContent = `${attendanceRate.toFixed(2)}%`;
  document.getElementById(
    "attendanceProgressBar"
  ).style.width = `${attendanceRate}%`;
}

function saveAttendance() {
  localStorage.setItem("attendanceData", JSON.stringify(students));
  alert("Attendance saved!");
}

function logout() {
  window.location.href = "login.html";
}

function goBack() {
  window.history.back();
}

document.addEventListener("DOMContentLoaded", renderStudents);
