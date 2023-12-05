
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
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    // if(seconds !== 0){

    
    // Update analog clock hands
    let hourHand = document.getElementById('hourHand');
    let minuteHand = document.getElementById('minuteHand');
    let secondHand = document.getElementById('secondHand');

    let hourDeg = (hours % 12 + minutes / 60) * 30;
    let minuteDeg = (minutes + seconds / 60) * 6;
    let secondDeg = (seconds / 60) * 360;
    
    console.log(secondDeg);

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;

    // Update digital clock
    let digitalClock = document.getElementById('digitalClock');
    let timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    digitalClock.textContent = timeString;
    // }else{
    //     seconds = 60;
    //     let hourHand = document.getElementById('hourHand');
    //     let minuteHand = document.getElementById('minuteHand');
    //     let secondHand = document.getElementById('secondHand');

    //     let hourDeg = (hours % 12 + minutes / 60) * 30;
    //     let minuteDeg = (minutes + seconds / 60) * 6;
    //     let secondDeg = (seconds / 60) * 360;
    
    //     console.log(secondDeg, seconds);

    //     hourHand.style.transform = `rotate(${hourDeg}deg)`;
    //     minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    //     secondHand.style.transform = `rotate(${secondDeg}deg)`;
    //     secondHand.style.transform = `rotate(${secondDeg}deg)`;
    // }
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to set the clock when the page loads
updateClock();

