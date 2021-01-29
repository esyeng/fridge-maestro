/**
 *
 * @Module Imports
 *
 */
import * as selectors from './selectors';
import { api, apiController } from './apiController';

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

function removeIngredient(ingredientText) {
    let ingredientToRemove = document.getElementById(ingredientText.id);
    selectors.ingredientList.removeChild(ingredientToRemove);
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
 *
 * @global Element event listeners
 *
 */

/**
 * @summary Reads ingredient nodelist and entry value upon add event.
 * Removes special chars & clears input and exits function if item exists in list.
 * Formats new list item with remove and class attributes, clears query before
 * appending to nodelist.
 */

selectors.addToListBtn.addEventListener('click', (e) => {
    if (e.target) {
        let listNodes = [...selectors.ingredientList.children];
        let ingredientText = selectors.queryBar.value;
        ingredientText = ingredientText.replace(/\W+/g, '');

        if (hasDuplicates(listNodes, ingredientText)) {
            selectors.queryBar.value = '';
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
            selectors.queryBar.value = '';

            selectors.ingredientList.appendChild(ingredientToAdd);
        }
    }
});

/**
 * @summary Sets select value
 */

selectors.numSelect.addEventListener('change', (e) => {
    selectors.numSelect.value = e.target.value;
});

/**
 * @summary Populate photo container with random food images -- temp function
 */

selectors.queryBtn.addEventListener('click', async (e) => {
    const isCountInRange =
        photoContainer.childElementCount >= 0 &&
        photoContainer.childElementCount <= 9;

    if (e.target && isCountInRange) {
        const numItemsToGet = selectors.numSelect.value;
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

selectors.clearBtn.addEventListener('click', (e) => {
    while (photoContainer.firstChild) {
        photoContainer.removeChild(photoContainer.firstChild);
    }
    return;
});

/**
 * @summary Toggle nutrition table
 */

selectors.toggleNutrition.addEventListener('click', (e) => {
    selectors.nutritionTable.classList.toggle('table_hidden');
    selectors.nutritionHeader.classList.toggle('table_hidden');
});
