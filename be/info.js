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
                // Implement your add to cart logic here
                console.log(`Added ${movie.title} to the cart!`);
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