var homeButton = document.getElementById("homeButton");
var storedChildsPoints = JSON.parse(localStorage.getItem('childsPoints')) || {};


var rewards = document.getElementById("rewards");
var kidszContainer = document.getElementById("kids");
const apiKey = 'A21B22AEC2B84B2CA0DCF69475DA586C';

function populateRewards() {
    const apiUrl = `https://api.redcircleapi.com/request`;
    const queryParams = {
        api_key: apiKey,
        type: 'category',
        category_id: '5xtb0',
        delivery_type: 'ship_to_home',
        include_out_of_stock: false,
        sort_by: 'featured'
    };

    const queryString = new URLSearchParams(queryParams).toString();
    const fullUrl = `${apiUrl}?${queryString}`;

    fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const categoryResults = data.category_results || [];

            return categoryResults.slice(0, 15);
        })
        .then(categoryResults => {
            for (const result of categoryResults) {
                const { offers, product } = result;

                var rewardContainers = document.createElement('div');
                rewardContainers.classList.add('rewardContainers');

                var rewardsHeading = document.createElement('div');
                rewardsHeading.classList.add('rewardsHeadings');

                var itemName = document.createElement('p');
                itemName.textContent = product.title;

                var itemPrice = document.createElement('button');
                itemPrice.textContent = (offers.primary.price * 100 + "points");

                // Use a closure to capture the current value of itemPrice
                itemPrice.addEventListener('click', (function(price) {
                    return function(event) {
                        showPurchase(storedChildsPoints, price);
                    };
                })(itemPrice));

                var itemImg = document.createElement('img');
                itemImg.src = product.main_image;
                itemImg.alt = product.title;

                var itemLink = document.createElement('a');
                itemLink.href = product.link;
                itemLink.target = '_blank';
                itemLink.appendChild(itemImg);

                rewardsHeading.append(itemName);
                rewardsHeading.append(itemPrice);
                rewardContainers.append(rewardsHeading);
                rewardContainers.append(itemLink);
                rewards.append(rewardContainers);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function createKids() {
    const kidsContainer = document.getElementById('kids');

    // Clear existing child info divs
    kidsContainer.innerHTML = '';

    // Counter for adding classes
    let counter = 0;

    for (const childName in storedChildsPoints) {
        let kidBox = document.createElement('div');
        kidBox.classList.add('kidsBoxes');

        let kidInfo = document.createElement('div');
        kidInfo.classList.add('kidInfo');
        kidInfo.classList.add(`color${counter}`); // Add class like color0, color1, color2, etc.

        let kidNameElement = document.createElement('p');
        kidNameElement.style.marginRight = '5px';
        kidNameElement.style.marginLeft = '5px';
        kidNameElement.textContent = childName + "'s  ";

        let pointsElement = document.createElement('p');
        let points = storedChildsPoints[childName] || 0;
        pointsElement.textContent = ` points: ${points}`;

        kidInfo.appendChild(kidNameElement);
        kidInfo.appendChild(pointsElement);
        kidBox.appendChild(kidInfo);
        kidsContainer.appendChild(kidBox);

        // Increment the counter for the next child
        counter++;
    }
}


function showPurchase(storedChildsPoints, itemPrice) {
    // Create modal popup
    var modal = document.createElement('div');
    modal.classList.add('modal');

    // Create content for the modal
    var modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Loop through storedChildsPoints and create a div for each child
    for (const childName in storedChildsPoints) {
        var childDiv = document.createElement('div');

        // Display child's points
        var pointsText = document.createElement('span');
        pointsText.textContent = `${childName}: ${storedChildsPoints[childName]} points`;

        // Create check button
        var checkButton = document.createElement('button');
        checkButton.textContent = 'Check';
        checkButton.addEventListener('click', function () {
            subtractPoints(childName, itemPrice);
        });

        childDiv.appendChild(pointsText);
        childDiv.appendChild(checkButton);

        // Append the child div to the modal content
        modalContent.appendChild(childDiv);
    }

    // Add modal content to the modal
    modal.appendChild(modalContent);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Display the modal by changing the display property
    modal.style.display = 'flex';

    // Add a click event listener to close the modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    function subtractPoints(childName, itemPrice) {
        // Extract the numeric value of the item price
        var priceText = itemPrice.textContent.trim();
        var priceValue = parseInt(priceText.match(/\d+/)[0], 10);
    
        console.log("Price Value:", priceValue);
        console.log("Child's Points:", storedChildsPoints[childName]);
    
        // Check if the child has enough points
        if (storedChildsPoints[childName] >= priceValue) {
            // Subtract the price value from the child's points
            storedChildsPoints[childName] -= priceValue;
    
            // Update the local storage with the new points value
            localStorage.setItem('childsPoints', JSON.stringify(storedChildsPoints));
    
            closeModal();
            createKids();
        } else {
            // If the child doesn't have enough points, show an error message or handle it accordingly
            alert("Insufficient points for this purchase!");
            closeModal(); // Close the modal
        }
    }
    
    
} 

function closeModal() {
    var modal = document.querySelector('.modal');
    if (modal) {
        // Hide the modal
        modal.style.display = 'none';
        modal.remove();
    }
}

homeButton.addEventListener('click', function() {
    window.location.href = 'index.html';
});

populateRewards();
createKids();
