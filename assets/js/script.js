document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();

    // Clear child names from local storage when the page is rendered
    localStorage.removeItem('childNames');
    
    const childNamesJSON = localStorage.getItem('childNames');
    let childNames = [];

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

var childsPoints = {}

function openChildNameModal() {
    const childNameModal = document.getElementById('childNameModal');
    const instance = M.Modal.init(childNameModal, {dismissible: false});
    instance.open();
}

function saveChildName() {
    const childNameInput = document.getElementById('childNameInput').value.trim();
    let childNames = [];

    if (childNameInput !== '') {
        const childNamesJSON = localStorage.getItem('childNames');
        
        if (childNamesJSON) {
            childNames = JSON.parse(childNamesJSON);
        }

        childNames.push(childNameInput);
        localStorage.setItem('childNames', JSON.stringify(childNames));

        document.getElementById('childNameInput').value = ''; // Clear the textbox
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
    let childNames = [];

    if (childNamesJSON) {
        childNames = JSON.parse(childNamesJSON);
    }

    childInfoContainer.innerHTML = ''; // Clear previous content

    childNames.forEach(function (childName) {
        const childNameDiv = document.createElement('div');
        childNameDiv.textContent = childName;
        childNameDiv.id = `childName_${childName}`; // Add a class for styling if needed
        childNameDiv.style.marginBottom = '25px'; 

        // Create "+" button
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.classList.add('addButton'); // Add the class for the event listener

        // Create "i" button
        const infoButton = document.createElement('button');
        infoButton.textContent = 'i';
        infoButton.addEventListener('click', function () {
            console.log('info for ' + childName);
        });

        // Add buttons to the childNameDiv
        childNameDiv.appendChild(document.createTextNode('\u00A0'));
        childNameDiv.appendChild(addButton);
        childNameDiv.appendChild(infoButton);

        childInfoContainer.appendChild(childNameDiv);

        // Add event listener to the addButton
        addButton.addEventListener('click', function () {
            addTask(childName);
        });
    });
}

function addTask(childName) {
    const taskInput = document.getElementById('taskInput');
    const childTasksContainer = document.getElementById(`childName_${childName}`);

    // Check if the task already exists
    const existingTasks = Array.from(childTasksContainer.querySelectorAll('.collection-item label'));
    const isTaskDuplicate = existingTasks.some(taskLabel => taskLabel.textContent === taskInput.value.trim());

    if (!isTaskDuplicate && taskInput.value.trim() !== '') {
        const taskListItem = document.createElement('li');
        taskListItem.className = 'collection-item';

        const completeButton = document.createElement('a');
        completeButton.href = '#';
        completeButton.className = 'secondary-content';
        completeButton.innerHTML = '<i class="material-icons">check</i>';
        completeButton.addEventListener('click', function() {
            taskListItem.remove();
        });
        taskListItem.appendChild(completeButton);

        // Label for the checkbox
        const label = document.createElement('label');
        label.htmlFor = `taskCheckbox_${childName}`;
        label.textContent = taskInput.value; // Use the task input value
        taskListItem.appendChild(label);

        // Delete button with Material Icons
        const deleteButton = document.createElement('a');
        deleteButton.href = '#';
        deleteButton.className = 'secondary-content';
        deleteButton.innerHTML = '<i class="material-icons">delete</i>';
        deleteButton.addEventListener('click', function () {
            taskListItem.remove();
        });
        taskListItem.appendChild(deleteButton);

        childTasksContainer.appendChild(taskListItem);
        // Do not clear the task input value after adding the task
        // taskInput.value = '';
    }
}

    // Update digital clock
    let digitalClock = document.getElementById('digitalClock');
    let timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    digitalClock.textContent = timeString;
   
    // // Initial call to set the clock when the page loads
    // updateClock();addButton.addEventListener('click', function () {
    addButton.addEventListener('click', function () {
        addTask(childName);
});