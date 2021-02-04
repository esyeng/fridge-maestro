'use strict';
/**
 * **************************** FRIDGE MAESTRO **********************
 *
 ** @todo: --
 * -- PROJECT TASKS --
 *
 * CSS/HTML
 * [1/1] Align all content according to viewport width - √
 * [1/2] Hide & show table with nutrition info
 * [1/1] Style navigation between recipes as responsive image blocks
 * [1/1] Fix recipe sublist display in standard format
 * [1/1] Create and style Nav
 * [0/1] Create and style Recipe component
 * [0/1] Create and style Recipes page with saved recipe cards
 *
 * JS
 * [2/2] Populate list with selected ingredients (add, remove) - √
 * [1/1] Enable a submit function to send search request - √
 * [1/2] Fetch and display recipes - simple
 * [0/2] Fetch and display recipes - complex
 * [0/1] Save recipes in local storage
 *
 * Webpack
 * [0/1] Modularize code / restructure files to small chunks
 * [0/1] Webpack config
 * [0/1] Test to serve working build
 * [0/2] Run build as close to MVP as possible - complex/simple
 *
 * Ongoing/active:
 *  -- ensure reliability of apiController @update simple query working
 *  -- standardize layout, format
 *  -- increase options for complex queries
 *  -- Evaluate performance, refactor & clean as needed
 *
 * Stretch:
 *  -- Create user login/acct suite
 *  -- Mealplanning tool
 *
 * ******************************************************************
 */

/**
 * @summary API INITIATION
 */

const api = (function () {
    return {
        baseUrl: `https://api.spoonacular.com/`,
        ingredientSearch: `https://api.spoonacular.com/food/ingredients/search`,
        recipeSearch: `https://api.spoonacular.com/recipes/findByIngredients`,
        complexSearch: `https://api.spoonacular.com/recipes/complexSearch`,
        ingredientInfo: (id) =>
            `https://api.spoonacular.com/food/ingredients/${id}/information`,
        random: `https://api.spoonacular.com/recipes/random`,
        key: null,
    };
})();

const domain = 'http://localhost:5500' || process.env.PORT;

const key = fetch(`${domain}/api/key`)
    .then((response) => response.text())
    .then((text) => {
        return text;
    })
    .catch((err) => console.log(err));

(function initKey() {
    key.then((data) => (api.key = data));
})();

/*********** API CONTROLLER *******
 * @description Methods for converting HTML queries to simple json, probe api, and receive simple json
 *
 * @private Api access routes
 * @public Access control
 *
 * @method parseQuery Concatenate URL with ingredients to queryStr @param {Object} data => @returns {String} parsedQuery
 * @method getIngredients Fetch just ingredients @param {String} queryStr => @returns {Promise}
 * @method findRecipes Fetch recipes, accepts specified parameters @param {String} queryStr => @returns {Promise}
 * @method getPhotos Fetch demo data => @returns {Promise}
 * @method resolve Resolve promise and return result @param {Function} promise => @returns {Any}
 */

