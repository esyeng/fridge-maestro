'use strict';

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
 * listFromIngredients
 * @param {*} ingredients
 */

function listFromIngredients(ingredients, listType) {
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

/**
 * makeModal
 *
 */

function makeModal(id) {
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

function injectFunctionIntoModal(id) {
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
