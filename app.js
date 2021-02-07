//meal item and item details DIV
const mealdiv = document.getElementById('mealsItemdiv');
const mealdetails = document.getElementById('mealItemdetails');


const mealSearchBtn = document.getElementById('meal-SearchBtn');
mealSearchBtn.addEventListener('click', function() {

    mealdiv.innerHTML = '';
    mealdetails.innerHTML = '';
    mealdiv.className = '';
    mealdiv.classList.add('d-none');
    mealdetails.className = '';
    mealdetails.classList.add('d-none');

    const mealName = document.getElementById('meal-Name').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showMealsItem(data.meals))
        //if meals not found in API
        .catch(function() {
            const notFound = document.getElementById('notFound');
            const htmlTemplate = `
                <div class="alert alert-danger" role="alert">
                    Meal Item: <b>${mealName}</b> Not Found. check it out!
                </div>`;
            notFound.innerHTML = htmlTemplate;
            setInterval(() => {
                notFound.innerHTML = "";
            }, 4000);
        });
});


//function Shows only meal item div using for each
const showMealsItem = meals => {
    mealdiv.className = 'mealsItemdivCss';
    let preHTML = mealdiv.innerHTML;
    // clicking meal Item DIV go meal details through mealItemDetails() function
    meals.forEach(meal => {
        const htmlTemplate = `
             <div class="mealItem" onclick="mealItemDetails('${meal.idMeal}')">
                 <img class="meal-image" src="${meal.strMealThumb}" alt="" srcset="">
                 <h5 class="mealtitle">${meal.strMeal}</h5>
             </div>`;
             preHTML = preHTML + htmlTemplate;
    });
    // for (let i = 0; i < meals.length; i++) {
    //     const meal = meals[i];
    //     const htmlTemplate = `
    //     <div class="mealItem" onclick="mealItemDetails('${meal.idMeal}')">
    //         <img class="meal-image" src="${meal.strMealThumb}" alt="" srcset="">
    //         <h5 class="mealtitle">${meal.strMeal}</h5>
    //     </div>`;
    //     preHTML = preHTML + htmlTemplate;

    // }
    mealdiv.innerHTML = preHTML;
};

// For Single meal Item details
const mealItemDetails = mealid => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`;
    fetch(url)
        .then(res => res.json())
        .then(data => mealItemDetailsDiv(data.meals[0]))
        .catch(function() {
            console.log("error");
        });
};
const mealItemDetailsDiv = details => {
    mealdiv.classList.add('d-none');
    mealdetails.classList.remove('d-none');
    mealdetails.className='d-flex justify-content-center';
    const htmlTemplate = `
    <div>
        <img src="${details.strMealThumb}" alt="" /><br />
        <h3>${details.strMeal}</h3>
        <h4 class="display-4">Ingredients</h4>
        <li class="small">${details.strIngredient1}</li>
        <li class="small">${details.strIngredient2}</li>
        <li class="small">${details.strIngredient3}</li>
        <li class="small">${details.strIngredient4}</li>
        <li class="small">${details.strIngredient5}</li>
        <li class="small">${details.strIngredient6}</li>
        <li class="small">${details.strIngredient7}</li>
        <li class="small">${details.strIngredient8}</li>
        <li class="small">${details.strIngredient9}</li>
        <li class="small">${details.strIngredient10}</li>
    </div>`;
    mealdetails.innerHTML = htmlTemplate;

};