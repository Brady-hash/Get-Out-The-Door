// Functions for Child Information Popup
function openChildInfoPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('childInfoPopup').style.display = 'block';
}

function closeChildInfoPopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('childInfoPopup').style.display = 'none';
}

function saveChildInfo() {
    const childName = document.getElementById('childName').value;
    const childAge = document.getElementById('childAge').value;
    const childGender = document.getElementById('childGender').value;

    alert(`Child Information Saved:\nName: ${childName}\nAge: ${childAge}\nGender: ${childGender}`);

    closeChildInfoPopup();
}

// Function to update the clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    document.getElementById('clock').textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial call to set the clock when the page loads
updateClock();