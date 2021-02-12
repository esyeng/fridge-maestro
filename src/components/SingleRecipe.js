'use-strict';

/**
 * @note **
 * I'm being very particular about knowing the exact data types of this recipe
 * object for the sake of building robust queries. Ex, with missed ingredients we
 * could pull in a shopping library. The id of the ingredient exists on the used/unused items,
 * these could be helpful in implicit loading of nutrition facts (ingredient nutrition method
 * requires this).
 */

import { listFromIngredients, passRecipe } from '../utils/helpers';
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

function captureRecipe(singleRecipeData, instructions) {
    const recipe = {};
    recipe.id = singleRecipeData.id;
    recipe.data = singleRecipeData;
    recipe.instructions = instructions ? instructions : 'none';
    passRecipe(recipe);
}

function createSaved() {
    const savedRecipes = document.createElement('div');
    savedRecipes.setAttribute('class', 'recently_viewed');
    savedRecipes.id = 'saved';
    savedRecipes.innerHTML = `
    <a name="saved"></a>
    <h3 class="result_box_item recipe">Saved</h3>
    <ul id="saved-recipes" class="result_box_item recipe breadcrumb">
    </ul>`;
    return savedRecipes;
}

export function injectDataIntoModal(singleRecipeData, instructions) {
    const recipe = document.getElementById(`${singleRecipeData.id}-modal`);
    const recipeContent = document.createElement(`div`);
    recipeContent.setAttribute('class', 'modal-content');
    const recipeHeader = document.getElementById(
        `${singleRecipeData.id}-modal-header`
    );
    const recipeImage = document.createElement('img');
    const saveRecipe = document.createElement('button');
    saveRecipe.innerText = 'Save';
    saveRecipe.setAttribute('class', 'btn btn-light save');
    saveRecipe.addEventListener('click', (e) => {
        const recipeCenter = document.getElementById('recipe_center_section');
        const savedRef = document.createElement(`li`);
        const savedDivIfFirstSave = createSaved();
        savedRef.setAttribute('class', 'breadcrumb-item fake_tag');
        savedRef.innerText = singleRecipeData.title;
        savedRef.addEventListener('click', (e) => {
            if (recipeHeader.style.display === 'none') {
                recipeHeader.style.display = 'block';
            } else {
                recipeHeader.style.display = 'none';
            }
        });
        const savedDiv = document.getElementById('saved');
        if (savedDiv && savedDiv.lastChild.innerText !== savedRef.innerText) {
            savedDiv.appendChild(savedRef);
        } else if (!savedDiv) {
            savedDivIfFirstSave.appendChild(savedRef);
            recipeCenter.appendChild(savedDivIfFirstSave);
        }
        let saved = document.getElementById('saved');
        recipeHeader.style.display = 'none';
        saved.scrollIntoView();
    });

    const instructionNotFoundMessage = document.createElement('p');
    instructionNotFoundMessage.innerHTML = `No instructions came up... Sorry :(`;

    recipeImage.src = `${singleRecipeData.image}`;

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
    recipeContent.appendChild(saveRecipe);
    instructions
        ? recipeContent.appendChild(instructions)
        : recipeContent.appendChild(instructionNotFoundMessage);
    recipeHeader.appendChild(recipeContent);
    recipe.appendChild(recipeHeader);
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
        inst ? captureRecipe(recipeData, inst) : captureRecipe(recipeData);
        let recipeInstructions;

        if (inst.length && inst[0].steps.length > 0) {
            recipeInstructions = showMeTheSteps(inst[0].steps);
        }

        if (recipeInstructions) {
            injectDataIntoModal(recipeData, recipeInstructions);
        } else {
            injectDataIntoModal(recipeData);
        }
    });
}

export function showMeTheSteps(instructions) {
    const listOfInstructions = document.createElement('ul');
    listOfInstructions.setAttribute(
        'class',
        'single_recipe_list list_unstyled instructions_list'
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
