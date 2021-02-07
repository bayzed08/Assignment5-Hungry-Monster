//meal item and item details DIV
const mealdiv = document.getElementById('mealsItemdiv');
const mealdetails = document.getElementById('mealItemdetails');


const mealSearchBtn = document.getElementById('meal-SearchBtn');
mealSearchBtn.addEventListener('click', function() {

    mealdiv.innerHTML = '';
    mealdetails.innerHTML = '';
    mealdiv.classList.add('d-none');
    mealdetails.classList.add('d-none');

    const mealName = document.getElementById('meal-Name').value;
    console.log(mealName);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showMealsitem(data.meals[0]))
        .catch(function() {
            const notFound = document.getElementById('notFound');
            const htmlTemplate = `
                <div class="alert alert-danger" role="alert">
                    Meal Item: <b>${mealName}</b> Not Found. check it out!
                </div>`;
            notFound.innerHTML = htmlTemplate;
            // notFound.fadeIn(3000).fadeOut(2000);
            setInterval(() => {
                notFound.innerHTML = "";
            }, 4000);
        });
});



showMealsitem = meals => {
    console.log(meals);

    mealdiv.className = 'mealsItemdivCss';
    const htmlTemplate = `
        <div onclick="mealItemDetails('${meals.idMeal}')">
            <img class="meal-image" src="${meals.strMealThumb}" alt="" srcset="">
            <h5 class="mealtitle">${meals.strMeal}</h5>
        </div>  
`;
    mealdiv.innerHTML = htmlTemplate;
};


const mealItemDetails = mealid => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`;

    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => mealItemDetailsDiv(data.meals[0]))
        .catch(function() {
            console.log("error");
        });
};
const mealItemDetailsDiv = details => {
    console.log(details);
    mealdiv.classList.add('d-none');
    mealdetails.classList.remove('d-none');
    const htmlTemplate = `
    <div>
        <img src="${details.strMealThumb}" alt="" /><br />
        <h3>${details.strMeal}</h3>
        <p>
            <ul>Ingredients
            <li>${details.strIngredient1}</li>
            </ul>
        </p>
    </div>
    `;
    mealdetails.innerHTML = htmlTemplate;

};