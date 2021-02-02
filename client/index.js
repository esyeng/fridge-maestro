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
 * [0/1] Style navigation between recipes as responsive image blocks
 * [0/1] Fix recipe sublist display in standard format
 * [0/1] Create and style Nav
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
 *  -- ensure reliability of apiController
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
        this.ingredients = {};
        this.recipes = {};
        this.photos = {};
    }
    getIngredients(queryStr) {
        fetch(`${api.ingredientSearch}?${queryStr}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch(() => this.fallBackRequest().catch((e) => console.error(e)));
    }
    complexFind(queryStr) {
        fetch(`${api.complexSearch}?${queryStr}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch(() => this.fallBackRequest().catch((e) => console.error(e)));
    }
    findRecipes(queryStr) {
        fetch(`${api.recipeSearch}?${queryStr}`)
            .then((response) => response.json())
            .then((json) => this.resolve(json))
            .catch((err) => console.error(err));
    }
    fallBackRequest(queryStr) {
        fetch(`${api.random}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((e) => this.getPhotos(9));
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
 * @Module controller variable
 *
 */

const API = new ApiController();

/**
 *
 * @description Data containers
 *
 */

const photoContainer = document.getElementById('food_container');

/**
 *
 * @global Query Selectors & element targets
 *
 */

/**
 *
 * @global Helper functions
 *
 */

// /**
//  *
//  * Pull value and add to data object to querify for api
//  * @param {Array} ingredients
//  * @returns {Object} data
//  */

/**
 * Stringify by ingredients for a 20-result query
 */

const stringByIngredients = (ingredients) => {
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
};

const finder = (str) => {
    return new Promise(
        () => {
            API.findRecipes(str);
        },
        (err) => console.log(err)
    );
};

/**
 * @summary Pointless in retrospect
 * @param  {String} tag
 */

const createDomItem = (tag) => document.createElement(tag);

/**
 * @summary Set multiple attributes on single element
 * @param  {HTML} element
 * @param  {Array} attributePairs
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
 * @summary Check if element with given ID exists in node collection
 * @param {Array} collection
 * @param {String} text
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
 * @summary Remove element from DOM
 * @param  {String} ingredientText
 */

function removeIngredient(ingredientText) {
    let ingredientToRemove = document.getElementById(ingredientText.id);
    ingredientList.removeChild(ingredientToRemove);
}

/*                                                    */
/* =================== SELECTORS ==================== */
/*                                                    */

const addToList = document.getElementById('add_to_list'); // add btn
const clear = document.getElementById('clear_photos'); // clear results btn,
const submit = document.getElementById('submit_query'); // btn to send request object to probe recipe API(s)
const photos = document.getElementById('get_photos'); // test photo query btn

const numSelect = document.getElementById('num_select'); // select #photos (or results when applicable),
const queryBar = document.getElementById('query_bar'); // entry field for query params
const ingredientList = document.getElementById('ingredient_list_ul'); // ul of query params
const filterResult = document.getElementById('filter_results');
const mealType = document.getElementById('meal_type');
const mealChoices = mealType.childNodes;

const toggleNutrition = document.getElementById('toggle_nutrition');
const nutritionTable = document.getElementById('nutrition_table'); // table with dummy data (or nutrition facts),
const nutritionHeader = document.getElementById('nutrition_header'); // label text for table

/* __________________________________________________ */

/*                                                    */
/* =================== FUNCTIONS ==================== */
/*                                                    */

const showHide = (el) => {
    if (el.className === 'show') {
        el.setAttribute('class', 'hide');
    }
    el.setAttribute('class', 'show');
};

const importantProps = ['aisle', 'amount', 'meta', 'name', 'original', 'unit'];

const paramsToPassToDOM = [
    'missedIngredients',
    'unusedIngredients',
    'likes',
    'usedIngredients',
];

const makeButton = (text, classes) => {
    let button = createDomItem('button');
    button.setAttribute('class', classes);
    button.innerHTML = text;
    return button;
};

/**
 * @summary search object subtrees to transfer properties and their values into collapsible lists
 * @param {Object} object
 *
 * @returns {HTMLCollection} newList
 */
const toggleRecipeData = (object) => {
    let newList = createDomItem('ul');
    let label = makeButton(
        'expand',
        'result_box_item recipe btn btn-dark show'
    );

    label.setAttribute('id', object.id);
    label.onclick = function () {
        newList.classList.toggle('hidden');
    };
    newList.appendChild(label);
    newList.setAttribute('class', 'hidden result_box list-unstyled');

    for (let subProperty in object) {
        let li = createDomItem('li');
        li.setAttribute('class', 'ingredient_li');
        li.setAttribute('name', subProperty);
        if (paramsToPassToDOM.includes(subProperty)) {
            if (!Array.isArray(object[subProperty])) {
                li.innerHTML = `${subProperty}: ${object[subProperty]}`;
            } else {
                object[subProperty].length > 0
                    ? object[subProperty].forEach((attr) => {
                          importantProps.indexOf(attr) > -1
                              ? (li.innerHTML = `${attr}: ${object[attr]}`)
                              : '';
                      })
                    : null;
            }
        }

        newList.appendChild(li);
    }
    console.log('well heres our list', newList);
    return newList;
};

const showRecipes = (arrRecipes) => {
    arrRecipes.forEach((recipe) => {
        let newCard = createDomItem('div');
        let newPhoto = createDomItem('img');
        newPhoto.src = recipe.image;
        newCard.innerHTML = recipe.title;
        newCard.appendChild(newPhoto);
        newCard.setAttribute('class', 'food_container_card');
        newPhoto.setAttribute('class', 'food_container_img');
        let childList = toggleRecipeData(recipe);
        newCard.appendChild(childList);
        photoContainer.appendChild(newCard);
    });
};
/* __________________________________________________ */

/*                                                    */
/* ================= LISTENERS ====================== */
/*                                                    */

/**
 * @global =
 *
 */

submit.addEventListener('click', async (e) => {
    let ingredients = [...ingredientList.children];
    let queryStr = stringByIngredients(ingredients);
    await finder(queryStr);
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
 * @summary Form control
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
            let ingredientToAdd = createDomItem('li');
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

            ingredientList.appendChild(ingredientToAdd);
        }
    }
});

/**
 * @summary Populate photo container with random food images -- temp function
 */

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
