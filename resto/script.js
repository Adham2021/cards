$(document).ready(function() {
    var cartItems = 0;
    var totalPrice = 0;

    $(".add-button").click(function() {
        cartItems++;
        var price = parseFloat($(this).closest(".menu-item").find(".price").text());
        totalPrice += price;
        $(".cart-items").text(cartItems);
        $(".total").text("Total: $" + totalPrice.toFixed(2));
    });

    $(".view-cart").click(function() {
        // Implement code to show the cart details or navigate to the cart page.
    });
});

$(document).ready(function() {
    // Sample data for menu items
    const menuItems = [
        { category: 'chicken', name: 'Chicken Dish 1', description: 'Description of the first chicken dish.', price: 10.99 },
        { category: 'chicken', name: 'Chicken Dish 2', description: 'Description of the second chicken dish.', price: 12.99 },
        // Add more menu items for other categories
    ];

    // Function to display menu items based on the selected category
    function displayMenu(category) {
        const menuContainer = $("#menu-container");
        menuContainer.empty();
        
        menuItems.forEach(item => {
            if (item.category === category) {
                const menuItem = `
                    <div class="menu-item col-sm-3">
                        <img src="https://i.pinimg.com/564x/bd/39/66/bd39667370d5fe30a1dc50d4e3e269b1.jpg" alt="Default Meal Image">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                        <div class="add-to-cart">
                            <button class="btn btn-success add-button" data-price="${item.price}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                            <span class="price">$${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                `;
                menuContainer.append(menuItem);
            }
        });
    }

    // Event listener for category buttons
    $(".category-button").click(function() {
        const category = $(this).data("category");
        displayMenu(category);
    });

    // Rest of your existing JavaScript for cart functionality remains the same
});
