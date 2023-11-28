window.onload = function() {
    fetch('http://localhost:3000/movies')

        .then(response => response.json())
        .then(data => {
            const movieContainer = document.getElementById('movieList');
            data.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');
                movieDiv.innerHTML = `<h3>${movie.title}</h3><p>Director: ${movie.director}</p>`;
                movieContainer.appendChild(movieDiv);
            });
        })
        .catch(error => console.error('Error:', error));
};
