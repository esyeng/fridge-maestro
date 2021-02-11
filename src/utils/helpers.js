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
    listOfIngredients.innerHTML = `<h4>${listType}: </h4>`;
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

export function showMeTheSteps(instructions) {
    const listOfInstructions = document.createElement('ul');
    listOfInstructions.setAttribute(
        'class',
        'single_recipe_list list_unstyled'
    );
    listOfInstructions.innerHTML = `<h2>Instructions: </h2>`;
    let eqList;
    let needsEquipment = false;

    instructions.forEach((step) => {
        if (step.equipment.length > 0) {
            needsEquipment = true;
            console.log(
                `our step had a list of equipment, 
            prompting us to generate a new list and assign 
            to an outer scope variable eqList. Set boolean check to true`
            );

            eqList = document
                .createElement('ul')
                .setAttribute('class', 'single_recipe_list list_unstyled');
            console.log(
                `Within instructions.forEach, 
                jumping into step.equipment.forEach`
            );

            step.equipment.forEach((item) => {
                console.log('Creating list item for each piece of equipment');

                eqList.appendChild(
                    (document.createElement(
                        'li'
                    ).innerHTML = `<p>${item.name}</p>`)
                );
            });
        }
        console.log(
            `our step did not have a list of equipment, 
        leaving our boolean check false. now we create a list 
        element for each step of instructions`
        );

        const stepToShow = document.createElement('li');
        stepToShow.innerHTML = `
        <p>${step.number}: ${step.step}</p>`;
        console.log(
            `To conclude one iteration, 
        append the step list element to the listOfInstructions`
        );

        listOfInstructions.appendChild(stepToShow);
    });
    console.log(`Exiting instructions forEach, `);

    needsEquipment ? listOfInstructions.appendChild(eqList) : null;
    return listOfInstructions;
}

/**
 * makeModal
 *
 */

export function makeModal(id) {
    // const recipeModal = document.createElement('section');
    const modal = document.createElement('div');
    modal.innerHTML = `
    <button id="${id}-btn">Open Modal</button>
        <div id="${id}-modal-header" class="modal" style='display: none'>
         <span class="close">&times;</span>
        </div>`;
    modal.id = `${id}-modal`;
    return modal;
}

export function injectFunctionIntoModal(id) {
    const modal = document.getElementById(`${id}-modal-header`);
    const btn = document.getElementById(`${id}-btn`);
    const span = document.getElementsByClassName('close')[0];

    btn.addEventListener('click', (e) => {
        if (modal.style.display === 'none') {
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