class ApiController {
    constructor() {
        this.ingredients = [];
        this.recipes = {};
        this.photos = {};
    }
    fallBackRequest(queryStr) {
        fetch(`${api.random}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((e) => this.getPhotos(9));
    }
    getIngredients(queryStr) {
        fetch(`${api.ingredientSearch}?${queryStr}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((e) => console.error(e));
    }
    complexFind(queryStr) {
        fetch(`${api.complexSearch}?${queryStr}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((e) => console.error(e));
    }
    findRecipes(queryStr) {
        fetch(`${api.recipeSearch}?${queryStr}`)
            .then((response) => response.json())
            .then((json) => this.resolve(json))
            .catch((err) => console.error(err));
    }
    getPhotos(num) {
        fetch(`http://localhost:5500/${num}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((e) => console.error(e));
    }
    resolve(json) {
        console.log('now resolving, setting this.recipes to our response data');
        this.recipes = json;
        console.log('what does this look like?', json);
        showRecipes(this.recipes);
    }
}

/**
 *
 * @Module Controller initialization
 *
 */

const API = new ApiController();

/*                                                    */
/* =================== SELECTORS ==================== */
/*                                                    */

/**
 *
 * @element Data container
 *
 */

const foodContainer = document.getElementById('food_container');

/**
 *
 * @element Button
 *
 */

const addToList = document.getElementById('add_to_list'); // add btn
const clear = document.getElementById('clear_photos'); // clear results btn,
const submit = document.getElementById('submit_query'); // btn to send request object to probe recipe API(s)
const photos = document.getElementById('get_photos'); // test photo query btn

/**
 *
 * @element Form
 *
 */

const numSelect = document.getElementById('num_select'); // select #photos (or results when applicable),
const queryBar = document.getElementById('query_bar'); // entry field for query params
const ingredientList = document.getElementById('ingredient_list_ul'); // ul of query params
const filterResult = document.getElementById('filter_results');
const mealType = document.getElementById('meal_type');
const mealChoices = mealType.childNodes;

/**
 *
 * @element Table
 *
 */
const toggleNutrition = document.getElementById('toggle_nutrition');
const nutritionTable = document.getElementById('nutrition_table'); // table with dummy data (or nutrition facts),
const nutritionHeader = document.getElementById('nutrition_header'); // label text for table

/* __________________________________________________ */

/*                                                    */
/* =================== FUNCTIONS ==================== */
/*  

/**
 *
 * Query logic
 *
 */

/**
 * stringByIngredients
 * @summary Stringify by ingredients for a 20-result query
 * @param {Array} ingredients
 * @returns {String} api-friendly request parameters
 *
 *
 */

function stringByIngredients(ingredients) {
    let ingStr;
    let num;
    let resultStr;

    ingredients.length > 0
        ? (ingStr = ingredients.reduce((acc, cur) => {
              acc += cur.id + `,`;
              return acc;
          }, ``))
        : '';
    ingStr = `ingredients=${ingStr.slice(0, ingStr.length - 1)}`;

    resultStr = `apiKey=${api.key}&${ingStr}&number=20&ranking=1`;
    return resultStr;
}

/**
 * simpleRecipeFinder
 * @summary execute and return result of promise for simple search
 * @param  {String} str -- query
 *
 *
 *
 */

function simpleRecipeFinder(str) {
    return new Promise(
        () => {
            API.findRecipes(str);
        },
        (err) => console.log(err)
    );
}

/**
 *
 * Helper functions
 *
 */

/**
 * setAttributes
 * @summary Set multiple attributes on single element
 * @param  {HTMLElement} element
 * @param  {Array} attributePairs
 *
 * @returns {HTMLElement}
 *
 */

function setAttributes(element, attributePairs) {
    attributePairs.forEach((attributePair) => {
        let attribute = attributePair.attribute;
        let value = attributePair.value;
        element.setAttribute(attribute, value);
    });
    return element;
}

/**
 * hasDuplicates
 * @summary Check if element with given ID exists in node collection
 * @param {Array} collection
 * @param {String} text
 *
 * @returns {Boolean}
 *
 */

function hasDuplicates(collection, text) {
    for (let i = 0; i < collection.length; i++) {
        let node = collection[i];
        if (node.id === text) {
            return true;
        }
    }
    return false;
}
/**
 * removeIngredient
 * @summary Remove element from DOM & APIController store
 * @param  {String} ingredientText
 *
 *
 */

function removeIngredient(ingredientText) {
    let ingredientToRemove = document.getElementById(ingredientText.id);
    ingredientList.removeChild(ingredientToRemove);
    API.ingredients.pop(ingredientToRemove);
}

/**
 * showHide
 * @summary toggle visibility handler
 * @param  {HTMLElement} el
 *
 *
 */

function showHide(el) {
    if (el.className === 'show') {
        el.setAttribute('class', 'hide');
    }
    el.setAttribute('class', 'show');
}

/**
 * makeButton
 * @summary Create custom button
 * @param  {String} text
 * @param  {String} classes
 *
 *
 */

function makeButton(text, classes) {
    let button = document.createElement('button');
    button.setAttribute('class', classes);
    button.innerHTML = text;
    return button;
}

/**
 * generateRecipeCard
 * @summary Use each recipe object to make appended card
 * @param {Object} recipe
 *
 * @returns {HTMLCollection} newList
 */

function generateRecipeCard(recipe) {
    let expandResultButton = makeButton(
        'view details',
        'recipe_card_button recipe btn btn-dark show'
    );
    expandResultButton.setAttribute('id', recipe.id);
    return expandResultButton;
}

/**
 * showRecipes
 * @summary Called during the resolve method of API controller,
 *  populates foodContainer
 *
 * @param {Array} arrRecipes
 *
 */

function showRecipes(arrRecipes) {
    arrRecipes.forEach((recipe) => {
        let newCard = document.createElement('div');
        let newPhoto = document.createElement('img');
        newPhoto.src = recipe.image;
        newCard.innerHTML = recipe.title;
        newCard.appendChild(newPhoto);
        newCard.setAttribute('class', 'food_container_card');
        newPhoto.setAttribute('class', 'food_container_img');
        let childList = generateRecipeCard(recipe);
        newCard.appendChild(childList);
        foodContainer.appendChild(newCard);
    });
}

function makeRecipeComponent(singleRecipeData) {
    // need to make a show/hide on the result box, and when a recipe is clicked it should hide
    // if result box is showing, single recipe is hidden
    // if single recipe is showing, result box is hidden
    // two containers, one for all and one for one.
    // clicking a result in result box hides result box,
    // creates a new recipe object, and shows that in the single recipe
    // a button 'back' will reverse this
}

/* __________________________________________________ */

/*                                                    */
/* ================= LISTENERS ====================== */
/*                                                    */

/**
 *
 *
 * @global
 *
 */

/**
 * @element Forms
 * @summary check for number, call simpleRecipeFinder
 * @param {Event} click
 *
 * @returns {resolved promise} recipes
 */

submit.addEventListener('click', async (e) => {
    const ingredients = [...ingredientList.children];
    const numberRequested = numSelect.value;
    let queryStr =
        !numberRequested || numberRequested <= 0
            ? stringByIngredients(ingredients)
            : stringByIngredients(ingredients, numberRequested);
    await simpleRecipeFinder(queryStr);
});

/**
 * @element Forms
 * @summary Number results to search
 */

numSelect.addEventListener('change', (e) => {
    numSelect.value = e.target.value;
});

/**
 * @summary Reads ingredient nodelist and entry value upon add event.
 * Removes special chars & clears input and exits function if item exists in list.
 * Formats new list item with remove and class attributes, clears query before
 * appending to nodelist.
 */

/**
 * @element Buttons
 * @summary Add removable input item to list
 */

addToList.addEventListener('click', (e) => {
    if (e.target) {
        let listNodes = [...ingredientList.children];
        let ingredientText = queryBar.value;
        ingredientText = ingredientText.replace(/\W+/g, '');

        if (hasDuplicates(listNodes, ingredientText)) {
            queryBar.value = '';
            return false;
        } else {
            let ingredientToAdd = document.createElement('li');
            ingredientToAdd = setAttributes(ingredientToAdd, [
                {
                    attribute: 'class',
                    value: 'ingredient_li tag-remove',
                },
                {
                    attribute: 'id',
                    value: ingredientText,
                },
                {
                    attribute: 'onclick',
                    value: `removeIngredient(${ingredientText})`,
                },
            ]);
            ingredientToAdd.innerHTML = ingredientText;
            queryBar.value = '';
            API.ingredients.push(ingredientToAdd);
            ingredientList.appendChild(ingredientToAdd);
        }
    }
});

/**
 * @summary Clear viewport container
 */

clear.addEventListener('click', (e) => {
    while (photoContainer.firstChild) {
        photoContainer.removeChild(photoContainer.firstChild);
    }
    return;
});

/**
 *
 * @summary Toggle nutrition table
 */

toggleNutrition.addEventListener('click', (e) => {
    nutritionTable.classList.toggle('table_hidden');
    nutritionHeader.classList.toggle('table_hidden');
});
