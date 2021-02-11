'use-strict';

/**
 * @note **
 * I'm being very particular about knowing the exact data types of this recipe
 * object for the sake of building robust queries. Ex, with missed ingredients we
 * could pull in a shopping library. The id of the ingredient exists on the used/unused items,
 * these could be helpful in implicit loading of nutrition facts (ingredient nutrition method
 * requires this).
 */

import { listFromIngredients } from '../utils/helpers';
// import { analyzeInstructions, getInstructions } from '../utils/queryLogic';
import { api } from './ApiController';

const recipeDataTypes = {
    id: Number,
    image: String,
    imageType: String,
    likes: Number,
    missedIngredientCount: Number,
    missedIngredients: Array,
    title: String,
    unusedIngredients: Array,
    usedIngredientCount: Number,
    usedIngredients: Array,
};

/**
 * makeRecipeComponent
 * @param {*} singleRecipeData
 */

export function injectDataIntoModal(singleRecipeData, instructions) {
    const recipe = document.getElementById(`${singleRecipeData.id}-modal`);
    const recipeContent = document.createElement(`div`);
    recipeContent.setAttribute('class', 'modal-content');
    const recipeHeader = document.getElementById(
        `${singleRecipeData.id}-modal-header`
    );
    const recipeImage = document.createElement('img');
    const recipeFooter = document.createElement('footer');
    const instructionNotFoundMessage = document.createElement('p');
    instructionNotFoundMessage.innerHTML = `No instructions came up... Sorry :(`;

    recipeImage.src = `${singleRecipeData.image}`;
    recipeFooter.setAttribute('class', 'modal-footer');

    let missedList;
    singleRecipeData.missedIngredientCount > 0
        ? (missedList = listFromIngredients(
              singleRecipeData.missedIngredients,
              'ingredients missing'
          ))
        : (missedList = listFromIngredients(
              [{ amount: 0, unit: '', name: '' }],
              'ingredients missing'
          ));

    let usedList;
    singleRecipeData.usedIngredientCount > 0
        ? (usedList = listFromIngredients(
              singleRecipeData.usedIngredients,
              'ingredients used'
          ))
        : (missedList = listFromIngredients(
              [{ amount: 0, unit: '', name: '' }],
              'ingredients used'
          ));
    recipeContent.innerHTML = `<h2>${singleRecipeData.title}</h2>`;
    recipeContent.appendChild(missedList);
    recipeContent.appendChild(usedList);
    instructions
        ? recipeContent.appendChild(instructions)
        : recipeContent.appendChild(instructionNotFoundMessage);
    recipeHeader.appendChild(recipeContent);
    recipe.appendChild(recipeHeader);
    recipe.appendChild(recipeFooter);
}

export function getInstructions(instructions) {
    return instructions;
}

export function analyzeInstructions(id) {
    return fetch(
        `${api.analyzeInstructions}/${id}/analyzedInstructions?apiKey=${api.key}`
    )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            return json;
        })
        .catch((err) => console.error(err));
}

export async function resolveInstructionsAndData(recipeId, recipeData) {
    analyzeInstructions(recipeId).then(async (instructions) => {
        const inst = await getInstructions(instructions);
        let recipeInstructions;

        if (inst.length && inst[0].steps.length > 0) {
            recipeInstructions = showMeTheSteps(inst[0].steps);
        }

        if (recipeInstructions) {
            injectDataIntoModal(recipeData, recipeInstructions);
        } else {
            console.log('unable to resolve instructions');
            injectDataIntoModal(recipeData);
        }
    });
}

export function showMeTheSteps(instructions) {
    const listOfInstructions = document.createElement('ul');
    listOfInstructions.setAttribute(
        'class',
        'single_recipe_list list_unstyled'
    );
    listOfInstructions.innerHTML = `<h3 class="modal_content_sub" >Instructions: </h3>`;
    const eqList = document.createElement('ul');
    eqList.setAttribute('class', 'single_recipe_list_eq list_unstyled');
    eqList.innerHTML = `<h3 class="modal_content_sub">Equipment: </h3>`;
    console.log('equipment list', eqList);
    let needsEquipment = false;

    instructions.forEach((step) => {
        if (step.equipment.length > 0) {
            needsEquipment = true;
            step.equipment.forEach((item) => {
                const eq = document.createElement('li');
                eq.innerHTML = `<p>${item.name}</p>`;
                eqList.appendChild(eq);
            });
        }
        const stepToShow = document.createElement('li');
        stepToShow.innerHTML = `
        <p class="modal_content_list_p" >${step.number}: ${step.step}</p>`;
        listOfInstructions.appendChild(stepToShow);
    });
    needsEquipment ? listOfInstructions.appendChild(eqList) : null;
    return listOfInstructions;
}
