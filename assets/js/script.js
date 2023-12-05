
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('taskItem');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const taskText = document.createElement('span');
        taskText.textContent = taskInput.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            taskList.removeChild(taskItem);
        };

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
}

// Function to display child information in the container
function displayChildInfo(childInfo){
    const childInfoContainer = document.getElementById('childInfoContainer');
    const childRow = document.createElement('div');
    childRow.classList.add('childInfoRow');
    childRow.textContent = 'Name: ${childInfo.name}, Age: ${childInfo.age}, Gender: ${childInfo.gender}';
    childInfoContainer.appendChild(childRow);

}

// Functions for Child Information Popup
function openChildInfoPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('childInfoPopup').style.display = 'block';
}

// Function to close the child information popup
function closeChildInfoPopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('childInfoPopup').style.display = 'none';
}

// Function to save child information
function saveChildInfo() {
    const childName = document.getElementById('childName').value;
    const childAge = document.getElementById('childAge').value;
    const childGender = document.getElementById('childGender').value;

    alert(`Child Information Saved:\nName: ${childName}\nAge: ${childAge}\nGender: ${childGender}`);

    closeChildInfoPopup();
}

// Functions for Analog Clock with Digital Readout
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Update analog clock hands
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');

    const hourDeg = (hours % 12 + minutes / 60) * 30;
    const minuteDeg = (minutes + seconds / 60) * 6;
    const secondDeg = seconds * 6;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;

    // Update digital clock
    const digitalClock = document.getElementById('digitalClock');
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    digitalClock.textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to set the clock when the page loads
updateClock();

