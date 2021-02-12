'use strict';

import { analyzeInstructions } from './queryLogic';

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

export function setAttributes(element, attributePairs) {
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

export function hasDuplicates(collection, text) {
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

export function removeIngredient(ingredientText) {
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

export function showHide(el) {
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

export function makeButton(text, classes) {
    let button = document.createElement('button');
    button.setAttribute('class', classes);
    button.innerHTML = text;
    return button;
}

export function makeAnchor(text, classes) {
    let anchor = document.createElement('a');
    anchor.setAttribute('class', classes);
    anchor.innerHTML = text;
    return anchor;
}

export function stringFromValues(arr) {
    let str = '';
    arr.forEach((val) => (str += val));
}

export function getCheckedValues(HTMLElement) {
    let arrVals = [];
    for (let i = 1; i < HTMLElement.childElementCount; i++) {
        let input = HTMLElement.children[i];
        input.lastChild.checked
            ? arrVals.push(`${input.lastChild.name}`)
            : null;
    }
    return arrVals;
}

/**
 * addGeneratorButtonToRecipe
 * @summary Append button to recipe, used to call export function
 * to generate dynamic recipe
 * @param {Object} recipe
 *
 * @returns {HTMLCollection} newList
 */

export function addGeneratorButtonToRecipe(recipe) {
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

/**
 * listFromIngredients
 * @param {*} ingredients
 */

export function listFromIngredients(ingredients, listType) {
    const listOfIngredients = document.createElement('ul');
    listOfIngredients.setAttribute('class', 'single_recipe_list list_unstyled');
    listOfIngredients.innerHTML = `<h3 class="modal_content_sub">${listType}: </h3>`;
    ingredients.forEach((ingredient) => {
        const ingredientToAdd = document.createElement('li');
        ingredientToAdd.setAttribute('class', 'single_recipe_list_item');
        ingredientToAdd.innerHTML = `
            <p>${ingredient.amount} ${ingredient.unit} ${ingredient.name}</p>
        `;
        listOfIngredients.appendChild(ingredientToAdd);
    });
    return listOfIngredients;
}

/**
 * makeModal
 *
 */

export function makeModal(id) {
    // const recipeModal = document.createElement('section');
    const modal = document.createElement('div');
    modal.innerHTML = `
    <button id="${id}-btn" class="btn btn-dark">View</button>
        <div id="${id}-modal-header" class="modal" style='display: none'>
         <span class="close">&times;</span>
        </div>`;
    modal.id = `${id}-modal`;
    return modal;
}

export function controlModal(modal) {
    modal.style.display === 'none'
        ? (modal.style.display = 'block')
        : (modal.style.display = 'none');
}

export function injectFunctionIntoModal(recipe, id) {
    const modal = document.getElementById(`${id}-modal-header`);
    const btn = document.getElementById(`${id}-btn`);
    const span = document.getElementsByClassName('close')[0];
    const recent = document.getElementById('recent');
    const anchor = document.createElement(`li`);
    anchor.addEventListener('click', controlModal(modal));
    anchor.innerText = recipe.title;
    anchor.setAttribute('class', 'breadcrumb-item fake_tag');

    btn.addEventListener('click', (e) => {
        if (
            modal.style.display === 'none' &&
            recent.lastChild.innerText !== anchor.innerText
        ) {
            recent.appendChild(anchor);
            modal.style.display = 'block';
        } else if (
            modal.style.display === 'none' &&
            recent.lastChild.innerText === anchor.innerText
        ) {
            modal.style.display = 'block';
        } else {
            modal.style.display = 'none';
        }
    });

    span.addEventListener('click', (e) => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
}

export function passRecipe(recipe, target) {
    let i = 0;
    if (target === 'DOM') {
        i++;
    }
    let stringOfRecipe = JSON.stringify(recipe);
    localStorage.setItem(`recipe ${i}`, stringOfRecipe);
    console.log('localstorage: ', localStorage);
}

export function emailResults() {
    const addressBar = document.getElementById('email_results');
    // POST local storage in JSON format to input email via server
}

export function stringSplice(str, index, count, addition) {
    index < 0 ? (index = str.length + index) : null;
    return str.slice(0, index) + (addition || '') + str.slice(index + count);
}

export function saveRecipe(recipe, id) {
    let saveThisPair = `${id}: ${JSON.stringify(recipe)}`;
    localStorage.savedIds
        ? localStorage.setItem(
              `savedIds`,
              stringSplice(
                  `${localStorage.savedIds}, `,
                  localStorage.savedIds.length - 1,
                  0,
                  saveThisPair
              )
          )
        : localStorage.setItem(`savedIds`, `{ ${saveThisPair} }`);

    JSON.stringify(localStorage.savedIds);
}

let testRecipe = {
    ingredients: ['chocolate', 'peanut butter'],
    instructions: [{ 1: 'make it chocolate' }, { 2: 'make it peanut butter' }],
};

let testTwo = {
    ingredients: ['OTHER', 'OTHEERRR'],
    instructions: [{ 1: 'MAKE IT' }, { 2: 'MAKE IT NOW' }],
};

let testId = 96;
let testIdTwo = 543;

localStorage.setItem(`savedIds`, '');

console.log('localStorage before 1', localStorage);
console.log('perform operation 1');
saveRecipe(testRecipe, testId);
console.log('localStorage after 1, before 2', localStorage);
console.log('perform operation 2');
saveRecipe(testTwo, testIdTwo);
console.log('localStorage after 2', localStorage);

console.log(JSON.parse(localStorage.savedIds));
