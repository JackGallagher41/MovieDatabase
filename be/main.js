function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('user_id');
}
//code surrounding the display of main.html
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('user_id'); // Extract the user ID from the URL parameter
    // Check if user_id is present
    if (!userId) {
        console.error('User ID is missing in the URL');
        return;
    }

    // Get all the links in the document
    const allLinks = document.querySelectorAll('a');

    // Loop through each link and append the user ID to its href attribute
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('?')) {
            link.setAttribute('href', `${href}&user_id=${userId}`);
        } else {
            link.setAttribute('href', `${href}?user_id=${userId}`);
        }
    });
    fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(data => {
            const movieContainer = document.getElementById('movieList');
            data.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                // Include the movie ID as a data attribute
                movieDiv.setAttribute('data-movie-id', movie.movie_id);
                // Create an anchor tag for the entire movie object
                const userid = getUserIdFromUrl();


                const movieAnchor = document.createElement('a');

                if (userid) {
                    movieAnchor.href = `info.html?user_id=${userid}&movie_id=${movie.movie_id}`;
                } else {
                    console.error('Userid not found in the URL');
                }
                //movieAnchor.href = `info.html?movie_id=${movie.movie_id}`; // Include the movie_id as a parameter

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

                // Reviews button as a div styled like a button
                const reviewsButton = document.createElement('div');
                reviewsButton.classList.add('reviews-button');
                reviewsButton.textContent = 'Reviews';

                // Get the movie ID from the data attribute
                const movieId = movieDiv.getAttribute('data-movie-id');

                // Add click event to the reviews button
                reviewsButton.addEventListener('click', function (event) {
                    event.stopPropagation(); // Prevent event bubbling to parent elements
                    event.preventDefault(); // Prevent the default action (redirecting)
                    const userid = getUserIdFromUrl();

                    if (userid) {
                        console.log("id found");
                    }
                        else {
                        console.error('User_id not found in the URL');
                    }
                    window.location.href = `reviews.html?movie_id=${movieId}&user_id=${userid}`; // Redirect to reviews page with movie ID
                });

                // Append reviews button to movie details
                movieDetails.appendChild(title);
                movieDetails.appendChild(director);
                movieDetails.appendChild(price); // Append price to movie details
                movieDetails.appendChild(reviewsButton); // Append reviews button to movie details

                movieAnchor.appendChild(movieImage);
                movieAnchor.appendChild(movieDetails);

                movieDiv.appendChild(movieAnchor);
                movieContainer.appendChild(movieDiv);

                // Add click event to the entire movie object
                movieDiv.addEventListener('click', function() {
                    // Redirect to the movie info page when clicking on the movie object
                    window.location.href = movieAnchor.href;
                });
            });
        })
        .catch(error => console.error('Error:', error));
};

//functionality for reviews
function displayReview(reviewsSection, review, user) {
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');

    // Display stars based on the rating
    const ratingStars = document.createElement('div');
    ratingStars.classList.add('rating-stars');
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.textContent = i <= review.rating ? '★' : '☆'; // Filled or empty star
        ratingStars.appendChild(star);
    }

    const title = document.createElement('h2');
    title.textContent = `Review ID: ${review.review_id}`;

    // Display username and format the date
    const additionalInfo = document.createElement('p');
    additionalInfo.innerHTML = `Submitted by: ${user.username}, Date: ${formatDate(review.review_date)}`;

    const content = document.createElement('p');
    content.textContent = `Review: ${review.review_text}`;

    reviewItem.appendChild(ratingStars);
    reviewItem.appendChild(title);
    reviewItem.appendChild(additionalInfo);
    reviewItem.appendChild(content);

    reviewsSection.appendChild(reviewItem);
}

// Function to format the date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

//filters the movie using the filter bar
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

// function used for the cart button
function goToCart() {
    const userid = getUserIdFromUrl();

    if (userid) {
        const cartLink = `cart.html?user_id=${userid}`;
        location.href = cartLink;
    } else {
        console.error('User_id not found in the URL');
    }
}

//function used for the logout button
function logout() {
    // Redirect the user to login.html
    window.location.href = 'login.html';
}
