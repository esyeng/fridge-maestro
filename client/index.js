/**
 *
 * Module Imports
 *
 */
import * as selectors from './selectors';
import { api, apiController } from './apiController';

/**
 *
 * Data containers
 *
 */

const photoContainer = document.getElementById('food_container');

/**
 * *****************************************************************
 *
 * Expanded directory structure in progress. For now, buttons & data methods exist here, will
 * refactor to separate button controllers from data access methods
 *
 * *****************************************************************
 */

/**
 *
 * Public API methods
 *
 */

const getPhotos = async (num) => {
    const generate = new Promise((resolve, reject) => {
        fetch(`http://localhost:5500/${num}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((json) => {
                resolve(json);
            })
            .catch((err) => {
                reject((err) => console.error(err));
            });
    });
    return generate.then((res) => {
        return res;
    });
};

/**
 *
 * Helper functions
 *
 */

const createDomItem = (element) => document.createElement(element);

// quickly set multiple attributes
function setAttributes(element, attributePairs) {
    attributePairs.forEach((attributePair) => {
        let attribute = attributePair.attribute;
        let value = attributePair.value;
        element.setAttribute(attribute, value);
    });
    return element;
}

function removeIngredient(ingredientText) {
    let ingredientToRemove = document.getElementById(ingredientText.id);
    selectors.ingredientList.removeChild(ingredientToRemove);
}

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
 *
 * Element event listeners
 *
 */

// Ingredient list adding procedure
selectors.addToListBtn.addEventListener('click', (e) => {
    if (e.target) {
        let listNodes = [...selectors.ingredientList.children];
        let ingredientText = selectors.queryBar.value;
        ingredientText = ingredientText.replace(/\W+/g, '');

        if (hasDuplicates(listNodes, ingredientText)) {
            selectors.queryBar.value = '';
            return false;
        } else {
            let ingredientToAdd = createDomItem('li');
            ingredientToAdd = setAttributes(ingredientToAdd, [
                {
                    attribute: 'class',
                    value: 'ingredient_li tag-remove',
                },
                {
                    attribute: 'id',
                    value: ingredientText,
                },
                {
                    attribute: 'onclick',
                    value: `removeIngredient(${ingredientText})`,
                },
            ]);
            ingredientToAdd.innerHTML = ingredientText;
            selectors.queryBar.value = '';

            selectors.ingredientList.appendChild(ingredientToAdd);
        }
    }
});

selectors.numSelect.addEventListener('change', (e) => {
    selectors.numSelect.value = e.target.value;
});

/**
 * Generate demo query
 */
selectors.queryBtn.addEventListener('click', async (e) => {
    const isCountInRange =
        photoContainer.childElementCount >= 0 &&
        photoContainer.childElementCount <= 9;

    if (e.target && isCountInRange) {
        const numItemsToGet = selectors.numSelect.value;
        const picUrlObj = await getPhotos(numItemsToGet);
        const picPack = Object.keys(picUrlObj);
        const picData = Object.values(picUrlObj);

        picPack.forEach((i) => {
            let newCard = createDomItem('div');
            let newPhoto = createDomItem('img');
            newPhoto.src = picData[i].body.image;
            newCard.innerHTML = 'Recipe card example';

            newCard.appendChild(newPhoto);

            newCard.setAttribute('class', 'food_container_card');
            newPhoto.setAttribute('class', 'food_container_img');

            photoContainer.appendChild(newCard);
        });
    }
});

/**
 * clear viewport container
 */
selectors.clearBtn.addEventListener('click', (e) => {
    while (photoContainer.firstChild) {
        photoContainer.removeChild(photoContainer.firstChild);
    }
    return;
});

/**
 * toggle nutrition table
 */
selectors.toggleNutrition.addEventListener('click', (e) => {
    selectors.nutritionTable.classList.toggle('table_hidden');
    selectors.nutritionHeader.classList.toggle('table_hidden');
});
