'use-strict';

/**
 * makeRecipeComponent
 * @param {*} singleRecipeData
 */

function injectDataIntoModal(singleRecipeData) {
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

    recipeHeader.innerHTML = `${singleRecipeData.title}`;
    recipeContent.appendChild(missedList);
    recipeContent.appendChild(usedList);
    recipeHeader.appendChild(recipeImage);
    console.log(recipeContent);
    recipeHeader.appendChild(recipeContent);
    recipe.appendChild(recipeHeader);
    recipe.appendChild(recipeFooter);
}
