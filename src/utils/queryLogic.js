'use strict';

import { ApiController, api } from '../components/ApiController';
import {
    resolveInstructionsAndData,
    injectDataIntoModal,
} from '../components/SingleRecipe';
import {
    makeModal,
    injectFunctionIntoModal,
    saveRecipe,
    clearSaved,
} from './helpers';
import { foodContainer } from './elements';

/**
 *
 * Query logic
 *
 */

/**
 * stringByIngredients
 * @summary Stringify ingredients
 * @param {Array} ingredients
 *
 * @note ** currently hardcoded to return 20 results
 * @returns {String} api-friendly request parameters
 *
 *
 */

export const Controller = new ApiController();

/**
 *
 *
 */

export function stringByIngredients(ingredients, limit) {
    let ingStr;
    let num = limit > 0 ? limit : 12;
    let resultStr;
    console.log(limit);
    ingredients.length > 0
        ? (ingStr = ingredients.reduce((acc, cur) => {
              acc += cur.id + `,`;
              return acc;
          }, ``))
        : '';
    ingStr = `ingredients=${ingStr.slice(0, ingStr.length - 1)}`;

    resultStr = `apiKey=${api.key}&${ingStr}&number=${num}&ranking=1`;
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

export function simpleRecipeFinder(str) {
    return new Promise(
        () => {
            Controller.findRecipes(str);
        },
        (err) => console.log(err)
    );
}

/**
 * showRecipes
 * @summary Called during the resolve method of API controller,
 *  populates foodContainer
 *
 * @param {Array} recipes
 *
 */

export function showRecipes(recipes) {
    recipes.forEach((recipe) => {
        const card = document.createElement('div');
        const photo = document.createElement('img');
        const recipeModal = makeModal(recipe.id);

        photo.src = recipe.image;
        card.innerHTML = recipe.title;

        card.setAttribute('id', recipe.id);
        card.setAttribute('class', 'food_container_card');
        photo.setAttribute('class', 'food_container_img');

        card.appendChild(photo);
        card.appendChild(recipeModal);
        foodContainer.appendChild(card);

        injectFunctionIntoModal(recipe, recipe.id);
        resolveInstructionsAndData(recipe.id, recipe);
    });
}

export function postRecipesToEmail() {
    console.log(localStorage);
    let keyString = localStorage.saved;
    const keys = keyString.split(', ');
    console.log(keys);
    const recipesToParse = [];

    for (let id in localStorage) {
        if (localStorage[id]) {
            keys.forEach((key) => {
                if (key === id) {
                    recipesToParse.push(localStorage[id]);
                }
            });
        }
    }
    let recipesToEmail = recipesToParse.map((jsonString) => {
        return JSON.parse(jsonString);
    });
    console.log('keys', keys);
    console.log('recipes to parse', recipesToParse);
    console.log('recipes to email', recipesToEmail);

    clearSaved();
}

/* __________________________________________________ */
