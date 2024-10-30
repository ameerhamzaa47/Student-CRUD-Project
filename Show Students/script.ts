interface Student {
    bloodGroup: unknown;
    maritalStatus: unknown;
    startDate: unknown;
    endDate: unknown;
    country: unknown;
    email: unknown;
    gender: unknown;
    father: unknown;
    dob: unknown;
    name: string;
    phone: string;
    cnic: string;
    program: string;
    grade: string;
    occupation: string;
    address: string;
}

function loadStudentData(): void {
    const tableBody = document.getElementById("tbl") as HTMLTableSectionElement;
    const modalBody = document.getElementById("modalBody") as HTMLDivElement;

    tableBody.innerHTML = '';

    const storedData = localStorage.getItem("students");

    if (storedData) {
        const students: Student[] = JSON.parse(storedData);

        students.forEach((student, index) => {
            const row = tableBody.insertRow();

            row.insertCell().textContent = student.name;
            row.insertCell().textContent = student.phone;
            row.insertCell().textContent = student.cnic;
            row.insertCell().textContent = student.program;
            row.insertCell().textContent = student.grade;
            row.insertCell().textContent = student.occupation;
            row.insertCell().textContent = student.address;

            // Create Edit button
            const editCell = row.insertCell();
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add('forEdit');
            editButton.onclick = () => toggleEdit(index, row, editButton);
            editCell.appendChild(editButton);

            // Create Delete button
            const deleteCell = row.insertCell();
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add('forDelete');
            deleteButton.onclick = () => deleteStudent(index);
            deleteCell.appendChild(deleteButton);

            // View Full Data
            const viewData = row.insertCell();
            const dataButton = document.createElement("button");
            dataButton.textContent = "Data";
            dataButton.classList.add('forFullData');
            dataButton.setAttribute('data-bs-toggle', "modal");
            dataButton.setAttribute('data-bs-target', "#staticBackdrop");
            dataButton.onclick = () => showStudentData(student);
            viewData.appendChild(dataButton);
        });
    } else {
        console.log("No students data found in localStorage.");
    }
}

function showStudentData(student: Student): void {
    const modalBody = document.getElementById("modalBody") as HTMLDivElement;
    modalBody.innerHTML = `
        <h1>General Information</h1>
        <hr>
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Father Name:</strong> ${student.father}</p>
        <p><strong>Gender:</strong> ${student.gender}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>DOB:</strong> ${student.dob}</p>

        <h1>Contact Info</h1>
        <hr>
        <p><strong>Phone:</strong> ${student.phone}</p>
        <p><strong>CNIC:</strong> ${student.cnic}</p>
        <p><strong>Country:</strong> ${student.country}</p>
        <p><strong>Address:</strong> ${student.address}</p>

        <h1>Education</h1>
        <hr>
        <p><strong>Program:</strong> ${student.program}</p>
        <p><strong>Grade:</strong> ${student.grade}</p>
        <p><strong>Start Date:</strong> ${student.startDate}</p>
        <p><strong>End Date:</strong> ${student.endDate}</p>
        
        <h1>Additional Information</h1>
        <hr>
        <p><strong>Occupation:</strong> ${student.occupation}</p>
        <p><strong>Blood Group:</strong> ${student.bloodGroup}</p>
        <p><strong>Marital Status:</strong> ${student.maritalStatus}</p>
    `;
}

function toggleEdit(index: number, row: HTMLTableRowElement, button: HTMLButtonElement): void {
    const cells = row.cells;
    const storedData = localStorage.getItem("students");

    if (storedData) {
        const students: Student[] = JSON.parse(storedData);
        
        if (button.textContent === "Edit") {
            for (let i = 0; i < cells.length - 3; i++) { 
                const input = document.createElement("input");
                input.value = cells[i].textContent || '';
                cells[i].innerHTML = '';
                cells[i].appendChild(input);
            }
            button.textContent = "Save";
        } else {
            const updatedStudent: Student = {
                name: (cells[0].querySelector("input") as HTMLInputElement).value,
                phone: (cells[1].querySelector("input") as HTMLInputElement).value,
                cnic: (cells[2].querySelector("input") as HTMLInputElement).value,
                program: (cells[3].querySelector("input") as HTMLInputElement).value,
                grade: (cells[4].querySelector("input") as HTMLInputElement).value,
                occupation: (cells[5].querySelector("input") as HTMLInputElement).value,
                address: (cells[6].querySelector("input") as HTMLInputElement).value,
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

function deleteStudent(index: number): void {
    const storedData = localStorage.getItem("students");
    if (storedData) {
        const students: Student[] = JSON.parse(storedData);
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students)); 
        loadStudentData();
    }
}

document.addEventListener("DOMContentLoaded", loadStudentData);