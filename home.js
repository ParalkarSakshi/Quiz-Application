// addEventListener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to relevant DOM elements
    const enterBtn = document.getElementById('enter');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const homePage = document.getElementById('home');
    const categoryPage = document.getElementById('category');

    enterBtn.addEventListener('click', () => {
        // Get the value entered in the name input field
        const userName = document.getElementById('name').value;
        if (userName) {
            // If a name is entered, store it in local storage
            localStorage.setItem('userName', userName);
            homePage.classList.remove('active');
            homePage.classList.add('inactive');
            categoryPage.classList.add('active');
            categoryPage.classList.remove('inactive');
        } else {
            // Alert the user to enter their name if the field is empty
            alert("Please enter your name.");
        }
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the category associated with the clicked button
            const currentCategory = button.dataset.category;
            // Store the current category in local storage
            localStorage.setItem('currentCategory', currentCategory);
            // Redirect to the quiz page
            window.location.href = 'quiz.html';
        });
    });
});
