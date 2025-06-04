// This file contains the JavaScript code for the Homework Routine Tracker application.

let homeworkList = [];
let currentMode = 'teacher'; // Default mode is teacher

document.getElementById('teacherModeBtn').addEventListener('click', () => {
    switchMode('teacher');
});

document.getElementById('studentModeBtn').addEventListener('click', () => {
    switchMode('student');
});

function switchMode(mode) {
    currentMode = mode;
    document.getElementById('teacherSection').classList.toggle('hidden', mode !== 'teacher');
    document.getElementById('studentSection').classList.toggle('hidden', mode !== 'student');
    if (mode === 'student') {
        displayHomeworkList();
    }
}

function saveHomework() {
    const homeworkInputs = document.getElementById('homeworkInputs');
    const homeworkItems = homeworkInputs.getElementsByTagName('input');
    for (let item of homeworkItems) {
        if (item.value) {
            homeworkList.push(item.value);
            item.value = ''; // Clear input after saving
        }
    }
    alert('Homework saved!');
}

function displayHomeworkList() {
    const homeworkListDiv = document.getElementById('homeworkList');
    homeworkListDiv.innerHTML = ''; // Clear previous list
    homeworkList.forEach((homework, index) => {
        const homeworkItem = document.createElement('div');
        homeworkItem.textContent = homework;
        const markAsReadBtn = document.createElement('button');
        markAsReadBtn.textContent = '✅ Mark as Read';
        markAsReadBtn.onclick = () => {
            homeworkList.splice(index, 1); // Remove item from list
            displayHomeworkList(); // Refresh the list
        };
        homeworkItem.appendChild(markAsReadBtn);
        homeworkListDiv.appendChild(homeworkItem);
    });
}

function resetData() {
    homeworkList = [];
    document.getElementById('homeworkInputs').innerHTML = ''; // Clear inputs
    document.getElementById('homeworkList').innerHTML = ''; // Clear homework list
    alert('All data has been reset!');
}