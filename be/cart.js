const userId = getUserIdFromURL();

//creates the display for the cart page
window.onload = function() {
    // Fetch cart items based on user_id
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

//retrieves the ID from the url for user tracking
function getUserIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('user_id');
}

//a button implemented to purchase all in cart
//deletes cart items and redirects user to home page
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

//function for deleting a item in your cart
function deleteCartItem(cartId) {
    // Implement the logic to delete the cart item with the specified cartId
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

//function for directing to home page
function goToMain() {
    if (userId) {
        const mainLink = `main.html?user_id=${userId}`
        location.href=mainLink;
    }
}

//logout button function
function logout() {
    // Redirect the user to login.html
    window.location.href = 'login.html';
}