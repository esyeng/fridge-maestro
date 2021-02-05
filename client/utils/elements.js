'use strict';

/*                                                    */
/* =================== SELECTORS ==================== */
/*                                                    */

/**
 *
 * @element Data container
 *
 */

const foodContainer = document.getElementById('food_container');

/**
 *
 * @element Button
 *
 */

const addToList = document.getElementById('add_to_list'); // add btn
const clear = document.getElementById('clear_photos'); // clear results btn,
const submit = document.getElementById('submit_query'); // btn to send request object to probe recipe API(s)
const photos = document.getElementById('get_photos'); // test photo query btn

/**
 *
 * @element Form
 *
 */

const numSelect = document.getElementById('num_select'); // select #photos (or results when applicable),
const queryBar = document.getElementById('query_bar'); // entry field for query params
const ingredientList = document.getElementById('ingredient_list_ul'); // ul of query params
const filterResult = document.getElementById('filter_results');
const mealType = document.getElementById('meal_type');
const mealChoices = mealType.childNodes;

/**
 *
 * @element Table
 *
 */
const toggleNutrition = document.getElementById('toggle_nutrition');
const nutritionTable = document.getElementById('nutrition_table'); // table with dummy data (or nutrition facts),
const nutritionHeader = document.getElementById('nutrition_header'); // label text for table

/* __________________________________________________ */
