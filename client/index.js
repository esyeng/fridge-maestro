/**
 *
 * Query Selectors & element targets
 *
 */
//  -- Buttons --

const addToListBtn = document.getElementById('add_to_list'); // add btn
const queryBtn = document.getElementById('get_photos'); // test photo query btn
const clearBtn = document.getElementById('clear_photos'); // clear results btn

// -- Form --

const numSelect = document.getElementById('num_select'); // select #photos (or results when applicable)
const queryBar = document.getElementById('query_bar'); // entry field for query params
const ingredientList = document.getElementById('ingredient_list_ul'); // ul of query params
const submitQuery = document.getElementById('submit_query'); // btn to send request object to probe recipe API(s)

// -- Table --

const toggleNutrition = document.getElementById('toggle_nutrition'); // display table w/dummy data (or search ingredient info & populate table when applicable)
const nutritionTable = document.getElementById('nutrition_table'); // table with dummy data (or nutrition facts)
const nutritionHeader = document.getElementById('nutrition_header'); // label text for table

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

const { api, apiController } = require('./apiController');

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
    ingredientList.removeChild(ingredientToRemove);
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
addToListBtn.addEventListener('click', (e) => {
    if (e.target) {
        let listNodes = [...ingredientList.children];
        let ingredientText = queryBar.value;
        ingredientText = ingredientText.replace(/\W+/g, '');

        if (hasDuplicates(listNodes, ingredientText)) {
            queryBar.value = '';
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
            queryBar.value = '';

            ingredientList.appendChild(ingredientToAdd);
        }
    }
});

numSelect.addEventListener('change', (e) => {
    numSelect.value = e.target.value;
});

/**
 * Generate demo query
 */

queryBtn.addEventListener('click', async (e) => {
    const isCountInRange =
        photoContainer.childElementCount >= 0 &&
        photoContainer.childElementCount <= 9;

    if (e.target && isCountInRange) {
        const numItemsToGet = numSelect.value;
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
clearBtn.addEventListener('click', (e) => {
    while (photoContainer.firstChild) {
        photoContainer.removeChild(photoContainer.firstChild);
    }
    return;
});

/**
 * toggle nutrition table
 */
toggleNutrition.addEventListener('click', (e) => {
    nutritionTable.classList.toggle('table_hidden');
    nutritionHeader.classList.toggle('table_hidden');
});
