const steps = document.querySelectorAll<HTMLElement>('.form-step');
const nextButtons = document.querySelectorAll<HTMLButtonElement>('.next-btn');
const prevButtons = document.querySelectorAll<HTMLButtonElement>('.prev-btn');
const submitButton = document.querySelector<HTMLButtonElement>('.submit-btn')!;
const confirmCheck = document.getElementById('confirmCheck') as HTMLInputElement;

const reviewFields: { [key: string]: HTMLElement | null } = {
    name: document.getElementById('review-name'),
    father: document.getElementById('review-father'),
    gender: document.getElementById('review-gender'),
    email: document.getElementById('review-email'),
    dob: document.getElementById('review-dob'),
    phone: document.getElementById('review-phone'),
    cnic: document.getElementById('review-cnic'),
    country: document.getElementById('review-country'),
    address: document.getElementById('review-address'),
    program: document.getElementById('review-program'),
    grade: document.getElementById('review-grade'),
    startDate: document.getElementById('review-startDate'),
    endDate: document.getElementById('review-endDate'),
    occupation: document.getElementById('review-occupation'),
    bloodGroup: document.getElementById('review-bloodGroup'),
    maritalStatus: document.getElementById('review-maritalStatus'),
};

let currentStep: number = 0;

function showStep(stepIndex: number): void {
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === stepIndex);
    });

    // progress bar
    const completedSteps = document.querySelectorAll<HTMLElement>('.step');
    completedSteps.forEach((step, index) => {
        step.classList.toggle('completed', index < stepIndex);
    });

    // Show review data
    if (stepIndex === steps.length - 1) {
        updateReviewData();
    }

    submitButton.disabled = !(confirmCheck.checked && stepIndex === steps.length - 1);
}

function updateReviewData(): void {
    if (reviewFields.name) reviewFields.name.textContent = (document.getElementById('name') as HTMLInputElement).value;
    if (reviewFields.father) reviewFields.father.textContent = (document.getElementById('father') as HTMLInputElement).value;
    if (reviewFields.gender) reviewFields.gender.textContent = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value || 'Not Specified';
    if (reviewFields.email) reviewFields.email.textContent = (document.getElementById('email') as HTMLInputElement).value;
    if (reviewFields.dob) reviewFields.dob.textContent = (document.getElementById('dob') as HTMLInputElement).value;
    if (reviewFields.phone) reviewFields.phone.textContent = (document.getElementById('phone') as HTMLInputElement).value;
    if (reviewFields.cnic) reviewFields.cnic.textContent = (document.getElementById('cnic') as HTMLInputElement).value;
    if (reviewFields.country) reviewFields.country.textContent = (document.getElementById('country') as HTMLInputElement).value;
    if (reviewFields.address) reviewFields.address.textContent = (document.getElementById('address') as HTMLInputElement).value;
    if (reviewFields.program) reviewFields.program.textContent = (document.getElementById('program') as HTMLInputElement).value;
    if (reviewFields.grade) reviewFields.grade.textContent = (document.getElementById('grade') as HTMLInputElement).value;
    if (reviewFields.startDate) reviewFields.startDate.textContent = (document.getElementById('startDate') as HTMLInputElement).value;
    if (reviewFields.endDate) reviewFields.endDate.textContent = (document.getElementById('endDate') as HTMLInputElement).value;
    if (reviewFields.occupation) reviewFields.occupation.textContent = (document.getElementById('occupation') as HTMLInputElement).value;
    if (reviewFields.bloodGroup) reviewFields.bloodGroup.textContent = (document.getElementById('bloodGroup') as HTMLInputElement).value;
    if (reviewFields.maritalStatus) reviewFields.maritalStatus.textContent = (document.getElementById('maritalStatus') as HTMLInputElement).value;
}

function storeData(): void {
    const formData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        father: (document.getElementById('father') as HTMLInputElement).value,
        gender: (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        dob: (document.getElementById('dob') as HTMLInputElement).value,
        phone: (document.getElementById('phone') as HTMLInputElement).value,
        cnic: (document.getElementById('cnic') as HTMLInputElement).value,
        country: (document.getElementById('country') as HTMLInputElement).value,
        address: (document.getElementById('address') as HTMLInputElement).value,
        program: (document.getElementById('program') as HTMLInputElement).value,
        grade: (document.getElementById('grade') as HTMLInputElement).value,
        startDate: (document.getElementById('startDate') as HTMLInputElement).value,
        endDate: (document.getElementById('endDate') as HTMLInputElement).value,
        occupation: (document.getElementById('occupation') as HTMLInputElement).value,
        bloodGroup: (document.getElementById('bloodGroup') as HTMLInputElement).value,
        maritalStatus: (document.getElementById('maritalStatus') as HTMLInputElement).value,
    };

    const storedData = localStorage.getItem('students');
    const students = storedData ? JSON.parse(storedData) : [];

    if (Array.isArray(students)) {
        students.push(formData);
    } else {
        console.warn('Stored data is not an array. Resetting it.');
        localStorage.setItem('students', JSON.stringify([formData]));
        return;
    }

    localStorage.setItem('students', JSON.stringify(students));

    alert('Data saved successfully!');
    clearFields();
    currentStep = 0;
    showStep(currentStep);
}


function clearFields(): void {
    (document.getElementById('name') as HTMLInputElement).value = '';
    (document.getElementById('father') as HTMLInputElement).value = '';
    const genderInput = document.querySelector('input[name="gender"]:checked') as HTMLInputElement | null;
    if (genderInput) genderInput.checked = false;
    (document.getElementById('email') as HTMLInputElement).value = '';
    (document.getElementById('dob') as HTMLInputElement).value = '';
    (document.getElementById('phone') as HTMLInputElement).value = '';
    (document.getElementById('cnic') as HTMLInputElement).value = '';
    (document.getElementById('country') as HTMLInputElement).value = '';
    (document.getElementById('address') as HTMLInputElement).value = '';
    (document.getElementById('program') as HTMLInputElement).value = '';
    (document.getElementById('grade') as HTMLInputElement).value = '';
    (document.getElementById('startDate') as HTMLInputElement).value = '';
    (document.getElementById('endDate') as HTMLInputElement).value = '';
    (document.getElementById('occupation') as HTMLInputElement).value = '';
    (document.getElementById('bloodGroup') as HTMLInputElement).value = '';
    (document.getElementById('maritalStatus') as HTMLInputElement).value = '';
}

nextButtons.forEach((button) => {
    button.addEventListener('click', () => {
        currentStep++;
        showStep(currentStep);
    });
});

prevButtons.forEach((button) => {
    button.addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
    });
});

confirmCheck.addEventListener('change', () => {
    submitButton.disabled = !confirmCheck.checked;
});

submitButton.addEventListener('click', storeData);