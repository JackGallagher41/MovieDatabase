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
            // rest of your code for displaying reviews

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
                        content.textContent = `Review: ${review.review_text}`;

                        reviewItem.appendChild(ratingStars);
                        reviewItem.appendChild(title);
                        reviewItem.appendChild(additionalInfo);
                        reviewItem.appendChild(content);

                        reviewsSection.appendChild(reviewItem);
                    })
                    .catch(error => console.error('Error fetching user:', error));
            });
        })
        .catch(error => console.error('Error:', error));


    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    // Assign createReview to the window object
    window.createReview = function() {
        const userId = document.getElementById('userId').value;
        const movieId = urlParams.get('movie_id'); // Get movie ID from URL parameter
        const rating = document.getElementById('rating').value;
        const reviewText = document.getElementById('reviewText').value;
        const reviewDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format date as YYYY-MM-DD HH:MM:SS

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
                user_id: userId,
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
                // Redirect back to the reviews page with the movie ID in the URL
                window.location.href = `reviews.html?movie_id=${movieId}`;
            })
            .catch(error => console.error('Error creating review:', error));
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