// document.addEventListener('DOMContentLoaded', function () {
    // Function to add a task
    function addTask() {
        var taskInput = document.getElementById('taskInput');
        var taskList = document.getElementById('taskList');

        if (taskInput.value.trim() !== '') {
            var li = document.createElement('li');
            li.className = 'collection-item';

            // Checkbox
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'filled-in';
            checkbox.id = 'taskCheckbox'; // Add a unique ID for each checkbox if needed
            li.appendChild(checkbox);

            // Label for the checkbox
            var label = document.createElement('label');
            label.htmlFor = 'taskCheckbox'; // Use the same ID as the checkbox
            label.textContent = taskInput.value;
            li.appendChild(label);

            // Delete button with Material Icons
            var deleteButton = document.createElement('a');
            deleteButton.href = '#';
            deleteButton.className = 'secondary-content';
            deleteButton.innerHTML = '<i class="material-icons">delete</i>';
            deleteButton.addEventListener('click', function () {
                li.remove();
            });
            li.appendChild(deleteButton);

            taskList.appendChild(li);
            taskInput.value = '';
        }
    }

    // Function to open child information popup
    function openChildInfoPopup() {
        var overlay = document.getElementById('overlay');
        var childInfoPopup = document.getElementById('childInfoPopup');

        overlay.style.display = 'block';
        childInfoPopup.style.display = 'block';
    }

    // Function to save child information
    function saveChildInfo() {
        var childName = document.getElementById('childName').value;
        var childAge = document.getElementById('childAge').value;
        var childGender = document.getElementById('childGender').value;
        var childInfoContainer = document.getElementById('childInfoContainer');

        // Create a new row in the table
        var tableRow = document.createElement('tr');

        // Add data cells to the row
        var nameCell = document.createElement('td');
        nameCell.textContent = childName;

        var ageCell = document.createElement('td');
        ageCell.textContent = childAge;

        var genderCell = document.createElement('td');
        genderCell.textContent = childGender;

        // Append cells to the row
        tableRow.appendChild(nameCell);
        tableRow.appendChild(ageCell);
        tableRow.appendChild(genderCell);

        // Append the row to the table body
        var tableBody = document.querySelector('#childInfoTable tbody');
        tableBody.appendChild(tableRow);

        closeChildInfoPopup();
    }

    function closeChildInfoPopup() {
            var overlay = document.getElementById('overlay');
            var childInfoPopup = document.getElementById('childInfoPopup');
    
            overlay.style.display = 'none';
            childInfoPopup.style.display = 'none';
        }

// Functions for Analog Clock with Digital Readout


    // Attach functions to buttons
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    document.getElementById('childInfoBtn').addEventListener('click', openChildInfoPopup);
    // document.getElementById('saveChildInfoBtn').addEventListener('click', saveChildInfo);
    document.getElementById('closePopup').addEventListener('click', closeChildInfoPopup);

    // Initialize Materialize tooltips
    var tooltipElems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltipElems);
    
    // Materialize checkboxes don't need explicit initialization

    // Initialize Materialize components (if needed)
    var otherElems = document.querySelectorAll('.other-class');
    M.OtherComponent.init(otherElems);

// Initial call to set the clock when the page loads
setInterval(updateClock, 1000);
updateClock();

// });

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

    // Function to close child information popup
    // function closeChildInfoPopup() {
    //     var overlay = document.getElementById('overlay');
    //     var childInfoPopup = document.getElementById('childInfoPopup');

    //     overlay.style.display = 'none';
    //     childInfoPopup.style.display = 'none';
    // }
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
// // Initial call to set the clock when the page loads
// updateClock();

