//*** Ryan Hassell & Jack Gallagher
//*** Database Management Systems
//*** 12/11/2023
//*** Final Project
//*** This project is a movie store. This store is complete with a functioning cart, user system, login and registration, client-side error checking, reviews, and search function.

function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('user_id');
}
window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get('movie_id');
    const userId = urlParams.get('user_id');

    if (!movieId) {
        console.error('Movie ID not found in URL');
        return;
    }

    fetch(`http://localhost:3000/reviews?movie_id=${movieId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(reviews => {
            // Appending user_id to links
            const allLinks = document.querySelectorAll('a');
            allLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.includes('?')) {
                    link.setAttribute('href', `${href}&user_id=${userId}`);
                } else {
                    link.setAttribute('href', `${href}?user_id=${userId}`);
                }
            });
        })
        .catch(error => console.error('Error:', error));

    fetch(`http://localhost:3000/reviews?movie_id=${movieId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(reviews => {
            const reviewsSection = document.getElementById('reviewsSection');

            reviews.forEach(review => {
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

                fetch(`http://localhost:3000/users?user_id=${review.user_id}`)
                    .then(response => response.json())
                    .then(user => {
                        // Display username instead of ID and format the date
                        const additionalInfo = document.createElement('p');
                        additionalInfo.innerHTML = `Submitted by: ${user[0].username}, Date: ${formatDate(review.review_date)}`;

                        const content = document.createElement('p');
                        content.textContent = `${review.review_text}`;

                        reviewItem.appendChild(ratingStars);
                        reviewItem.appendChild(title);
                        reviewItem.appendChild(additionalInfo);
                        reviewItem.appendChild(content);

                        reviewsSection.appendChild(reviewItem);
                    })
                    .catch(error => console.error('Error fetching user:', error));
                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-button');
                deleteButton.textContent = 'Delete Review';
                deleteButton.onclick = function() {
                    deleteReview(review.review_id, reviewItem);
                };

                // Append delete button to review item
                reviewItem.appendChild(deleteButton);

                // Append review item to reviews section
                reviewsSection.appendChild(reviewItem);
            });
        })
        .catch(error => console.error('Error:', error));


    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    window.createReview = function() {
        // Get user ID from URL parameter using getUserIdFromUrl function
        const userId = getUserIdFromUrl();

        const movieId = urlParams.get('movie_id');
        const rating = document.getElementById('rating').value;
        const reviewText = document.getElementById('reviewText').value;
        const reviewDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Ensure all required fields are present
        if (!userId || !movieId || !rating || !reviewText) {
            console.error('Missing required fields for creating review');
            return;
        }

        // Send the review data to the backend
        fetch(`http://localhost:3000/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId, // Use the retrieved user ID
                movie_id: movieId,
                rating: rating,
                review_text: reviewText,
                review_date: reviewDate
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Review created:', data);
                window.location.href = `reviews.html?movie_id=${movieId}&user_id=${userId}`; // Redirect with both IDs
            })
            .catch(error => console.error('Error creating review:', error));
    };
    window.deleteReview = function(reviewId, reviewItem) {
        const userId = getUserIdFromUrl(); // Get user ID from URL parameter

        if (!userId) {
            console.error('User ID not found in URL');
            return;
        }

        fetch(`http://localhost:3000/reviews/${reviewId}?user_id=${userId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                // Remove the review item if the deletion is successful
                reviewsSection.removeChild(reviewItem);
            })
            .catch(error => console.error('Error deleting review:', error));
    };
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
function logout() {
    // Redirect the user to login.html
    window.location.href = 'login.html';
}