// Define the cart variable globally
let cart = [];

// Define the addToCart function
function addToCart(target,price,option) {
    // Find the parent meal div
    let mealDiv = $(target).closest('.meal');
    
    // Extract meal information from data attributes
    let mealName = mealDiv.data('meal-name');
    if(option != undefined && option!=null){
        mealName =option;
    }
    let selectedContents = [];

    let mealContents = mealDiv.find('input[type="checkbox"]:checked');

    mealContents.each(function() {
        // Get the id of the current checkbox
        let contentId = $(this).attr('id'); 

        // Find the label associated with the checkbox using the 'for' attribute
        let contentName = $('label[for="' + contentId + '"]');
        selectedContents.push(contentName.text().trim());

        let contentPrice = parseFloat($(this).attr('data-price'));
        if(!isNaN(contentPrice)){
            price+=contentPrice;
            mealName += " \n(" + contentName.text().trim() + "),";
        }

    });
    let quantity = parseInt(mealDiv.find('.quantity-input').val());
    if (isNaN(quantity) || quantity <= 0) {
        alert('Invalid quantity! Please enter a valid quantity.');
        return;
    }

    // Create an object representing the meal and its contents
    let meal = {
        name: mealName,
        contents: selectedContents,
        quantity: quantity,
        price:price
    };


    // Add the meal object to the cart array
    cart.push(meal);
    showSuccessMessage();
    $('#items-cart-num').text(cart.length);
    // Log the cart for debugging
    console.log('Cart:', cart);
}

