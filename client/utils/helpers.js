'use strict';

/**
 *
 * Helper functions
 *
 */

/**
 * setAttributes
 * @summary Set multiple attributes on single element
 * @param  {HTMLElement} element
 * @param  {Array} attributePairs attribute: value
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

function makeAnchor(text, classes) {
    let anchor = document.createElement('a');
    anchor.setAttribute('class', classes);
    anchor.innerHTML = text;
    return anchor;
}

/**
 * addGeneratorButtonToRecipe
 * @summary Append button to recipe, used to call function
 * to generate dynamic recipe
 * @param {Object} recipe
 *
 * @returns {HTMLCollection} newList
 */

function addGeneratorButtonToRecipe(recipe) {
    let expandResultButton = makeAnchor(
        'view details',
        'recipe_card_button recipe btn btn-dark show'
    );
    expandResultButton.addEventListener('click', (e) => {
        if (e.target.parentElement.id === recipe.id) {
            document.removeChild(e.target.parentElement);
        } else {
            makeRecipeComponent(recipe);
        }
    });

    return expandResultButton;
}
