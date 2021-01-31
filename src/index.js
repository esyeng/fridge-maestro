/**
 *
 * @Module Imports
 *
 */

// import { ApiController } from './ApiController';

// const API = ApiController;

/**
 *
 * @description Data containers
 *
 */

const photoContainer = document.getElementById('food_container');

/**
 * **************************** FRIDGE MAESTRO **********************
 *
 ** @todo: --
 * - In progress:
 *  -- ensure reliability of apiController
 *  -- write a set of functions that synthesize form input into standardized json
 *  -- write JS listener to run input form => apiController method => DOMinsertion
 * - Then:
 *  -- Evaluate performance, refactor & clean as needed
 *  -- Create user login/acct suite
 *  -- Mealplanning tool
 *  -- Determine additional features to implement
 *
 * ******************************************************************
 */

/**
 *
 * @global Query Selectors & element targets
 *
 */

const addToList = document.getElementById('add_to_list'); // add btn
const clear = document.getElementById('clear_photos'); // clear results btn,
const submit = document.getElementById('submit_query'); // btn to send request object to probe recipe API(s)
const photos = document.getElementById('get_photos'); // test photo query btn

const numSelect = document.getElementById('num_select'); // select #photos (or results when applicable),
const queryBar = document.getElementById('query_bar'); // entry field for query params
const ingredientList = document.getElementById('ingredient_list_ul'); // ul of query params
const mealType = document.getElementById('meal_type');
const mealChoices = mealType.childNodes;

const toggleNutrition = document.getElementById('toggle_nutrition');
const nutritionTable = document.getElementById('nutrition_table'); // table with dummy data (or nutrition facts),
const nutritionHeader = document.getElementById('nutrition_header'); // label text for table

submit.addEventListener('click', (e) => {
    console.log(`clicked! now looking for api contoller`, API);
});

/**
 *
 * @global Element event listeners
 *
 */

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

submit.addEventListener('submit', (e) => {
    if (Array.from(ingredientList).length > 0) {
        // if ()
    }
});

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

photos.addEventListener('click', async (e) => {
    const isCountInRange =
        photoContainer.childElementCount >= 0 &&
        photoContainer.childElementCount <= 9;

    if (e.target && isCountInRange) {
        const numItemsToGet = numSelect.value;
        const picUrlObj = await getPhotos(numItemsToGet);
        const picPack = Object.keys(picUrlObj);
        const picData = Object.values(picUrlObj);

        picPack.forEach((i) => {
            let newCard = createDomItem('div');
            let newPhoto = createDomItem('img');
            newPhoto.src = picData[i].body.image;
            newCard.innerHTML = 'Recipe card example';

            newCard.appendChild(newPhoto);

            newCard.setAttribute('class', 'food_container_card');
            newPhoto.setAttribute('class', 'food_container_img');

            photoContainer.appendChild(newCard);
        });
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

/**
 *
 * @global Helper functions
 *
 */

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
 * @summary Remove element from DOM
 * @param  {String} ingredientText
 */

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

function removeIngredient(ingredientText) {
    let ingredientToRemove = document.getElementById(ingredientText.id);
    ingredientList.removeChild(ingredientToRemove);
}
