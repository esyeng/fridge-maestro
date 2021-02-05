'use strict';

import { ApiController } from '../components/ApiController';
import { injectDataIntoModal } from '../components/SingleRecipe';
import { makeModal, injectFunctionIntoModal } from './helpers';

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

export const API = new ApiController();

export function stringByIngredients(ingredients) {
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

export function simpleRecipeFinder(str) {
    return new Promise(
        () => {
            API.findRecipes(str);
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

        injectFunctionIntoModal(recipe.id);
        injectDataIntoModal(recipe);
    });
}

/* __________________________________________________ */