// Global function to increase quantity
function increaseQuantity(inputId) {
    let quantityInput = document.getElementById(inputId);
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

// Global function to decrease quantity
function decreaseQuantity(inputId) {
    let quantityInput = document.getElementById(inputId);
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}


function showSuccessMessage() {
    $(".ItemAdded-top").show();
    setTimeout(function(){
      $(".ItemAdded-top").hide("500"); 
    }, 2000);
}

// Function to render cart contents dynamically
// Function to render cart contents dynamically
function renderCart() {
    let cartItems = $('#cartItems');
    cartItems.empty(); // Clear previous contents

    let totalCartPrice = 0; // Variable to store the total price of all items in the cart

    if (cart.length === 0) {
        cartItems.append(`
            <div style="text-align: center;">
                <p style="font-size: 24px;">אופס! העגלה שלך ריקה 😢</p>
                <p style="font-size: 18px;">אבל אל תדאג, בואו נמלא אותה בפריטים טעימים! 🍔🍟🥤</p>
            </div>
        `);
        cartItems.append(`
            <div style="text-align: center;">
                <p style="font-size: 24px;">اوبس ! سلة التسوق الخاصة بك فارغة 😢</p>
                <p style="font-size: 18px;">ولكن لا تقلق، دعونا نملأها بوجباتنا اللذيذة! 🍔🍟🥤</p>
            </div>
        `);
    } else {
        cart.forEach(function(item, index) {
            // Render each item in the cart
            let totalPrice = item.price * item.quantity;
            totalCartPrice += totalPrice; // Add the current item's total price to the totalCartPrice
            
            // Render meal item with improved styling
            cartItems.append(`
                <div class="cart-item" style="border-bottom: 1px solid #eee; padding: 15px; position: relative;">
                    <button class="btn btn-danger delete-item" data-index="${index}" style="position: absolute; top: 5px; left: 5px;"><i class="fas fa-trash-alt"></i></button>
                    <p><strong style="color: #333; font-size: 18px;">${item.name}</strong></p>
                    <div >
                        כמות (الكمية):
                        <button class="change-quantity" data-index="${index}" data-change="decrease"><i class="fas fa-minus"></i></button>
                        <span style="font-size: 16px;border:1px solid;border-radius: 2px;padding: 5px;">${item.quantity}</span>
                        <button class="change-quantity" data-index="${index}" data-change="increase"><i class="fas fa-plus"></i></button>
                    </div>
                    <p style="margin-bottom: 5px; color: #666;">מחיר (سعر): <span class="item-price" style="color: #888;">${item.price} ₪</span></p>
                    <p style="margin-bottom: 5px; color: #666;">סה''כ (المجموع): <span class="total-price" style="color: #888;">${totalPrice} ₪</span></p>
                </div>
            `);
        });

        // Render total price and checkout button with input fields for name and phone number
        cartItems.append(`
            <div class="total-section text-center" style="margin-top: 20px;background-color: #f1f1f1;">
            <p style="font-size: 20px;"><strong>סה''כ (المجموع الكلي):</strong> <span id="totalCartPrice" style="color: #333;">${totalCartPrice} ₪</span></p>
                <div style="margin-bottom: 5px;">
                    <input type="text" class="form-control" id="name" placeholder="הזן את שמך (ادخل اسمك الكامل)" required>
                </div>
                <div style="margin-bottom: 5px;">
                    <input type="tel" class="form-control" id="phone" placeholder="הזן את מספר הטלפון שלך (ادخل رقم الهاتف)" required>
                </div>
                <button onclick="checkoutOrder()" class="btn btn-success" style="font-size: 18px;margin-bottom: 20px;">תזמין (اطلب الان)</button>
                
            </div>
        `);

        // Add event listeners for quantity change buttons
        $('.change-quantity').click(function() {
            let index = $(this).data('index');
            let change = $(this).data('change');
            let item = cart[index];

            if (change === 'increase') {
                item.quantity++;
            } else if (change === 'decrease') {
                if (item.quantity > 1) {
                    item.quantity--;
                }
            }

            // Update quantity and total price display
            $(this).siblings('span').text(item.quantity);
            let totalPrice = item.price * item.quantity;
            $(this).closest('.cart-item').find('.total-price').text(`${totalPrice} ₪`);

            // Update total cart price
            updateTotalCartPrice();
        });
    }
}


// Function to update total cart price
function updateTotalCartPrice() {
    let totalCartPrice = 0;
    cart.forEach(function(item) {
        totalCartPrice += item.price * item.quantity;
    });
    $('#totalCartPrice').text(`${totalCartPrice} ₪`);
}




// Bind click event to cart icon
$('#cartIcon').click(function() {
    renderCart(); // Render cart contents when clicked
    $('#cartModal').modal('show'); // Show the modal
});

// Function to handle deleting items from the cart
$(document).on('click', '.delete-item', function() {
    let index = $(this).data('index');
    cart.splice(index, 1); // Remove item from cart array
    renderCart(); // Render updated cart contents
    $('#items-cart-num').text(cart.length); // Update cart icon with new count
});

// Function to send the order via WhatsApp
// Function to send the order via WhatsApp
function sendOrderViaWhatsApp(name, phone, cart) {
    // Construct the message body
    let messageBody = `*وصلتك طلبية جديدة - הזמנה חדשה!*\n\n`;
    messageBody += `الاسم:  ${name}\n`;
    messageBody += `الهاتف:  ${phone}\n\n`;
    messageBody += `--------------\n`;
    messageBody += `تفاصيل الطلبية:\n\n`;
    // Iterate over each item in the cart
    cart.forEach(function(item, index) {
        
        let itemTotalPrice = item.price * item.quantity;
        // Add meal name, contents, quantity, and total price to the message
        messageBody += `*${index+1}.${item.name}*\n`;
        messageBody += `الاضافات: ${item.contents.join(', ')}\n`;
        messageBody += `سعر الوجبة: ${item.price} ₪\n`;
        messageBody += `الكمية: ${item.quantity}\n`;
        messageBody += `السعر الكلي: ${itemTotalPrice} ₪\n\n`;
        messageBody += `--------------\n\n`;
    });

    // Get the total cart price
    let totalCartPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Add the total cart price to the message body
    messageBody += `*السعر الإجمالي للطلبية:* ${totalCartPrice} ₪\n`;

    // Encode the message body
    let encodedMessage = encodeURIComponent(messageBody);

    // Construct the WhatsApp message URL
    let whatsappURL = `https://api.whatsapp.com/send?phone=+972527539647&text=${encodedMessage}`;

    // Open WhatsApp in a new tab with the pre-filled message
    window.open(whatsappURL, '_blank');
}


function checkoutOrder() {
    // Get the input values
    var name = $('#name').val().trim();
    var phone = $('#phone').val().trim();

    // Check if name and phone are not empty
    if (name === '' || phone === '') {
        alert('אנא מלא את כל השדות.'); // Please fill in all fields.
    } else {
        // Check if the phone number is valid (optional)
        var phoneRegex = /^\d{10}$/; // Change the regex according to your phone number format
        if (!phoneRegex.test(phone)) {
            alert('אנא הזן מספר טלפון חוקי.'); // Please enter a valid phone number.
        } else {
            // Display confirmation dialog
            var confirmMessage = 'האם אתה בטוח שברצונך להמשיך להזמין ב-WhatsApp?';
            if (confirm(confirmMessage)) {
                // Proceed to the WhatsApp order page
                // Send the order via WhatsApp
                sendOrderViaWhatsApp(name, phone, cart);
            }
        }
    }
}
