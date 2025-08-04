

document.addEventListener("DOMContentLoaded", function () {

    // Call the function on page load
    updateWorkingHoursStatus();
});

function shareOn(type) {
    
    const text = 'כרטיס הביקור הדיגטלי של המשפץ האמין | עבודות שיפוצים';
    const url = window.location.href;
    if (type === 'facebook') {
        const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookShareURL, '_blank');
    }
    if (type === 'telegram') {

        const telegramShareURL = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        window.open(telegramShareURL, '_blank');

    }
    if (type === 'messenger') {

        const messengerShareURL = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=123456789&redirect_uri=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
window.open(messengerShareURL, '_blank');
    }
    if (type === 'whatsapp') {

        const whatsappShareURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)} ${encodeURIComponent(url)}`;
window.open(whatsappShareURL, '_blank');

    }
    if (type === 'linkedin') {
        const linkedinShareURL = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
        window.open(linkedinShareURL, '_blank');
    }
}
changeLanguage(getLanguage(), false)

function updateWorkingHoursStatus() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
    let currentHour = now.getHours();
    currentHour += now.getMinutes()/60
    const workingHours = {
        0: currentHour >= 8 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 08:00', // Sunday
        1: currentHour >= 8 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 08:00', // Monday
        2: currentHour >= 8 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 08:00', // Tuesday
        3: currentHour >= 8 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 08:00', // Wednesday
        4: currentHour >= 8 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 08:00', // Thursday
        5:  'Closed, Open at 08:00-Sunday', // Friday
        6:  'Closed, Open at 08:00-Sunday', // Saturday
    };

    const statusOpenElement = document.getElementById('status-open');
    const statusUntilElement = document.getElementById('status-until');

    const currentLanguage = getLanguage();

    if (workingHours[dayOfWeek].includes('Closed')) {
        if (currentLanguage === 'hebrew') {
            statusOpenElement.textContent = 'סגור';
            statusUntilElement.textContent = ' נפתח ב- 08:00';
        } else if (currentLanguage === 'arabic') {
            statusOpenElement.textContent = 'مغلق';
            statusUntilElement.textContent = ' يفتح في الساعة 08:00';
        }
    if(dayOfWeek==5 || dayOfWeek==6){
        if (currentLanguage === 'hebrew') {
            statusUntilElement.textContent += " יום א ";
        }
     else if (currentLanguage === 'arabic') {
        statusUntilElement.textContent += " الاحد "
     }
    }
        statusOpenElement.classList.add('status-close');
        statusOpenElement.classList.remove('status-open');
    } else {
        if (currentLanguage === 'hebrew') {
            statusOpenElement.textContent = 'פתוח';
            statusUntilElement.textContent = ' עד 17:00';
        } else if (currentLanguage === 'arabic') {
            statusOpenElement.textContent = 'مفتوح';
            statusUntilElement.textContent = ' حتى 17:00';
        }

        statusOpenElement.classList.add('status-open');
        statusOpenElement.classList.remove('status-close');
    }
}



function sendWhatsAppMessage(phone) {
    const whatsappLink = document.getElementById("whatsapp-link");
    const phoneNumber = phone;

    // Replace 'YOUR_DEFAULT_MESSAGE' with your desired default message
    const defaultMessage = encodeURIComponent(' שלום אפשר פרטים ?');

    const whatsappApi = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${defaultMessage}`;
    window.open(whatsappApi, '_blank');
}
function toggleContent(btn) {
    // Toggle the 'show' class on the toggle-content div
    var toggleContent = btn.nextElementSibling;
    toggleContent.classList.toggle('show');

    // Toggle the icon based on the 'show' class
    var icon = btn.querySelector('i');
    if (toggleContent.classList.contains('show')) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    } else {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    }
}
function toggleService(btn) {
    // Toggle the 'show' class on the toggle-content div
    var toggleContent = btn.nextElementSibling;
    toggleContent.classList.toggle('show');

    // Toggle the icon based on the 'show' class
    var icon = btn.querySelector('i');
    if (toggleContent.classList.contains('show')) {
        icon.classList.remove('fa-angle-down');
        icon.classList.add('fa-angle-up');
    } else {
        icon.classList.remove('fa-angle-up');
        icon.classList.add('fa-angle-down');
    }
}
function addToContacts() {
    var contact = {
        name: "המשפץ האמין | עבודות שיפוצים",
        phone: "+972524834208",
        email: "hamshptshameen@gmail.com"
    };
    // create a vcard file
    var vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:" + contact.name + "\nTEL;TYPE=work,voice:" + contact.phone + "\nEMAIL:" + contact.email + "\nEND:VCARD";
    var blob = new Blob([vcard], { type: "text/vcard" });
    var url = URL.createObjectURL(blob);

    const newLink = document.createElement('a');
    newLink.download = contact.name + ".vcf";
    newLink.textContent = contact.name;
    newLink.href = url;

    newLink.click();
}
$(document).ready(function() {
    $(".toggle-btn").click(function() {
        $(this).next(".toggle-content").slideToggle("slow");
        $(this).find("i").toggleClass("fa-angle-down fa-angle-up");
    });
});




