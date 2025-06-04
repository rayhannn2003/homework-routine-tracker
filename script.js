let currentMode = 'student';
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function loadHomework() {
  return JSON.parse(localStorage.getItem('homeworkData') || '{}');
}

function saveHomework(data) {
  localStorage.setItem('homeworkData', JSON.stringify(data));
}

function renderApp() {
  const container = document.getElementById('app');
  container.innerHTML = '';
  const data = loadHomework();

  weekdays.forEach(day => {
    const tasks = data[day] || [];
    const section = document.createElement('div');
    section.innerHTML = `<h2>${day}</h2>`;

    if (currentMode === 'teacher') {
      const taskList = document.createElement('div');
      tasks.forEach((task, idx) => {
        const div = document.createElement('div');
        div.className = 'task-item';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = task;
        input.oninput = () => {
          data[day][idx] = input.value;
          saveHomework(data);
        };

        const del = document.createElement('button');
        del.textContent = '❌';
        del.onclick = () => {
          data[day].splice(idx, 1);
          saveHomework(data);
          renderApp();
        };

        div.appendChild(input);
        div.appendChild(del);
        taskList.appendChild(div);
      });

      const addBtn = document.createElement('button');
      addBtn.textContent = '➕ Add Task';
      addBtn.onclick = () => {
        if (!data[day]) data[day] = [];
        data[day].push('');
        saveHomework(data);
        renderApp();
      };
      section.appendChild(taskList);
      section.appendChild(addBtn);
    } else {
      const progress = JSON.parse(localStorage.getItem('progress') || '{}');
      const ul = document.createElement('ul');
      tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        const chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.checked = (progress[day] || [])[idx];
        chk.onchange = () => {
          if (!progress[day]) progress[day] = [];
          progress[day][idx] = chk.checked;
          localStorage.setItem('progress', JSON.stringify(progress));
        };
        li.appendChild(chk);
        li.appendChild(document.createTextNode(' ' + task));
        ul.appendChild(li);
      });
      section.appendChild(ul);
    }

    container.appendChild(section);
  });
}

function switchMode(mode) {
  currentMode = mode;
  renderApp();
}

window.onload = renderApp;
