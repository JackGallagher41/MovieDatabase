//*** Ryan Hassell & Jack Gallagher
//*** Database Management Systems
//*** 12/11/2023
//*** Final Project
//*** This project is a movie store. This store is complete with a functioning cart, user system, login and registration, client-side error checking, reviews, and search function.

const userId = getUserIdFromURL();
window.onload = function() {
    // Fetch cart items based on user_id
    // Implement this function to get user_id from the URL
    if (!userId) {
        console.error('User ID is missing in the URL');
        return;
    }

    fetch(`http://localhost:3000/carts/${userId}`)
        .then(response => response.json())
        .then(cartItems => {
            const cartItemsContainer = document.getElementById('cartItemsContainer');

            // Display each cart item
            cartItems.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');

                const title = document.createElement('h3');
                title.textContent = item.title;

                const quantity = document.createElement('p');
                quantity.textContent = `Quantity: ${item.quantity}`;
                console.log(item.quantity);

                const price = document.createElement('p');
                price.textContent = `Price: $${item.quantity*item.price}`;
                console.log(item.price);


                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function() {
                    // Implement your delete logic here
                    console.log(`Deleted ${item.title} from the cart!`);
                    // Call a function to delete the item from the cart on the server
                    deleteCartItem(item.cart_id);
                });

                cartItemDiv.appendChild(title);
                cartItemDiv.appendChild(quantity);
                cartItemDiv.appendChild(price);
                cartItemDiv.appendChild(deleteButton);

                cartItemsContainer.appendChild(cartItemDiv);
            });
        })
        .catch(error => console.error('Error:', error));
};

function getUserIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('user_id');
}
purchaseButton.addEventListener('click', function() {
    const userId = getUserIdFromURL()
    // Implement your logic to delete all items for the user
    fetch(`http://localhost:3000/carts/purchase/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {

                console.log('All items purchased successfully');
                // Redirect to the home page after purchase

                window.location.href = `main.html?user_id=${userId}`;
            } else {
                console.error('Error purchasing items:', response.status);
            }
        })
        .catch(error => console.error('Error:', error));
});
function deleteCartItem(cartId) {
    // Implement the logic to delete the cart item with the specified cartId
    // You can make a DELETE request to your server endpoint
    fetch(`http://localhost:3000/carts/${cartId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                console.log('Item deleted successfully');
                // Refresh the page or update the UI as needed
                location.reload(); // Refresh the page to reflect changes
            } else {
                console.error('Error deleting item:', response.status);
            }
        })
        .catch(error => console.error('Error:', error));
}

function goToMain() {
    if (userId) {
        const mainLink = `main.html?user_id=${userId}`
        location.href=mainLink;
    }
}
function logout() {
    // Redirect the user to login.html
    window.location.href = 'login.html';
}