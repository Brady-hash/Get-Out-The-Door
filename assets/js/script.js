 // wrapped initial functions and calls within the DOMContentLoaded to prevent clock from pulling weather API every second.
 
 document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
    let citySearchForm = document.getElementById("weather-search");
    let citySearchValue = document.getElementById("city");
    let citySearchHeader = document.getElementById("search-header");
    // Function to add a task
    function addTask() {
        var taskInput = document.getElementById('taskInput');
        var taskList = document.getElementById('taskList');
// document.addEventListener('DOMContentLoaded', function () {


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

    function initClock(){
        updateClock();
        startClockInterval();
    }

    /////////

    function initWeather(){
        getWeather();
    }

    let clockInterval;

    function startClockInterval(){
        clearInterval(clockInterval);
    clockInterval = setInterval(updateClock,1000);
    
    }
    
    function updateClock() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        
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
    }
    
    // Matt's weather script:
    function getWeather(selectedCityLat, selectedCityLon){
    let apikey = "69a921b4fa027e06293fbe2493b27f37";
    console.log('get weather init');
        
    function loadSavedCity(){
        let savedCity = JSON.parse(localStorage.getItem('savedCity'));
        console.log('checking for saved cities: ', savedCity);
        if(savedCity) {
            citySearchForm.style.display = 'none';
            let changeCityButton = document.createElement('button');
                changeCityButton.textContent = 'Change City';
                changeCityButton.addEventListener('click', function(){
                citySearchForm.style.display = 'block';
                });
                document.getElementById('change-city').append(changeCityButton);
                document.getElementById('search-header').style.display = 'none';
            getWeather(savedCity.lat, savedCity.lon);
            console.log(savedCity.lat, savedCity.lon);
        } else {
            initWeather();
        }
    }
    
        function getCoordinates(){
            var coordinatesURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearchValue.value + '&limit=5&appid=' + apikey;
            console.log('citysearchvalue: ', citySearchValue.value);
            console.log(coordinatesURL);
            
            fetch(coordinatesURL)
            .then(function (response){
                return response.json();
            })
            .then(function (data){
                console.log(data);
                if(data && data.length > 0){
                    selectedCityLat = data[0].lat;
                    selectedCityLon = data[0].lon;
                    getCurrentForecast(selectedCityLat, selectedCityLon);
                    
                }
                else{
                    console.log("No Lat/long");
                }
                console.log('lat: ', selectedCityLat);
                console.log('long: ', selectedCityLon);
            })
            
           .catch(function(error){
            console.log('Error fetching data: ', error);
           });
    
           citySearchForm.remove();
           citySearchHeader.remove();
    
        }
     
    
    
     function getCurrentForecast(selectedCityLat, selectedCityLon){
        var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + selectedCityLat + '&lon='+ selectedCityLon + '&cnt=48&appid=' + apikey +'&units=imperial';
        console.log("getcurrentforecast function: ", selectedCityLat, selectedCityLon);
        fetch(forecastURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log('weather data: ', data);
            forecastCityName = data.city.name;
            forecastCityDate = data.list[0].dt_txt;
            forecastCityTemp = Math.round(data.list[0].main.temp);
            forecastCityOutlook = data.list[0].weather[0].description;
            forecastCityIcon = data.list[0].weather[0].icon;
            return data;
            
        })
        .then(function(data){
            writeForecast(data);
            saveCityToLocalStorage({
                name: forecastCityName,
                lat: selectedCityLat,
                lon: selectedCityLon,
            });
            
        });
    }
        //write current weather data to the DOM
        function writeForecast(){
        let formattedDate = dayjs(forecastCityDate).format('ddd MMM D, YYYY');
        let forecastIconURL = 'https://openweathermap.org/img/wn/' + forecastCityIcon + '@2x.png';
            document.getElementById('forecastCityName').innerHTML = 'Good Morning, ' + forecastCityName + '!';
            document.getElementById('todays-date').innerHTML = 'Today is ' + formattedDate + '.';
            document.getElementById('current-temp').innerHTML = "Current Temperature: " + forecastCityTemp + ' Degrees';
            document.getElementById('current-conditions').innerHTML = "Outside you'll find " + forecastCityOutlook + '.';
            document.getElementById('weather-icons').innerHTML = '<img src="' + forecastIconURL + '">';
    }
    
        citySearchForm.addEventListener('submit', function(event){
        event.preventDefault();
        console.log('clicked');
        citySearchValue.value = citySearchValue.value.split(',')[0].trim();
        console.log(citySearchValue.value);
        getCoordinates();
        // citySearchValue.value('');
    });
    
    function saveCityToLocalStorage(savedCity){
        let cityString = JSON.stringify(savedCity);
        localStorage.setItem('savedCity', cityString);
    }    
    
    // function hideSearchBox(){
    //     citySearchForm.style.display = 'none';
    // }
    
    // function showSearchBox(){
    //     citySearchForm.style.display = 'block';
    // }
    
    // function createChangeCityButton() {
    //     let changeCityButton = document.createElement('button');
    //     changeCityButton.textContent = 'Change City';
    //     changeCityButton.addEventListener('click', function(){
    //         showSearchBox();
    //     });
    //     document.body.appendChild(changeCityButton);
    // }
    }

    initClock();
    loadSavedCity();
});
// Functions for Analog Clock with Digital Readout
    


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

var overlay = document.getElementById('overlay');
var childInfoPopup = document.getElementById('childInfoPopup');

overlay.style.display = 'none';
childInfoPopup.style.display = 'none';

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
    // 
// // Initial call to set the clock when the page loads
// updateClock();addButton.addEventListener('click', function () {
    addButton.addEventListener('click', function () {
        addTask(childName);
    });
