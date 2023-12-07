let childNames = [];
let childsPoints = {};

document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();

    const childNamesJSON = localStorage.getItem('childNames');
    let childsPointsJSON = localStorage.getItem('childsPoints');

    if (!childsPointsJSON) {
        localStorage.setItem('childsPoints', JSON.stringify(childsPoints));
    } else {
        childsPoints = JSON.parse(childsPointsJSON);
    }

    if (!childNamesJSON) {
        openChildNameModal();
    } else {
        childNames = JSON.parse(childNamesJSON);
        displayChildNames();
    }

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('addButton')) {
            const childName = event.target.parentNode.id.split('_')[1];
            addTask(childName);
        }
    });
});

function openChildNameModal() {
    const childNameModal = document.getElementById('childNameModal');
    const instance = M.Modal.init(childNameModal, {dismissible: false});
    instance.open();
}

function saveChildName() {
    const childNameInput = document.getElementById('childNameInput').value.trim();

    if (childNameInput !== '') {
        const childNamesJSON = localStorage.getItem('childNames');

        if (childNamesJSON) {
            childNames = JSON.parse(childNamesJSON);
        }

        childNames.push(childNameInput);
        localStorage.setItem('childNames', JSON.stringify(childNames));

        childsPoints[childNameInput] = 0;
        localStorage.setItem('childsPoints', JSON.stringify(childsPoints));

        document.getElementById('childNameInput').value = '';
        displayChildNames();
    }
}

function closeChildNameModal() {
    const childNameModal = document.getElementById('childNameModal');
    const instance = M.Modal.getInstance(childNameModal);
    instance.close();
}

function displayChildNames() {
    const childInfoContainer = document.getElementById('childInfoTableContainer');
    const childNamesJSON = localStorage.getItem('childNames');

    if (childNamesJSON) {
        childNames = JSON.parse(childNamesJSON);
    }

    childInfoContainer.innerHTML = '';

    childNames.forEach(function (childName) {
        const childNameDiv = document.createElement('div');
        childNameDiv.textContent = childName;
        childNameDiv.id = `childName_${childName}`;
        childNameDiv.style.marginBottom = '25px';

        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.classList.add('addButton');

        const infoButton = document.createElement('button');
        infoButton.textContent = 'i';
        infoButton.addEventListener('click', function () {
            console.log('info for ' + childName);
        });

        childNameDiv.appendChild(document.createTextNode('\u00A0'));
        childNameDiv.appendChild(addButton);
        childNameDiv.appendChild(infoButton);

        childInfoContainer.appendChild(childNameDiv);

        addButton.addEventListener('click', function () {
            addTask(childName);
        });
    });
}

function addTask(childName) {
    const taskInput = document.getElementById('taskInput');
    const childTasksContainer = document.getElementById(`childName_${childName}`);

    const existingTasks = Array.from(childTasksContainer.querySelectorAll('.collection-item label'));
    const isTaskDuplicate = existingTasks.some(taskLabel => taskLabel.textContent === taskInput.value.trim());

    if (!isTaskDuplicate && taskInput.value.trim() !== '') {
        const taskListItem = document.createElement('li');
        taskListItem.className = 'collection-item';

        const completeButton = document.createElement('a');
        completeButton.href = '#';
        completeButton.className = 'secondary-content';
        completeButton.innerHTML = '<i class="material-icons">check</i>';
        completeButton.addEventListener('click', function () {
            taskListItem.remove();
            // Increment points when the task is completed
            childsPoints[childName] = (childsPoints[childName] || 0) + 10;
            localStorage.setItem('childsPoints', JSON.stringify(childsPoints));
        });
        taskListItem.appendChild(completeButton);

        const label = document.createElement('label');
        label.htmlFor = `taskCheckbox_${childName}`;
        label.textContent = taskInput.value;
        taskListItem.appendChild(label);

        const deleteButton = document.createElement('a');
        deleteButton.href = '#';
        deleteButton.className = 'secondary-content';
        deleteButton.innerHTML = '<i class="material-icons">delete</i>';
        deleteButton.addEventListener('click', function () {
            taskListItem.remove();
        });
        taskListItem.appendChild(deleteButton);

        childTasksContainer.appendChild(taskListItem);
    }
}