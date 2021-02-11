'use strict';

/*********** API CONTROLLER *******
 * @description Methods for converting HTML queries to simple json, probe api, and receive simple json
 *
 * @private Api access routes
 * @public Access control
 *
 * @method getIngredients Fetch just ingredients @param {String} queryStr => @returns {Promise}
 * @method findRecipes Fetch recipes, accepts specified parameters @param {String} queryStr => @returns {Promise}
 * @method getPhotos Fetch demo data => @returns {Promise}
 * @method resolve Resolve promise and return result @param {Function} promise => @returns {Any}
 */

import { showRecipes } from '../utils/queryLogic';

export const api = (function () {
    return {
        baseUrl: `https://api.spoonacular.com/`,
        ingredientSearch: `https://api.spoonacular.com/food/ingredients/search`,
        recipeSearch: `https://api.spoonacular.com/recipes/findByIngredients`,
        analyzeInstructions: `https://api.spoonacular.com/recipes`,
        complexSearch: `https://api.spoonacular.com/recipes/complexSearch`,
        ingredientInfo: (id) =>
            `https://api.spoonacular.com/food/ingredients/${id}/information`,
        random: `https://api.spoonacular.com/recipes/random`,
        key: null,
    };
})();

export class ApiController {
    constructor() {
        this.ingredients = [];
        this.recipes = {};
        this.photos = {};
    }
    getIngredients(queryStr) {
        fetch(`${api.ingredientSearch}?${queryStr}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((err) => console.error(err));
    }
    complexFind(queryStr) {
        fetch(`${api.complexSearch}?${queryStr}`)
            .then((response) => response.json())
            .then((json) => this.resolve(json))
            .catch((err) => console.error(err));
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
            .catch(err);
    }

    resolve(json) {
        console.log('now resolving response, calling showRecipes with this');
        console.log('what does this look like?', json);
        showRecipes(json);
    }
}
