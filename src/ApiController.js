import { api } from './api.js';

/*********** API CONTROLLER *******
 * @description Methods for converting HTML queries to simple json, probe api, and receive simple json
 *
 * @private Api access routes
 * @public Access control
 *
 * @method parseQuery Concatenate URL with ingredients to queryStr @param {Object} data => @returns {String} parsedQuery
 * @method getIngredients Fetch just ingredients @param {String} queryStr => @returns {Promise}
 * @method findRecipes Fetch recipes, accepts specified parameters @param {String} queryStr => @returns {Promise}
 * @method getPhotos Fetch demo data => @returns {Promise}
 * @method resolve Resolve promise and return result @param {Function} promise => @returns {Any}
 */

export class ApiController {
    constructor() {
        this.ingredients = {};
        this.recipes = {};
        this.photos = {};
    }
    parseQuery(data) {
        let query = data.url;
        for (let param in data.params) {
            query +=
                encodeURIComponent(param) +
                '=' +
                encodeURIComponent(data.params[param]) +
                '&';
        }
        return query.slice(0, -1);
    }
    getIngredients(queryStr) {
        fetch(`${api.ingredientSearch}/${queryStr}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch(() => this.fallBackRequest().catch((e) => console.error(e)));
    }
    findRecipes(queryStr) {
        fetch(`${api.recipeSearch}/${queryStr}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch(() => this.fallBackRequest().catch((e) => console.error(e)));
    }
    fallBackRequest(queryStr) {
        fetch(`${api.random}/${queryStr}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((e) => this.getPhotos(9));
    }
    getPhotos(num) {
        fetch(`http://localhost:5500/${num}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((e) => console.error(e));
    }
    resolve(promise) {
        console.log(`${promise} pending`);
        promise.then((result) => result);
    }
}

// export default ApiController.prototype = {
//     parseQuery: (data) => {
//         let query = data.url;
//         for (let param in data.params) {
//             query +=
//                 encodeURIComponent(param) +
//                 '=' +
//                 encodeURIComponent(data.params[param]) +
//                 '&';
//         }
//         return query.slice(0, -1);
//     },
//     getIngredients: (queryStr) => {
//         fetch(`${api.ingredientSearch}/${queryStr}`)
//             .then((response) => response.json())
//             .then((json) => json)
//             .catch(() => this.fallBackRequest().catch((e) => console.error(e)));
//     },
//     findRecipes: (queryStr) => {
//         fetch(`${api.recipeSearch}/${queryStr}`)
//             .then((response) => response.json())
//             .then((json) => json)
//             .catch(() => this.fallBackRequest().catch((e) => console.error(e)));
//     },
//     fallBackRequest: (queryStr) => {
//         fetch(`${api.random}/${queryStr}`)
//             .then((response) => response.json())
//             .then((json) => json)
//             .catch((e) => this.getPhotos(9));
//     },
//     getPhotos: (num) => {
//         fetch(`http://localhost:5500/${num}`)
//             .then((response) => response.json())
//             .then((json) => json)
//             .catch((e) => console.error(e));
//     },
//     resolve: (promise) => {
//         console.log(`${promise} pending`);
//         promise.then((result) => result);
//     },
// };

// export const ApiController = () => {
//     return {
//         parseQuery: (data) => {
//             let query = data.url;
//             for (let param in data.params) {
//                 query +=
//                     encodeURIComponent(param) +
//                     '=' +
//                     encodeURIComponent(data.params[param]) +
//                     '&';
//             }
//             return query.slice(0, -1);
//         },
//         getIngredients: (queryStr) => {
//             fetch(`${api.ingredientSearch}/${queryStr}`)
//                 .then((response) => response.json())
//                 .then((json) => json)
//                 .catch(() =>
//                     this.fallBackRequest().catch((e) => console.error(e))
//                 );
//         },
//         findRecipes: (queryStr) => {
//             fetch(`${api.recipeSearch}/${queryStr}`)
//                 .then((response) => response.json())
//                 .then((json) => json)
//                 .catch(() =>
//                     this.fallBackRequest().catch((e) => console.error(e))
//                 );
//         },
//         fallBackRequest: (queryStr) => {
//             fetch(`${api.random}/${queryStr}`)
//                 .then((response) => response.json())
//                 .then((json) => json)
//                 .catch((e) => this.getPhotos(9));
//         },
//         getPhotos: (num) => {
//             fetch(`http://localhost:5500/${num}`)
//                 .then((response) => response.json())
//                 .then((json) => json)
//                 .catch((e) => console.error(e));
//         },
//         resolve: (promise) => {
//             console.log(`${promise} pending`);
//             promise.then((result) => result);
//         },
//     };
// };

/**
 * @notes 
 * 
 * 
 * findRecipes("stringwithparams").then(data => resolve(data))
 * 
 * 
 
 
 // saving for reference //
 
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
    
    generatePhoto().then((data) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(data),
        };
        return response;
    });
    
    */
