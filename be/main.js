window.onload = function() {
    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(data => {
            const movieContainer = document.getElementById('movieList');
            data.forEach(movie => {
                // Create an anchor tag for the entire movie object
                const movieDiv = document.createElement('a');
                movieDiv.href = `info.html?movie_id=${movie.movie_id}`; // Include the movie_id as a parameter
                movieDiv.classList.add('movie');

                // Create an image element
                const movieImage = document.createElement('img');
                movieImage.src = `/assets/images/movies/${movie.image}`;
                movieImage.style.width = '100%';
                movieImage.style.height = 'auto';

                // Create a div for movie details
                const movieDetails = document.createElement('div');
                movieDetails.classList.add('movie-details');

                // Add movie title
                const title = document.createElement('h3');
                title.textContent = movie.title;

                // Add director
                const director = document.createElement('p');
                director.textContent = `Director: ${movie.director}`;

                const price = document.createElement('p');
                price.classList.add('price'); // Adding a class for styling
                price.textContent = `Price: $${movie.price}`;

                movieDetails.appendChild(title);
                movieDetails.appendChild(director);
                movieDetails.appendChild(price); // Append price to movie details

                movieDiv.appendChild(movieImage);
                movieDiv.appendChild(movieDetails);

                movieContainer.appendChild(movieDiv);
            });
        })
        .catch(error => console.error('Error:', error));
};

function filterMovies() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const movies = document.getElementsByClassName('movie');

    Array.from(movies).forEach(movie => {
        const title = movie.getElementsByTagName('h3')[0];
        const txtValue = title.textContent || title.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            movie.style.display = '';
        } else {
            movie.style.display = 'none';
        }
    });
}
