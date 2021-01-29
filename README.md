**Web Dev Fundamentals Project**

---

## FridgeMaestro - Use what's in your fridge to let this tool find the perfect recipes
## Update pending


# Utilizing SpoonacularAPI

# API REFERENCE: 

<!-- 
query  |  string	 |  pasta	 |  The (natural language)  |  recipe search query.
cuisine	string |	italian	 | The cuisine(s) of the recipes. |  One or more, comma separated (will be interpreted as 'OR').
excludeCuisine | 	string | 	greek | 	The cuisine(s) the recipes must not match. One or more, comma separated (will be interpreted as 'AND').
diet | 	string	|  vegetarian	|  The diet for which the recipes must be suitable. 
intolerances  |  string  | 	gluten	A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. 
equipment	string	pan	The equipment required. Multiple values will be interpreted as 'or'. For example, value could be "blender, frying pan, bowl".
includeIngredients |  string  |  tomato,+cheese |   A comma-separated list of ingredients that should/must be used in the recipes.
excludeIngredients |  string  |	 eggs  |   A comma-separated list of ingredients or ingredient types that the recipes must not contain.
type	string	main course	The type of recipe. See a full list of supported meal types.
instructionsRequired	boolean	true	Whether the recipes must have instructions.
fillIngredients	boolean	false	Add information about the ingredients and whether they are used or missing in relation to the query.
addRecipeInformation	boolean	false	If set to true, you get more information about the recipes returned.
addRecipeNutrition	boolean	false	If set to true, you get nutritional information about each recipes returned.
author	string	coffeebean	The username of the recipe author.
tags	string	myCustomTag	User defined tags that have to match. The author param has to be set.
recipeBoxId	number	2468	The id of the recipe box to which the search should be limited to.
titleMatch	string	Crock Pot	Enter text that must be found in the title of the recipes.
maxReadyTime	number	20	The maximum time in minutes it should take to prepare and cook the recipe.
ignorePantry	boolean	true	Whether to ignore typical pantry items, such as water, salt, flour, etc.
sort	string	calories	The strategy to sort recipes by. See a full list of supported sorting options.
sortDirection	string	asc	The direction in which to sort. Must be either 'asc' (ascending) or 'desc' (descending).
minCarbs	number	10	The minimum amount of carbohydrates in grams the recipe must have.
maxCarbs	number	100	The maximum amount of carbohydrates in grams the recipe can have.
minProtein	number	10	The minimum amount of protein in grams the recipe must have.
maxProtein	number	100	The maximum amount of protein in grams the recipe can have.
minCalories	number	50	The minimum amount of calories the recipe must have.
maxCalories	number	800	The maximum amount of calories the recipe can have. -->