const addButton  = document.querySelector('.button-add');
const taskList   = document.querySelector('.task-list');
const input = document.getElementById('taskInput');

function createTaskElement(taskText) {
    const li  = document.createElement("li");
    li.className = "task-row";

    const divList = document.createElement("div");
    divList.textContent = taskText;
    li.appendChild(divList);

    const divStatus = document.createElement("div");
    const spanStatus = document.createElement("span");
    spanStatus.className = "pend-down";
    spanStatus.textContent = "pending";
    divStatus.appendChild(spanStatus);
    li.appendChild(divStatus);

    const divClose = document.createElement("div");
    const ioniconClose = document.createElement("ion-icon");
    ioniconClose.setAttribute("name", "close-circle-outline");
    divClose.appendChild(ioniconClose);
    li.appendChild(divClose);


    ioniconClose.addEventListener('click', () => {
        li.classList.add('deleting');
        setTimeout( () => li.remove(), 500);
    });

    return li;
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    if (taskText != "") {
        const taskElement = createTaskElement(taskText);
        taskList.appendChild(taskElement);

        input.value = "";
    }
}

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

addButton.addEventListener('click', addTask);