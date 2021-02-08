'use strict';
/**
 * **************************** FRIDGE MAESTRO **********************
 *
 *
 */

/**
 * @imports
 */

/**
 * @todo --
 *
 * * -- PROJECT TASKS --
 *
 * CSS/HTML
 * [1/1] Align all content according to viewport width - √
 * [1/2] Hide & show table with nutrition info
 * [1/1] Style navigation between recipes as responsive image blocks
 * [1/1] Fix recipe sublist display in standard format
 * [1/1] Create and style Nav
 * [1/1] Create and style Recipe component
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
 * Error handling
 * [0/1] Enable fallback route for empty response
 *
 * Ongoing/active:
 *  -- ensure reliability of apiController
 *         @update simple query working
 *  -- standardize layout, format
 *  -- increase options for complex queries
 *  -- Evaluate performance, refactor & clean as needed
 *
 * Stretch:
 *  -- Though likely not in the scope of this project, a socket based live search would be cool
 *  -- Create user login/acct suite
 *  -- Mealplanning tool
 *
 * ******************************************************************
 */

/* 
** @todo: --
 
 */

import '../public/styles/fonts.css';
import '../public/styles/forms.css';
import '../public/styles/layout.css';
import '../public/styles/links.css';
import '../public/styles/modal.css';
import '../public/styles/utils.css';
import '../public/styles/tables.css';

import { Controller } from './utils/queryLogic';
import { api } from './components/ApiController';

import {
    setAttributes,
    hasDuplicates,
    removeIngredient,
    showHide,
    makeButton,
    makeAnchor,
    addGeneratorButtonToRecipe,
    listFromIngredients,
    makeModal,
    injectFunctionIntoModal,
} from './utils/helpers';

import {
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
} from './utils/elements';

import { stringByIngredients, simpleRecipeFinder } from './utils/queryLogic';

(function initFunc() {
    return {
        setAttributes,
        hasDuplicates,
        removeIngredient,
        showHide,
        makeButton,
        makeAnchor,
        addGeneratorButtonToRecipe,
        listFromIngredients,
        makeModal,
        injectFunctionIntoModal,
    };
})();

/**
 * @summary API INITIATION
 */

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

/**
 *
 * @Module Controller initialization
 *
 */

console.log('The gangs all here');
console.log(`Here's our api object: ${api}`);
console.log(`and the class that controlls communication: ${Controller}`);
console.log(
    `all of our elements with their associated event listeners: ${
        (addToList,
        foodContainer,
        clear,
        submit,
        numSelect,
        queryBar,
        ingredientList,
        filterResult,
        toggleNutrition,
        nutritionTable,
        nutritionHeader)
    }`
);
console.log(
    `every helper function we need: ${
        (setAttributes,
        hasDuplicates,
        removeIngredient,
        showHide,
        makeButton,
        makeAnchor,
        addGeneratorButtonToRecipe,
        listFromIngredients,
        makeModal,
        injectFunctionIntoModal)
    }`
);

console.log(`what's missing?`);