function changeLanguage(language, byClickButton = true) {
    const languageData = {
        hebrew: { flag: "/assets/images/files/flags/israel.png", text: "עברית" },
        arabic: { flag: "/assets/images/files/flags/egypt.png", text: "العربية" },
        english: { flag: "/assets/images/files/flags/united-kingdom.png", text: "English" },
        russian: { flag: "/assets/images/files/flags/russia.png", text: "Русский" },
    };
    const selectedLanguage = languageData[language];
    localStorage.setItem('AmeenPreferredLanguage', language);
    document.getElementById("selected-language").innerText = selectedLanguage.text;
    document.getElementById("language-menu-btn").getElementsByTagName("img")[0].src = selectedLanguage.flag;

    // Additional logic to change content or perform actions based on the selected language
    updateContent(language);
    updatePlaceholders(language)
    updateWorkingHoursStatus()

    if (language === 'russian') {
        // Set the page direction to LTR for English
        $('html').attr('dir', 'ltr');
    } else {
        // Reset the page direction for Hebrew and Arabic
        $('html').attr('dir', 'rtl');
    }

    if (byClickButton) {
        toggleLanguageMenu();
    }
}
function getLanguage() {
    return localStorage.getItem('AmeenPreferredLanguage') || 'hebrew'; // Default language is Arabic
}
function toggleLanguageMenu() {
    var languageMenu = document.getElementById("language-menu");
    languageMenu.style.display = (languageMenu.style.display === "block") ? "none" : "block";
}

function updateContent(language) {
    if(language=='arabic'){
        $('body').css('font-family', 'Cairo, sans-serif');
        $(".whyus_arabic").show();
        $(".whyus_hebrew").hide();
        $(".whyus_russian").hide();
    }
    if(language=='hebrew'){
        $('body').css('font-family', 'Heebo, sans-serif');
        $(".whyus_arabic").hide();
        $(".whyus_hebrew").show();
        $(".whyus_russian").hide();
    }
    if(language=='russian') { 
        $('body').css('font-family', 'Heebo, sans-serif');
        $(".whyus_arabic").hide();
        $(".whyus_hebrew").hide();
        $(".whyus_russian").show();
    }
    const translatableElements = document.querySelectorAll('.translatable');

    translatableElements.forEach(element => {
        const translatedText = element.dataset[`lang${language.charAt(0).toUpperCase()}${language.slice(1)}`];
        if (translatedText) {
            if (element.tagName.toLowerCase() === 'p' || element.tagName.toLowerCase() === 'span') {
                element.innerText = translatedText;
            } else {
                // Assuming other elements might have innerText as well
                element.innerText = translatedText;
            }
        }
    });
}


function updatePlaceholders(selectedLanguage) {
    var placeholderKey = 'data-lang-' + selectedLanguage;
    var placeholderText = $('#name').attr(placeholderKey); // Use .attr() to access the data attribute
    $('#name').attr('placeholder', placeholderText);

    var placeholderText2 = $('#phone').attr(placeholderKey); // Use .attr() to access the data attribute
    $('#phone').attr('placeholder', placeholderText2);

    var placeholderText3 = $('#message').attr(placeholderKey); // Use .attr() to access the data attribute
    $('#message').attr('placeholder', placeholderText3);
}


let currentReviewIndex = 0;
const slider = document.getElementById('slider');
const totalSlides = document.querySelectorAll('.slide').length;
let intervalId; // Variable to store the interval ID

function changeSlide(direction) {
    currentReviewIndex = (currentReviewIndex + direction + totalSlides) % totalSlides;
    const selectedLanguage = getLanguage();

    if(selectedLanguage == "russian"){
        currentReviewIndex = currentReviewIndex*-1
    }
    const translateValue = currentReviewIndex * 100 + '%';

    slider.style.transform = 'translate(' + translateValue + ')';
}

