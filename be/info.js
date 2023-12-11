function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('user_id');
}
window.onload = function() {
    // Get the movie_id from the URL parameter
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('movie_id');

    // Check if movie_id is present
    if (!movieId) {
        console.error('Movie ID is missing in the URL');
        return;
    }

    // Fetch movie details based on movie_id
    fetch(`http://localhost:3000/movies_with_id/${movieId}`)
        .then(response => response.json())
        .then(movie => {
            // Display movie details on the page
            const movieDetailsContainer = document.getElementById('movieDetailsContainer');

            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-details');

            const movieImage = document.createElement('img');
            movieImage.src = `/assets/images/movies/${movie.image}`;
            movieImage.alt = movie.title;
            movieImage.classList.add('movie-image');

            const title = document.createElement('h2');
            title.textContent = movie.title;

            const genre = document.createElement('p');
            genre.textContent = `Genre: ${movie.genre}`;

            const releaseDate = document.createElement('p');
            releaseDate.textContent = `Release Date: ${movie.release_date}`;

            const director = document.createElement('p');
            director.textContent = `Director: ${movie.director}`;

            const price = document.createElement('p');
            price.textContent = `Price: $${movie.price}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.classList.add('add-to-cart-button');

            addToCartButton.addEventListener('click', function() {
                const urlParams = new URLSearchParams(window.location.search);
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        movie_id: urlParams.get('movie_id'),
                        user_id: urlParams.get('user_id'),
                    }),
                };

                fetch('http://localhost:3000/add-to-cart', requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(data => {
                        console.log(data);
                        // Handle the response from the server as needed
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // Handle errors here
                    });
            });

            movieDiv.appendChild(movieImage);
            movieDiv.appendChild(title);
            movieDiv.appendChild(genre);
            movieDiv.appendChild(releaseDate);
            movieDiv.appendChild(director);
            movieDiv.appendChild(price);
            movieDiv.appendChild(addToCartButton);

            movieDetailsContainer.appendChild(movieDiv);
        })
        .catch(error => console.error('Error:', error));
};
function goToCart() {
    const userid = getUserIdFromUrl();

    if (userid) {
        const cartLink = `cart.html?user_id=${userid}`;
        location.href = cartLink;
    } else {
        console.error('User_id not found in the URL');
    }
}

function goToMain() {
    const userid = getUserIdFromUrl();
    if (userid) {
        const mainLink = `main.html?user_id=${userid}`
        location.href=mainLink;
    }
}
function logout() {
    // Redirect the user to login.html
    window.location.href = 'login.html';
}