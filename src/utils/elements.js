'use strict';

/*                                                    */
/* =================== SELECTORS ==================== */
/*                                                    */
import { setAttributes, hasDuplicates } from './helpers';
import {
    Controller,
    stringByIngredients,
    simpleRecipeFinder,
} from './queryLogic';

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
            Controller.ingredients.push(ingredientToAdd);
            ingredientList.appendChild(ingredientToAdd);
        }
    }
});

/**
 * @summary Clear viewport container
 */

clear.addEventListener('click', (e) => {
    while (foodContainer.firstChild) {
        foodContainer.removeChild(foodContainer.firstChild);
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

export {
    addToList,
    foodContainer,
    clear,
    submit,
    numSelect,
    queryBar,
    ingredientList,
    filterResult,
    toggleNutrition,
    nutritionTable,
    nutritionHeader,
};
