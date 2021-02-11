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
        `STEP 22: Inside injectDataIntoModal. 
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
    // instructions
    //     ? instructions[0].steps.length > 0
    //         ? (recipeInstructions = showMeTheSteps(instructions[0].steps)) &&
    //           recipeContent.appendChild(recipeInstructions)
    //         : null
    //     : null;
    console.log(
        `STEP 23: If we have instructions, 
        lets append it to the modal`
    );
    recipeHeader.innerHTML = `${singleRecipeData.title}`;
    recipeContent.appendChild(missedList);
    recipeContent.appendChild(usedList);
    recipeContent.appendChild(instructions);
    recipeHeader.appendChild(recipeImage);
    // console.log(recipeContent);
    recipeHeader.appendChild(recipeContent);
    recipe.appendChild(recipeHeader);
    recipe.appendChild(recipeFooter);
    console.log(
        `STEP 24: If all of this data trail was error free, 
        the modal will have all our data as we exit 
        this function and return to showRecipes`
    );
}

export function getInstructions(instructions) {
    // console.log('Checking data types of resolved promise', instructions);
    console.log(
        `STEP 8: Hoping into getInstructions from 
        resolveInstructions, returning resolved promise`
    );

    return instructions;
}

export function analyzeInstructions(id) {
    console.log('STEP 5: Inside analyzeInstructions');

    return fetch(
        `${api.analyzeInstructions}/${id}/analyzedInstructions?apiKey=${api.key}`
    )
        .then((response) => {
            console.log('STEP 6: Got response, converting to json');

            return response.json();
        })
        .then((json) => {
            console.log(
                'STEP 7: Now we have json, hoping out and back to resolveInstructions with this:',
                json
            );

            return json;
        })
        .catch((err) => console.error(err));
}

export async function resolveInstructionsAndData(recipeId, recipeData) {
    console.log(
        'STEP 4: Inside resolveInstructions function call, about to fetch'
    );

    analyzeInstructions(recipeId).then(async (instructions) => {
        const inst = await getInstructions(instructions);
        // console.log('I have my instructions now!', inst);
        console.log(
            `STEP 9: back in resolveInstructions with a resolved promise, 
        declaring new var to store them`
        );

        let recipeInstructions;
        console.log(
            `STEP 10: Inside resolveInstructions, 
        checking if the resolved instructions array at 
        index 0 has a steps property, if it does and it is 
        not an empty array, we call showMeTheSteps. 
        Lets see what it is:`,
            inst
        );

        if (inst[0].steps.length > 0) {
            recipeInstructions = showMeTheSteps(inst[0].steps);
        }
        console.log(
            `STEP 20: If our instructions at 0 did not 
        have an array with content, we jumped here from step 10. 
        Next we check if we were able to return a list from 
        showMeTheSteps which will be false by default if we jumped`
        );

        if (recipeInstructions) {
            console.log(
                `STEP 21: if recipeInstructions is truthy, 
            it means we have a list of instructions available. 
            Now we will call our injectIntoModal function`
            );
            injectDataIntoModal(recipeData, recipeInstructions);
        }
        // instructions[0].steps.length > 0
        //     ? (recipeInstructions = showMeTheSteps(instructions[0].steps))
        //     : null;

        // recipeInstructions
        //     ? injectDataIntoModal(recipeData, recipeInstructions)
        //     : console.error('IT BROKE BRUH');
    });
}
