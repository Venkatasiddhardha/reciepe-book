// DOM Elements
const recipeForm = document.getElementById('recipe-form');
const recipesContainer = document.getElementById('recipe-cards');
const searchBox = document.getElementById('search-box');

// Retrieve recipes from local storage or initialize an empty array
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Function to display recipes
function displayRecipes(filteredRecipes = recipes) {
    recipesContainer.innerHTML = ''; // Clear container
    filteredRecipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('card');
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="card-content">
                <h3>${recipe.name}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Steps:</strong> ${recipe.steps}</p>
            </div>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}

// Function to add a recipe
function addRecipe(event) {
    event.preventDefault();
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const steps = document.getElementById('recipe-steps').value;
    const imageInput = document.getElementById('recipe-image').files[0];

    if (name && ingredients && steps && imageInput) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newRecipe = {
                name,
                ingredients,
                steps,
                image: e.target.result,
            };
            recipes.push(newRecipe);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            displayRecipes();
            recipeForm.reset();
        };
        reader.readAsDataURL(imageInput);
    } else {
        alert('Please fill in all fields!');
    }
}

// Function to search recipes
function searchRecipes() {
    const query = searchBox.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.toLowerCase().includes(query)
    );
    displayRecipes(filteredRecipes);
}

// Event Listeners
recipeForm.addEventListener('submit', addRecipe);
searchBox.addEventListener('input', searchRecipes);

// Initial display
displayRecipes();
