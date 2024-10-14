// Define the cart variable globally
let cart = [];

// Define the addToCart function
function addToCart(target,price) {
    ;
    cartShake();
    // Find the parent meal div
    let TargetMealId= $(target).attr("id");
    let mealDiv = $(target).closest('.meal');

    // Extract meal information from data attributes
    let mealName = mealDiv.data('meal-name');

    let selectedContents = [];

    let mealContents = mealDiv.find('input[type="checkbox"]:not([name^="sauceMeal_"])');
    let CheckedMealContents = mealDiv.find('input[type="checkbox"]:checked:not([name^="sauceMeal_"])');

    let AllContentsChecked= false;
    let IsContentsNeeded=true;
    let WithoutContentsMessage= "";

    if(CheckedMealContents.length == mealContents.length){
        AllContentsChecked=true;
    }
    if(CheckedMealContents.length==0){
        IsContentsNeeded=false;
        WithoutContentsMessage ="/بدون اي اضافات/";
    }


    if (IsContentsNeeded) {
        CheckedMealContents.each(function () {
            // Get the id of the current checkbox
            let contentId = $(this).attr('id');
            let contentName = ""
            if ($(this).attr('data-price')) {
                // Get the value of data-price attribute
                price += parseFloat($(this).attr('data-price'));
            }
            // Find the label associated with the checkbox using the 'for' attribute
            var fristTime = true;
            if (contentId.indexOf('burger') !== -1) {
                if (fristTime) {
                    fristTime = false;
                    contentName = `اضافات برجر كنتاكي : `
                    selectedContents.push(contentName);
                }
               
            }
            else {
                if (contentId.indexOf('kfc') !== -1) {
                contentName = `اضافات تورتيا كنتاكي : `
                selectedContents.push(contentName);
                }
            }
            contentName = $('label[for="' + contentId + '"]');
            selectedContents.push(contentName.text().trim());
        });
    }


let mealId = mealDiv.find('.quantity-input').attr('id');
    let quantity = parseInt(mealDiv.find('.quantity-input').val());
    if (isNaN(quantity) || quantity <= 0) {
        alert('Invalid quantity! Please enter a valid quantity.');
        return;
    }

    // Create an object representing the meal and its contents
    let meal = {
        mealId:mealId,
        name: mealName,
        contents: selectedContents,
        quantity: quantity,
        price:price,
        IsContentsNeeded:IsContentsNeeded,
        WithoutContentsMessage:WithoutContentsMessage
    };


    // Add the meal object to the cart array
    cart.push(meal);
    showSuccessMessage();
    $('#items-cart-num').text(cart.length);
    // Log the cart for debugging
    console.log('Cart:', cart);
}

