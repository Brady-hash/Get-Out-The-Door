var homeButton = document.getElementById("homeButton");


var rewards = document.getElementById("rewards");
var kids = document.getElementById("kids");
const apiKey = 'A21B22AEC2B84B2CA0DCF69475DA586C';

function populateRewards() {
    const apiUrl = `https://api.redcircleapi.com/request`;
    const queryParams = {
        api_key: apiKey,
        type: 'category',
        category_id: '5xtb0',
        delivery_type: 'ship_to_home',
        include_out_of_stock: false,
        sort_by: 'best_seller'
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
            // Check if category_results is defined
            const categoryResults = data.category_results || [];
            
            // Limit to the first 10 results
            return categoryResults.slice(0, 9);
        })
        .then(categoryResults => {
            console.log(categoryResults);
            for (const result of categoryResults) {
                // Extract necessary properties from each result
                const { offers, product } = result;

                var rewardContainers = document.createElement('div');
                rewardContainers.classList.add('rewardContainers');

                var rewardsHeading = document.createElement('div');
                rewardsHeading.classList.add('rewardsHeadings');

                var itemName = document.createElement('p');
                itemName.textContent = product.title;

                var itemPrice = document.createElement('button');
                itemPrice.textContent = (offers.primary.price * 100 + "points");

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
                // rewardContainers.append(itemLink);
                rewards.append(rewardContainers);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function createKids() {

    for (let i = 0; i < 3; i++) {
        var kidBox = document.createElement('div');
        kidBox.classList.add('kidsBoxes');
        kidBox.classList.add('color' + i);

        var kidInfo = document.createElement('div');
        kidInfo.classList.add('kidInfo');

        var kidName = document.createElement('p');
        kidName.textContent = "Kid" + (i + 1) +"'s" + " ";

        var points = document.createElement('p');
        points.textContent = "points: " + i;
  

        kidInfo.appendChild(kidName);
        kidInfo.appendChild(points);
        kidBox.appendChild(kidInfo);
        kids.appendChild(kidBox);
    }
}

homeButton.addEventListener("click", function() {
    window.location.href = "index.html";
});

populateRewards();
createKids();

