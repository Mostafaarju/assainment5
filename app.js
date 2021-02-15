document.getElementById('search-btn').addEventListener('click', function () {
    const searchInput = document.getElementById('search-box').value;
    if (searchInput === "") {
        alert('Search Box Is Empty!');
    } else if (searchInput.length == 1) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
        getDataFetch(url);
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        getDataFetch(url);
    }
});


const getDataFetch = url => {
    document.getElementById('show-details').style.display = 'none';
    fetch(url)
        .then(res => res.json())
        .then(data => displayFood(data))
        .catch(err => {
            const error = document.createElement('h2');
            error.className = 'error-msg';
            error.innerText = 'No Item Found';
            document.getElementById('search-container').appendChild(error);
        });
}



const displayFood = data => {
    document.getElementById('search-container').innerText = "";
    data.meals.forEach(element => {
        const container = document.getElementById('search-container');
        const foodDiv = document.createElement('div');
        foodDiv.className = 'food';
        const foodInfo = `
        <img onclick="details('${element.strMeal}')" src="${element.strMealThumb}">
        <h1 onclick="details('${element.strMeal}')">${element.strMeal}</h1>
        `;
        foodDiv.innerHTML = foodInfo;
        container.appendChild(foodDiv);
    });
}

const details = data => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`;
    fetch(url)
        .then(res => res.json())
        .then(dataItem => showDetails(dataItem.meals))
}
const showDetails = details => {
    let container = document.getElementById('show-details');
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'details';
    container.style.display = "block";
    container.innerHTML = "";
    const detailsInfo = `
        <img src="${details[0].strMealThumb}">
        <h4>${details[0].strMeal}</h4>
        <h6>Ingredients: </h6>
        <p class = "list-item">=> ${details[0].strIngredient1 + ' ' + details[0].strMeasure1}</p>
        <p class = "list-item">=> ${details[0].strIngredient2 + ' ' + details[0].strMeasure2}</p>
        <p class = "list-item">=> ${details[0].strIngredient3 + ' ' + details[0].strMeasure3}</p>
        <p class = "list-item">=> ${details[0].strIngredient4 + ' ' + details[0].strMeasure4}</p>
        <p class = "list-item">=> ${details[0].strIngredient5 + ' ' + details[0].strMeasure5}</p>
        <p class = "list-item">=> ${details[0].strIngredient6 + ' ' + details[0].strMeasure6}</p>
    `;

    detailsDiv.innerHTML = detailsInfo;
    document.getElementById('search-container').innerHTML = "";
    container.appendChild(detailsDiv);
};