function cartShake(){
    var cart = document.getElementById('cart');
    setTimeout(function() {
        cart.classList.add('shake');
        setTimeout(function() {
            cart.classList.remove('shake');
        }, 500);
    }, 0);
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
    $(".alert-success").show();
    setTimeout(function(){
      $(".alert-success").hide("500"); 
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
                <p style="font-size: 24px;">اوبس ! سلة التسوق الخاصة بك فارغة 😢</p>
                <p style="font-size: 18px;">ولكن لا تقلق، دعونا نملأها بوجباتنا اللذيذة! 🍔🍟🥤</p>
            </div>
        `);
    } else {
        cart.forEach(function(item, index) {
            // Render each item in the cart
            let totalPrice = item.price * item.quantity;
            totalCartPrice += totalPrice; // Add the current item's total price to the totalCartPrice
            let contents = item.contents.map(content => `+ ${content}`).join('\n');
            console.log(contents)
            // Render meal item with improved styling
            cartItems.append(`
                <div class="cart-item" style="border-bottom: 1px solid #eee; padding: 15px; position: relative;">
                    <button class="btn btn-danger delete-item" data-index="${index}" style="position: absolute; top: 5px; left: 5px;"><i class="fas fa-trash-alt"></i></button>
                    <p style="margin-bottom: 0;"><strong style="color: #333; font-size: 18px;">${item.name}</strong></p>
                    <p style="color: gray; font-size: 13px;">${contents}</p>
                    <div>
                        الكمية:
                        <button class="change-quantity" data-index="${index}" data-change="decrease"><i style="color:black;" class="fas fa-minus"></i></button>
                        <span style="font-size: 16px;border:1px solid;border-radius: 2px;padding: 5px;">${item.quantity}</span>
                        <button class="change-quantity" data-index="${index}" data-change="increase"><i style="color:black;" class="fas fa-plus"></i></button>
                    </div>
                    <p style="margin-bottom: 5px; color: #666;"> سعر: <span class="item-price" style="color: #888;">${item.price} ₪</span></p>
                    <p style="margin-bottom: 5px; color: #666;"> المجموع: <span class="total-price" style="color: #888;">${totalPrice} ₪</span></p>
                </div>
            `);
        });

        // Render total price and checkout button with input fields for name and phone number
// Append the HTML content
cartItems.append(`
    <div class="total-section text-center" style="margin-top: 20px;background-color: #f1f1f1;">
        <ul class="nav nav-tabs" style="justify-content: center;display: flex;
        flex-wrap: nowrap;">
            <li class="nav-item">
                <a class="nav-link active" id="pickup-tab"  onclick="pickup_Clicked()">احضر الطلبية بشكل شخصي</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="delivery-tab" onclick="delivery_Clicked()">احضر الطلبية مع مرسل</a>
            </li>
        </ul>
        <p style="font-size: 20px;"><strong>المجموع الكلي:</strong> <span id="totalCartPrice" style="color: #333;">${totalCartPrice} ₪</span></p>
        
           
                <div style="margin-bottom: 5px;">
                    <input type="text" class="form-control" id="name" placeholder="ادخل اسمك الكامل" required>
                </div>
                <div style="margin-bottom: 5px;">
                    <input type="tel" class="form-control" id="phone" placeholder="ادخل رقم الهاتف" required>
                </div>
                <div style="margin-bottom: 5px;display:none" id="addressDiv"">
                <input type="text" class="form-control" id="address" placeholder="ادخل عنوانك الكامل">
            
        
           
        </div>
        <button onclick="checkoutOrder()" class="btn btn-success" style="font-size: 18px;margin-bottom: 20px;">اطلب الان</button>
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

function pickup_Clicked(){
    $("#addressDiv").hide(500);
    $("#address").removeAttr("required");
    $("#pickup-tab").addClass("active")
    $("#delivery-tab").removeClass("active")
}

function delivery_Clicked(){
    $("#addressDiv").show(500);
    $("#address").attr("required", "required");
    $("#pickup-tab").removeClass("active")
    $("#delivery-tab").addClass("active")
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
$('#cart').click(function() {
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
function sendOrderViaWhatsApp(name, phone,address, cart) {
    // Construct the message body
    let messageBody = `*وصلتك طلبية جديدة - הזמנה חדשה!*\n\n`;
    messageBody += `الاسم:  ${name}\n`;
    messageBody += `الهاتف:  ${phone}\n`;
    messageBody += `العنوان:  ${address}\n\n`;
    messageBody += `--------------\n`;
    messageBody += `تفاصيل الطلبية:\n\n`;
    // Iterate over each item in the cart
    cart.forEach(function(item, index) {
        
        let itemTotalPrice = item.price * item.quantity;
        // Add meal name, contents, quantity, and total price to the message
        messageBody += `*${index+1}.${item.name}* X${item.quantity}\n`;
        messageBody += 'الاضافات:\n';
        if(item.IsContentsNeeded || item.contents.length>0){            
            messageBody += item.contents.map(content => `+ ${content}`).join('\n');
        }
        else { 
            messageBody += `${item.WithoutContentsMessage}\n`;
        }
        messageBody += `\nسعر الوحدة: ${item.price} ₪\n`;
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
    let whatsappURL = `https://api.whatsapp.com/send?phone=+972527050545&text=${encodedMessage}`;

    // Open WhatsApp in a new tab with the pre-filled message
    window.open(whatsappURL, '_blank');
    sendEmail(messageBody)
}


function checkoutOrder() {
    // Get the input values
    var name = $('#name').val().trim();
    var phone = $('#phone').val().trim();
    var address = $('#address').val().trim();



    // Check if name and phone are not empty
    if (name === '' || phone === '') {
        Swal.fire({
            icon: 'error',
            title: 'يرجى ملء جميع الحقول.',
            text: '',
            confirmButtonText: 'حسناً'
          });
          
    } else {

        ;
        if ($('#address').prop('required') && address === '') {           
            Swal.fire({
                icon: 'error',
                title: 'يرجى ادخال العنوان الكامل للتوصيل.',
                text: '',
                confirmButtonText: 'حسناً'
              });
              return
        } 
        // Check if the phone number is valid (optional)
        var phoneRegex = /^\d{10}$/; // Change the regex according to your phone number format
        if (!phoneRegex.test(phone)) {
            Swal.fire({
                icon: 'error',
                title: 'يرجى إدخال رقم هاتف صحيح.',
                text: '',
                confirmButtonText: 'حسناً'
              });
              
        } else {
            // Display confirmation dialog
            var confirmMessage = 'هل أنت متأكد أنك ترغب في المتابعة بطلب عبر WhatsApp ؟';
            Swal.fire({
              title: 'الطلب عبر WhatsApp؟',
              text: confirmMessage,
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'نعم، متابعة',
              cancelButtonText: 'إلغاء'
            }).then((result) => {
              if (result.isConfirmed) {
                sendOrderViaWhatsApp(name, phone, address, cart);
              }
            });
            
            
        }
    }
}

$(document).ready(function() {
    // Function to restrict checkboxes to allow only one selection within a group
    function restrictCheckboxes(groupSelector) {
      $(groupSelector).change(function() {
        if ($(this).prop('checked')) {
          $(groupSelector).not(this).prop('checked', false);
        }
      });
    }

    var numberOfMeals=4;
    for(let i=1;i<numberOfMeals;i++){
      var mealSelector = 'input[type="checkbox"][name="sauceMeal_' + i + '"]';
      restrictCheckboxes(mealSelector);
    }
    
  });

  $(document).ready(function() {
    // Function to animate menu items for a specific tab when they come into view
    function animateMenuItemsInView(tab) {
      var menuItems = $('[data-tab="' + tab + '"] .menu-item');
      menuItems.each(function() {
        var itemTop = $(this).offset().top;
        var windowBottom = $(window).scrollTop() + $(window).height();
  
        // If the menu item is within the viewport, animate it
        if (itemTop < windowBottom) {
          $(this).addClass('animate');
        }
      });
    }
  
    // Trigger animation for items in view for the initial tab when the page is loaded
    animateMenuItemsInView('tab-1');
  
    // Trigger animation for items in view for the initial tab when scrolling
    $(window).on('scroll', function() {
      animateMenuItemsInView('tab-1');
    });
  });

  $(document).ready(function() {
    $('.preventUncheck').click(function(event) {
        if (!$(this).is(':checked')) {
            event.preventDefault(); // Prevent default behavior
            $('#customAlert').fadeIn().delay(3000).fadeOut(); // Show custom danger alert and hide it after 3 seconds
            $(this).prop('checked', true); // Keep the checkbox checked
            return false;
        } else if ($(this).is(':checked')) {
            $('#customInfoAlert').fadeIn().delay(3000).fadeOut(); // Show custom info alert and hide it after 3 seconds
        }
    });
});

$(document).ready(function() {
    for (let i = 1; i <= 29; i++) {
        $(`input[name="food_option_${i}"]`).click(function() {
          $(`input[name="food_option_${i}"]`).not(this).prop('checked', false);
        });
      }   
      updateWorkingHoursStatus()
  });

 var isResturantClosed = false; 
 function updateWorkingHoursStatus() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
    let currentHour = now.getHours();
    currentHour += now.getMinutes() / 60;
    const workingHours = {
        0: currentHour >= 9.5 && currentHour <= 21.5 ? true : false, // Sunday
        1: currentHour >= 9.5 && currentHour <= 22 ? true : false, // Monday
        2: currentHour >= 9.5 && currentHour <= 22 ? true : false, // Tuesday
        3: currentHour >= 9.5 && currentHour <= 22 ? true : false, // Wednesday
        4: currentHour >= 9.5 && currentHour <= 22 ? true : false, // Thursday
        5: currentHour >= 9.5 && currentHour <= 22 ? true : false, // Friday
        6: currentHour >= 9.5 && currentHour <= 22 ? true : false, // Saturday
    };

    const statusOpenElement = $('#status-open');
    const statusUntilElement = $('#status-until');
    const orderButton = $(".add-toCart");

    if (!workingHours[dayOfWeek]) {
        statusOpenElement.text('مغلق');
        statusUntilElement.text(' يفتح في الساعة 09:30');
        statusOpenElement.addClass('status-close').removeClass('status-open');
        orderButton.attr('onclick', 'return false;'); // Disable the onclick event
        orderButton.addClass('disabled'); // Add a class to style the button as disabled
        isResturantClosed=true;
    } else {
        statusOpenElement.text('مفتوح');
        statusUntilElement.text(' حتى 22:00');
        statusOpenElement.addClass('status-open').removeClass('status-close');
        
        orderButton.removeClass('disabled'); // Remove the disabled styling
        isResturantClosed=false;
    }
    $(".add-toCart").each(function() {
        const orderButton = $(this);
        const statusMessage = $('<br><span class="status-message"></span>');

        // Remove any existing status message
        orderButton.next('.status-message').remove();

        // Append the status message after the order button
        orderButton.after(statusMessage);

        if (!workingHours[dayOfWeek] || currentHour < workingHours[dayOfWeek].open || currentHour >= workingHours[dayOfWeek].close) {
            orderButton.prop('disabled', true);
            statusMessage.text('مغلق - نبدأ باستقبال طلباتكم في الـ 09:30');
        } else {
            orderButton.prop('disabled', false);
            statusMessage.text("");
        }
    });
}

function sendEmail(message){
    // const emailData = {
    //     to: "ionmedia.me@gmail.com",
    //     name: "Tamer Kitchen",
    //     phone: "",
    //     message: message,
    //     cc:"adham.shahwan94@gmail.com"
    // };

    // $.ajax({
    //     type: "POST",
    //     url: "/send-email",
    //     contentType: "application/json",
    //     data: JSON.stringify(emailData),
    //     success: function(data) {
            
    //     },
    //     error: function(error) {
           
    //     }
    // });
}
