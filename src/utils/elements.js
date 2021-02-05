'use strict';

/*                                                    */
/* =================== SELECTORS ==================== */
/*                                                    */

/**
 *
 * @element Data container
 *
 */

export const foodContainer = document.getElementById('food_container');

/**
 *
 * @element Button
 *
 */

export const addToList = document.getElementById('add_to_list'); // add btn
export const clear = document.getElementById('clear_photos'); // clear results btn,
export const submit = document.getElementById('submit_query'); // btn to send request object to probe recipe API(s)
export const photos = document.getElementById('get_photos'); // test photo query btn

/**
 *
 * @element Form
 *
 */

export const numSelect = document.getElementById('num_select'); // select #photos (or results when applicable),
export const queryBar = document.getElementById('query_bar'); // entry field for query params
export const ingredientList = document.getElementById('ingredient_list_ul'); // ul of query params
export const filterResult = document.getElementById('filter_results');
export const mealType = document.getElementById('meal_type');
export const mealChoices = mealType.childNodes;

/**
 *
 * @element Table
 *
 */
export const toggleNutrition = document.getElementById('toggle_nutrition');
export const nutritionTable = document.getElementById('nutrition_table'); // table with dummy data (or nutrition facts),
export const nutritionHeader = document.getElementById('nutrition_header'); // label text for table

/* __________________________________________________ */
