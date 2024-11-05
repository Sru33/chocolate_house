document.addEventListener('DOMContentLoaded', function () {
    loadFlavors();
    loadIngredients();
    createFlavorCards();

    
    function loadFlavors() {
        fetch('/flavors')
            .then(response => response.json())
            .then(data => {
                const flavorList = document.getElementById('flavor-list');
                flavorList.innerHTML = '';
                data.forEach(flavor => {
                    const li = document.createElement('li');
                    li.textContent = `${flavor.name} (${flavor.season})`;
                    flavorList.appendChild(li);
                });
            });
    }

    
    function loadIngredients() {
        fetch('/ingredients')
            .then(response => response.json())
            .then(data => {
                const ingredientList = document.getElementById('ingredient-list');
                ingredientList.innerHTML = '';
                data.forEach(ingredient => {
                    const li = document.createElement('li');
                    li.textContent = `${ingredient.name}: ${ingredient.quantity}`;
                    ingredientList.appendChild(li);
                });
            });
    }


    function createFlavorCards() {
        const flavors = ['Vanilla', 'Chocolate', 'Strawberry', 'Pista', 'Mango'];
        const flavorContainer = document.createElement('div');
        flavorContainer.className = 'flavor-container';
        
        flavors.forEach(flavor => {
            const card = document.createElement('div');
            card.className = 'card';
            card.textContent = flavor;
            card.addEventListener('click', function () {
                addFlavor(flavor);
            });
            flavorContainer.appendChild(card);
        });

        document.body.insertBefore(flavorContainer, document.querySelector('main'));  }

    
    function addFlavor(flavor) {
        fetch('/flavors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: flavor, season: 'Seasonal' }) 
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadFlavors(); 
        });
    }

    
    document.getElementById('flavor-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('flavor-name').value;
        const season = document.getElementById('flavor-season').value;

        fetch('/flavors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, season })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadFlavors(); 
        });
    });

    document.getElementById('view-flavors').addEventListener('click', function () {
        fetch('/flavors')
            .then(response => response.json())
            .then(data => {
                const flavorOutput = document.getElementById('flavor-output');
                flavorOutput.innerHTML = '';
                data.forEach(flavor => {
                    const flavorItem = document.createElement('li');
                    flavorItem.textContent = `${flavor.name} - ${flavor.season}`;
                    flavorOutput.appendChild(flavorItem);
                });
            });
    });
    
    document.getElementById('view-ingredients').addEventListener('click', function () {
        fetch('/ingredients')
            .then(response => response.json())
            .then(data => {
                const ingredientOutput = document.getElementById('ingredient-output');
                ingredientOutput.innerHTML = '';
                data.forEach(ingredient => {
                    const ingredientItem = document.createElement('li');
                    ingredientItem.textContent = `${ingredient.name} - Quantity: ${ingredient.quantity}`;
                    ingredientOutput.appendChild(ingredientItem);
                });
            });
    });
    
    document.getElementById('view-suggestions').addEventListener('click', function () {
        fetch('/suggestions')
            .then(response => response.json())
            .then(data => {
                const suggestionOutput = document.getElementById('suggestion-output');
                suggestionOutput.innerHTML = '';
                data.forEach(suggestion => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.textContent = `Flavor: ${suggestion.flavor_name}, Allergies: ${suggestion.allergy_concerns}`;
                    suggestionOutput.appendChild(suggestionItem);
                });
            });
    });
    
    document.getElementById('ingredient-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('ingredient-name').value;
        const quantity = document.getElementById('ingredient-quantity').value;

        fetch('/ingredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, quantity })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadIngredients(); 
        });
    });

    
    document.getElementById('suggestion-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const flavor_name = document.getElementById('suggestion-flavor').value;
        const allergy_concerns = document.getElementById('suggestion-allergy').value;

        fetch('/suggestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ flavor_name, allergy_concerns })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            
            document.getElementById('suggestion-form').reset();
        });
    });
});
