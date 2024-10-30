function loadStudentData() {
    var tableBody = document.getElementById("tbl");
    var modalBody = document.getElementById("modalBody");
    tableBody.innerHTML = '';
    var storedData = localStorage.getItem("students");
    if (storedData) {
        var students = JSON.parse(storedData);
        students.forEach(function (student, index) {
            var row = tableBody.insertRow();
            row.insertCell().textContent = student.name;
            row.insertCell().textContent = student.phone;
            row.insertCell().textContent = student.cnic;
            row.insertCell().textContent = student.program;
            row.insertCell().textContent = student.grade;
            row.insertCell().textContent = student.occupation;
            row.insertCell().textContent = student.address;
            // Create Edit button
            var editCell = row.insertCell();
            var editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add('forEdit');
            editButton.onclick = function () { return toggleEdit(index, row, editButton); };
            editCell.appendChild(editButton);
            // Create Delete button
            var deleteCell = row.insertCell();
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add('forDelete');
            deleteButton.onclick = function () { return deleteStudent(index); };
            deleteCell.appendChild(deleteButton);
            // View Full Data
            var viewData = row.insertCell();
            var dataButton = document.createElement("button");
            dataButton.textContent = "Data";
            dataButton.classList.add('forFullData');
            dataButton.setAttribute('data-bs-toggle', "modal");
            dataButton.setAttribute('data-bs-target', "#staticBackdrop");
            dataButton.onclick = function () { return showStudentData(student); };
            viewData.appendChild(dataButton);
        });
    }
    else {
        console.log("No students data found in localStorage.");
    }
}
function showStudentData(student) {
    var modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = "\n        <h1>General Information</h1>\n        <hr>\n        <p><strong>Name:</strong> ".concat(student.name, "</p>\n        <p><strong>Father Name:</strong> ").concat(student.father, "</p>\n        <p><strong>Gender:</strong> ").concat(student.gender, "</p>\n        <p><strong>Email:</strong> ").concat(student.email, "</p>\n        <p><strong>DOB:</strong> ").concat(student.dob, "</p>\n\n        <h1>Contact Info</h1>\n        <hr>\n        <p><strong>Phone:</strong> ").concat(student.phone, "</p>\n        <p><strong>CNIC:</strong> ").concat(student.cnic, "</p>\n        <p><strong>Country:</strong> ").concat(student.country, "</p>\n        <p><strong>Address:</strong> ").concat(student.address, "</p>\n\n        <h1>Education</h1>\n        <hr>\n        <p><strong>Program:</strong> ").concat(student.program, "</p>\n        <p><strong>Grade:</strong> ").concat(student.grade, "</p>\n        <p><strong>Start Date:</strong> ").concat(student.startDate, "</p>\n        <p><strong>End Date:</strong> ").concat(student.endDate, "</p>\n        \n        <h1>Additional Information</h1>\n        <hr>\n        <p><strong>Occupation:</strong> ").concat(student.occupation, "</p>\n        <p><strong>Blood Group:</strong> ").concat(student.bloodGroup, "</p>\n        <p><strong>Marital Status:</strong> ").concat(student.maritalStatus, "</p>\n    ");
}
function toggleEdit(index, row, button) {
    var cells = row.cells;
    var storedData = localStorage.getItem("students");
    if (storedData) {
        var students = JSON.parse(storedData);
        if (button.textContent === "Edit") {
            for (var i = 0; i < cells.length - 3; i++) {
                var input = document.createElement("input");
                input.value = cells[i].textContent || '';
                cells[i].innerHTML = '';
                cells[i].appendChild(input);
            }
            button.textContent = "Save";
        }
        else {
            var updatedStudent = {
                name: cells[0].querySelector("input").value,
                phone: cells[1].querySelector("input").value,
                cnic: cells[2].querySelector("input").value,
                program: cells[3].querySelector("input").value,
                grade: cells[4].querySelector("input").value,
                occupation: cells[5].querySelector("input").value,
                address: cells[6].querySelector("input").value,
                dob: undefined,
                father: undefined,
                gender: undefined,
                email: undefined,
                country: undefined,
                startDate: undefined,
                endDate: undefined,
                bloodGroup: undefined,
                maritalStatus: undefined
            };
            students[index] = updatedStudent;
            localStorage.setItem("students", JSON.stringify(students));
            cells[0].textContent = updatedStudent.name;
            cells[1].textContent = updatedStudent.phone;
            cells[2].textContent = updatedStudent.cnic;
            cells[3].textContent = updatedStudent.program;
            cells[4].textContent = updatedStudent.grade;
            cells[5].textContent = updatedStudent.occupation;
            cells[6].textContent = updatedStudent.address;
            button.textContent = "Edit";
        }
    }
}
function deleteStudent(index) {
    var storedData = localStorage.getItem("students");
    if (storedData) {
        var students = JSON.parse(storedData);
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        loadStudentData();
    }
}
document.addEventListener("DOMContentLoaded", loadStudentData);