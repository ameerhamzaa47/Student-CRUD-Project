var steps = document.querySelectorAll('.form-step');
var nextButtons = document.querySelectorAll('.next-btn');
var prevButtons = document.querySelectorAll('.prev-btn');
var submitButton = document.querySelector('.submit-btn');
var confirmCheck = document.getElementById('confirmCheck');
var reviewFields = {
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
var currentStep = 0;
function showStep(stepIndex) {
    steps.forEach(function (step, index) {
        step.classList.toggle('active', index === stepIndex);
    });
    // progress bar
    var completedSteps = document.querySelectorAll('.step');
    completedSteps.forEach(function (step, index) {
        step.classList.toggle('completed', index < stepIndex);
    });
    // Show review data
    if (stepIndex === steps.length - 1) {
        updateReviewData();
    }
    submitButton.disabled = !(confirmCheck.checked && stepIndex === steps.length - 1);
}
function updateReviewData() {
    var _a;
    if (reviewFields.name)
        reviewFields.name.textContent = document.getElementById('name').value;
    if (reviewFields.father)
        reviewFields.father.textContent = document.getElementById('father').value;
    if (reviewFields.gender)
        reviewFields.gender.textContent = ((_a = document.querySelector('input[name="gender"]:checked')) === null || _a === void 0 ? void 0 : _a.value) || 'Not Specified';
    if (reviewFields.email)
        reviewFields.email.textContent = document.getElementById('email').value;
    if (reviewFields.dob)
        reviewFields.dob.textContent = document.getElementById('dob').value;
    if (reviewFields.phone)
        reviewFields.phone.textContent = document.getElementById('phone').value;
    if (reviewFields.cnic)
        reviewFields.cnic.textContent = document.getElementById('cnic').value;
    if (reviewFields.country)
        reviewFields.country.textContent = document.getElementById('country').value;
    if (reviewFields.address)
        reviewFields.address.textContent = document.getElementById('address').value;
    if (reviewFields.program)
        reviewFields.program.textContent = document.getElementById('program').value;
    if (reviewFields.grade)
        reviewFields.grade.textContent = document.getElementById('grade').value;
    if (reviewFields.startDate)
        reviewFields.startDate.textContent = document.getElementById('startDate').value;
    if (reviewFields.endDate)
        reviewFields.endDate.textContent = document.getElementById('endDate').value;
    if (reviewFields.occupation)
        reviewFields.occupation.textContent = document.getElementById('occupation').value;
    if (reviewFields.bloodGroup)
        reviewFields.bloodGroup.textContent = document.getElementById('bloodGroup').value;
    if (reviewFields.maritalStatus)
        reviewFields.maritalStatus.textContent = document.getElementById('maritalStatus').value;
}
function storeData() {
    var _a;
    var formData = {
        name: document.getElementById('name').value,
        father: document.getElementById('father').value,
        gender: (_a = document.querySelector('input[name="gender"]:checked')) === null || _a === void 0 ? void 0 : _a.value,
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        phone: document.getElementById('phone').value,
        cnic: document.getElementById('cnic').value,
        country: document.getElementById('country').value,
        address: document.getElementById('address').value,
        program: document.getElementById('program').value,
        grade: document.getElementById('grade').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        occupation: document.getElementById('occupation').value,
        bloodGroup: document.getElementById('bloodGroup').value,
        maritalStatus: document.getElementById('maritalStatus').value,
    };
    var storedData = localStorage.getItem('students');
    var students = storedData ? JSON.parse(storedData) : [];
    if (Array.isArray(students)) {
        students.push(formData);
    }
    else {
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
function clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('father').value = '';
    var genderInput = document.querySelector('input[name="gender"]:checked');
    if (genderInput)
        genderInput.checked = false;
    document.getElementById('email').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('cnic').value = '';
    document.getElementById('country').value = '';
    document.getElementById('address').value = '';
    document.getElementById('program').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('occupation').value = '';
    document.getElementById('bloodGroup').value = '';
    document.getElementById('maritalStatus').value = '';
}
nextButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        currentStep++;
        showStep(currentStep);
    });
});
prevButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        currentStep--;
        showStep(currentStep);
    });
});
confirmCheck.addEventListener('change', function () {
    submitButton.disabled = !confirmCheck.checked;
});
submitButton.addEventListener('click', storeData);
