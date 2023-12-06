window.onload = function() {
    // Get the movie_id from the URL parameter
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('movie_id');

    // Check if movie_id is present
    if (!movieId) {
        console.error('Movie ID is missing in the URL');
        return;
    }

    // Now you can use the movieId variable to fetch additional details or perform other actions
    console.log('Movie ID:', movieId);

    // The rest of your code to fetch and display movie details...
};