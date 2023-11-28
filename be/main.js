window.onload = function() {
    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(data => {
            const movieContainer = document.getElementById('movieList');
            data.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');
                movieDiv.innerHTML = `<h3>${movie.title}</h3><p>Director: ${movie.director}</p>`;

                // Create an image element
                const movieImage = document.createElement('img');
                movieImage.src = `/assets/images/movies/${movie.image}`; // Adjust the URL structure
                movieImage.style.width = '200px'; // Set width here
                movieImage.style.height = 'auto'; // Maintain aspect ratio

                movieDiv.appendChild(movieImage);
                movieContainer.appendChild(movieDiv);
            });
        })
        .catch(error => console.error('Error:', error));
};
