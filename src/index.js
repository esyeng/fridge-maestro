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
 *
 * JS
 * [2/2] Populate list with selected ingredients (add, remove) - √
 * [1/1] Enable a submit function to send search request - √
 * [1/2] Fetch and display recipes - simple
 * [0/2] Fetch and display recipes - complex
 * [0/1] Save recipes in local storage
 *
 * Webpack
 * [1/1] Modularize code / restructure files to small chunks
 * [1/1] Webpack config
 * [0/2] Run build as close to MVP as possible - complex/simple
 *
 * Sass
 * [0/1] convert css to sass
 * [0/1] include sass in updated webpack config
 *
 * Error handling
 * [0/1] Enable fallback route for empty response
 *
 * Ongoing/active:
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
import './content/Ingredients-250x125.jpg';
import './content/Ingredients-600x300.jpg';
import './content/Ingredients-1200x600.jpg';

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

// console.log('The gangs all here');
// console.log(`Here's our api object: ${api}`);
// console.log(`and the class that controlls communication: ${Controller}`);

// console.log(`what's missing?`);
