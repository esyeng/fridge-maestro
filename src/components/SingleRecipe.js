'use-strict';

/**
 * @note **
 * I'm being very particular about knowing the exact data types of this recipe
 * object for the sake of building robust queries. Ex, with missed ingredients we
 * could pull in a shopping library. The id of the ingredient exists on the used/unused items,
 * these could be helpful in implicit loading of nutrition facts (ingredient nutrition method
 * requires this).
 */

import { listFromIngredients, showMeTheSteps } from '../utils/helpers';
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
    console.log(
        ` Inside injectDataIntoModal. 
        If we were successful in resolving our instructions, 
        we should now see our instructions available in this function scope`,
        instructions
    );

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

    console.log(
        ` If we have instructions, 
        lets append it to the modal`
    );
    recipeContent.innerHTML = `<h2>${singleRecipeData.title}</h2>`;
    recipeContent.appendChild(missedList);
    recipeContent.appendChild(usedList);
    instructions
        ? recipeContent.appendChild(instructions)
        : recipeContent.appendChild(instructionNotFoundMessage);
    // recipeHeader.appendChild(recipeImage);
    recipeHeader.appendChild(recipeContent);
    recipe.appendChild(recipeHeader);
    recipe.appendChild(recipeFooter);
    console.log(
        ` If all of this data trail was error free, 
        the modal will have all our data as we exit 
        this function and return to showRecipes`
    );
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
