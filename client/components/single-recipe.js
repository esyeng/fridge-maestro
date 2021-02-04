'use-strict';

function makeModal() {
    const recipeModal = document.createElement('section');
    const innerModal = document.createElement('div');
    const modalHeader = document.createElement('modalHeader');
    const modalBody = document.createElement('div');
    const modalFooter = document.createElement('footer');
    const closeModal = document.createElement('button');
    const saveModal = document.createElement('button');
    const emailModal = document.createElement('button');

    recipeModal.appendChild(innerModal);

    innerModal.appendChild(modalHeader);
    innerModal.appendChild(modalBody);
    innerModal.appendChild(modalFooter);

    recipeModal.appendChild(closeModal);
    recipeModal.appendChild(saveModal);
    recipeModal.appendChild(emailModal);

    return recipeModal;
}

let text = `<section class="modal--show" id="modal-text" tabindex="-1"
    role="dialog" aria-labelledby="modal-label" aria-hidden="true">

<div class="modal-inner">
    <header id="modal-label"><!-- Header --></header>
    <div class="modal-content"><!-- The modals content --></div>
    <footer><!-- Footer --></footer>
</div>

<a href="#!" class="modal-close" title="Close this modal" data-close="Close"
    data-dismiss="modal">?</a>
</section>`;
const responseData = {
    id: 666439,
    image: 'https://spoonacular.com/recipeImages/666439-312x231.jpg',
    imageType: 'jpg',
    likes: 1564,
    missedIngredientCount: 1,
    missedIngredients: [
        {
            aisle: 'Milk, Eggs, Other Dairy',
            amount: 3,
            id: 1049,
            image:
                'https://spoonacular.com/cdn/ingredients_100x100/fluid-cream.jpg',
            meta: [],
            metaInformation: [],
            name: 'half & half',
            original: '3 cups half & half',
            originalName: 'half & half',
            originalString: '3 cups half & half',
            unit: 'cups',
            unitLong: 'cups',
            unitShort: 'cup',
        },
    ],

    title: 'Homemade Ricotta',
    unusedIngredients: [],
    usedIngredientCount: 2,
    usedIngredients: [
        {
            aisle: 'Milk, Eggs, Other Dairy',
            amount: 5,
            id: 1077,
            image: 'https://spoonacular.com/cdn/ingredients_100x100/milk.png',
            meta: [],
            metaInformation: [],
            name: 'full-fat milk',
            original: '5 cups full-fat buttermilk',
            originalName: 'full-fat buttermilk',
            originalString: '5 cups full-fat buttermilk',
            unit: 'cups',
            unitLong: 'cups',
            unitShort: 'cup ',
        },

        {
            aisle: 'Milk, Eggs, Other Dairy',
            amount: 5,
            id: 1077,
            image: 'https://spoonacular.com/cdn/ingredients_100x100/milk.png',
            meta: ['whole'],
            metaInformation: ['whole'],
            name: 'whole milk',
            original: '5 qt. whole milk',
            originalName: 'whole milk',
            originalString: '5 qt. whole milk',
            unit: 'qt',
            unitLong: 'quarts',
            unitShort: 'qt',
        },
    ],
};
