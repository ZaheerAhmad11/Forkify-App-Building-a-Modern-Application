const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
}; // NEW API URL (instead of the one shown in the video)
 // https://forkify-api.jonas.io
 ///////////////////////////////////////

//# sourceMappingURL=14 18 - Forkify App Building a Modern Application.62406edb.js.map
