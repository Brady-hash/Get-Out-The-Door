function getApi() {
    let requestUrl = "https://api.redcircleapi.com/request?api_key=A21B22AEC2B84B2CA0DCF69475DA586C&search_term=highlighter+pens&category_id=5zja3&type=search";
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

window.onload = function () {
    getApi();
}