// Function to start the interval
function startInterval() {
    intervalId = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Function to stop the interval
function stopInterval() {
    clearInterval(intervalId);
}

// Add event listeners to detect touch events on the slider
slider.addEventListener('touchstart', stopInterval);
slider.addEventListener('touchend', startInterval);

// Start the initial interval
startInterval();




document.getElementById('scan-icon').addEventListener('click', function() {
  
    // Slide up the barcode dialog
    document.getElementById('barcode-dialog').style.transform = 'translateY(0)';
    document.getElementById('barcode-dialog').style.display = 'block';
});

document.getElementById('close-dialog').addEventListener('click', function() {
    // Slide down the barcode dialog
    document.getElementById('barcode-dialog').style.transform = 'translateY(100%)';
});

// Close the dialog when clicking outside
document.addEventListener('click', function(event) {
    const clickedElement = event.target;

    if (clickedElement.className!=="fas fa-qrcode") {
        // Clicked outside the open dialog
        document.getElementById('barcode-dialog').style.transform = 'translateY(100%)';
    }
});

// Prevent clicks inside the dialog from closing it
document.getElementById('barcode-dialog').addEventListener('click', function(event) {
    event.stopPropagation();
});


$(document).ready(function() {
    $("[data-fancybox]").fancybox({
      // Options here
      buttons: [
        "zoom",
        "slideShow",
        "fullScreen",
        "download",
        "thumbs",
        "close"
      ]
    });
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('img-visible');
            observer.unobserve(entry.target);
          }
        });
      }
  
      // Set up the Intersection Observer
      const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
  
      // Target all images with the class 'img-responsive' inside the gallery
      const images = document.querySelectorAll('#gallery .img-responsive');
  
      // Observe each image
      images.forEach(image => {
        observer.observe(image);
      });
  });

  $(document).ready(function () {
    const text1 = $('#text1');
    const text2 = $('#text2');
    const text3 = $('#text3'); // Add text3

    const duration = 1000; // Duration for each text display

    function toggleText() {
        text1.fadeIn(duration, function () {
            text1.delay(duration).fadeOut(duration, function () {
                text2.fadeIn(duration, function () {
                    text2.delay(duration).fadeOut(duration, function () {
                        text3.fadeIn(duration, function () { // Fade in text3
                            text3.delay(duration).fadeOut(duration, function () { // Fade out text3
                                toggleText(); // Repeat the loop
                            });
                        });
                    });
                });
            });
        });
    }

    toggleText(); // Start the loop
});


$(document).ready(function () {
    const addToHomeScreenButton = $('#addToHomeScreenButton');
    let deferredPrompt;

    // Check for the beforeinstallprompt event and store it in deferredPrompt
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        addToHomeScreenButton.show(); // Show the "Add to Home Screen" button
    });

    // Add click event listener to the button
    addToHomeScreenButton.click(() => {
        if (deferredPrompt) {
            // Show the installation prompt
            deferredPrompt.prompt();
            // Wait for the user's response
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
                addToHomeScreenButton.hide(); // Hide the button after user interaction
            });
        }
    });
});

$(document).ready(function() {
    const form = $("#emailForm");
    const nameInput = $("#name");
    const phoneInput = $("#phone");
    const messageInput = $("#message");
    const nameError = $("#name-error");
    const phoneError = $("#phone-error");

    // Use input event to restrict input to numeric values only
    phoneInput.on("input", function() {
        // Remove non-numeric characters
        const phoneNumber = phoneInput.val().replace(/[^0-9]/g, '');

        // Update the input value with the numeric version
        phoneInput.val(phoneNumber);
    });

    form.submit(function(event) {
        event.preventDefault();
        const phoneNumber = phoneInput.val().trim();

        // Get the selected language
        const selectedLanguage = getLanguage()

        // Define error messages based on the selected language
        const errorMessages = {
            english: {
                phoneLength: "Phone number must be between 7 and 10 digits.",
                // Add other error messages in English if needed
            },
            arabic: {
                phoneLength: "يجب أن يكون رقم الهاتف بين 7 و 10 أرقام.",
                // Add other error messages in Arabic if needed
            },
            hebrew: {
                phoneLength: "מספר הטלפון חייב להיות בין 7 ל-10 ספרות.",
                // Add other error messages in Hebrew if needed
            },
            russian: {
                phoneLength: "Номер телефона должен содержать от 7 до 10 цифр.",
                // Add other error messages in Russian if needed
            },
        };

        // Check phone number length
        if (phoneNumber.length < 7 || phoneNumber.length > 10) {
            phoneError.text(errorMessages[selectedLanguage].phoneLength);
            return;
        }

        // Reset error messages
        phoneError.text("");

        const emailData = {
            to: "hamshptshameen@gmail.com",
            name: nameInput.val(),
            phone: phoneNumber,
            message: messageInput.val(),
            cc:"adham.shahwan94@gmail.com"
        };

        $.ajax({
            type: "POST",
            url: "/send-email",
            contentType: "application/json",
            data: JSON.stringify(emailData),
            success: function(data) {
                if (data.success) {
                    $("#successMessage").show();
                    $("#errorMessage").hide();
                    alert("תודה על ההודעה שלך");

                    // Clear input fields after successful submission
                    nameInput.val("");
                    phoneInput.val("");
                    messageInput.val("");
                } else {
                    $("#successMessage").hide();
                    $("#errorMessage").show();
                }
            },
            error: function(error) {
                $("#errorMessage").show();
            }
        });
    });

    // Show error messages as the user types
    nameInput.on("input", function() {
        nameError.text("");
    });

    phoneInput.on("input", function() {
        phoneError.text("");
    });
});
