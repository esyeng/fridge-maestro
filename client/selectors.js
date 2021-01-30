/**
 *
 * Query Selectors & element targets
 *
 */
// //  -- Buttons --

// const buttons = {
//     addToList: document.getElementById('add_to_list'), // add btn
//     query: document.getElementById('get_photos'), // test photo query btn
//     clear: document.getElementById('clear_photos'), // clear results btn,
//     submit: document.getElementById('submit_query'), // btn to send request object to probe recipe API(s)
// };

// const form = {
//     numSelect: document.getElementById('num_select'), // select #photos (or results when applicable),
//     queryBar: document.getElementById('query_bar'), // entry field for query params
//     ingredientList: document.getElementById('ingredient_list_ul'), // ul of query params
// };

// module.exports = { buttons, form };

// // const table = {
// //     toggleNutri
// // }

export const addToListBtn = document.getElementById('add_to_list'); // add btn
export const queryBtn = document.getElementById('get_photos'); // test photo query btn
export const clearBtn = document.getElementById('clear_photos'); // clear results btn

// -- Form --

export const numSelect = document.getElementById('num_select'); // select #photos (or results when applicable)
export const queryBar = document.getElementById('query_bar'); // entry field for query params
export const ingredientList = document.getElementById('ingredient_list_ul'); // ul of query params
export const submitQuery = document.getElementById('submit_query'); // btn to send request object to probe recipe API(s)

// -- Table --

export const toggleNutrition = document.getElementById('toggle_nutrition'); // display table w/dummy data (or search ingredient info & populate table when applicable)
export const nutritionTable = document.getElementById('nutrition_table'); // table with dummy data (or nutrition facts)
export const nutritionHeader = document.getElementById('nutrition_header'); // label text for table
