

document.addEventListener("DOMContentLoaded", function () {

    // Call the function on page load
    updateWorkingHoursStatus();
});

function shareOn(type) {
    
    const text = 'الكرت الديجيتالي الذكي لـ Sky Of Jerusalem ';
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
        0: currentHour >= 9 && currentHour < 21 ? 'Open until 21:00' : 'Closed, Open at 09:00', // Sunday
        1: currentHour >= 9 && currentHour < 21 ? 'Open until 21:00' : 'Closed, Open at 09:00', // Monday
        2: currentHour >= 9 && currentHour < 21 ? 'Open until 21:00' : 'Closed, Open at 09:00', // Tuesday
        3: currentHour >= 9 && currentHour < 21 ? 'Open until 21:00' : 'Closed, Open at 09:00', // Wednesday
        4: currentHour >= 9 && currentHour < 21 ? 'Open until 21:00' : 'Closed, Open at 09:00', // Thursday
        5: 'Closed, Open at 09:00'                                                            , //Friday
        6: currentHour >= 9 && currentHour < 21 ? 'Open until 21:00' : 'Closed, Open at 09:00', // Saturday
    };

    const statusOpenElement = document.getElementById('status-open');
    const statusUntilElement = document.getElementById('status-until');

    const currentLanguage = getLanguage();

    if (workingHours[dayOfWeek].includes('Closed')) {
        if (currentLanguage === 'hebrew') {
            statusOpenElement.textContent = 'סגור';
            statusUntilElement.textContent = ' נפתח ב- 09:00';
            
        } else if (currentLanguage === 'arabic') {
            statusOpenElement.textContent = 'مغلق';
            statusUntilElement.textContent = ' يفتح في الساعة 09:00';    
        }
        else if (currentLanguage === 'english') {
            statusOpenElement.textContent = 'Closed';
            statusUntilElement.textContent = 'Open at 09:00';    
        }

        if(dayOfWeek==5){
            if (currentLanguage === 'hebrew') {
                statusUntilElement.textContent += " יום שבת";
            }
         else if (currentLanguage === 'arabic') {
            statusUntilElement.textContent += " السبت "
         }

         else if (currentLanguage === 'english') {
            statusUntilElement.textContent += " Saturday "
         }
        }
   
        statusOpenElement.classList.add('status-close');
        statusOpenElement.classList.remove('status-open');
    } 
    
    else {
        if (currentLanguage === 'hebrew') {
            statusOpenElement.textContent = 'פתוח';
            statusUntilElement.textContent = ' עד 21:00';
        } else if (currentLanguage === 'arabic') {
            statusOpenElement.textContent = 'مفتوح';
            statusUntilElement.textContent = ' حتى 21:00';
        }
        else if (currentLanguage === 'english') {
            statusOpenElement.textContent = 'Open';
            statusUntilElement.textContent = ' Until 21:00 ';
        }

        statusOpenElement.classList.add('status-open');
        statusOpenElement.classList.remove('status-close');
    }
}



function sendWhatsAppMessage(phone) {
    const whatsappLink = document.getElementById("whatsapp-link");
    const phoneNumber = phone;

    // Replace 'YOUR_DEFAULT_MESSAGE' with your desired default message
    const defaultMessage = encodeURIComponent('مرحبا ممكن تفاصيل اكثر ؟ ');

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
        name: "Sky Of Jerusalem",
        phone: "+972547229088",
        email: "sky.jerusalem23@gmail.com"
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

$(document).ready(function(){
    // Trigger click event on toggle button
    $('#firstToggle2').trigger('click');
    $('#firstToggle2').trigger('click');
});


function changeLanguage(language, byClickButton = true) {
    const languageData = {
        hebrew: { flag: "/assets/images/files/flags/israel.png", text: "עברית" },
        arabic: { flag: "/assets/images/files/flags/egypt.png", text: "العربية" },
        english: { flag: "/assets/images/files/flags/united-kingdom.png", text: "English" },
    };
    const selectedLanguage = languageData[language];
    localStorage.setItem('SkyOfJerusalemPreferredLanguage', language);
    document.getElementById("selected-language").innerText = selectedLanguage.text;
    document.getElementById("language-menu-btn").getElementsByTagName("img")[0].src = selectedLanguage.flag;

    if (language === 'english') {
        // Set the page direction to LTR for English
        $('html').attr('dir', 'ltr');
        $('p.translatable').css('text-align', 'left');
        $('li.translatable').css('text-align', 'left');
        $('p.ProgramHead').css('text-align', 'center');
        $('p.subtitle').css('text-align', 'center');
        $('p.float-center').css('text-align', 'center');
    } else {
        // Reset the page direction for Hebrew and Arabic
        $('html').attr('dir', 'rtl');
        $('p.translatable').css('text-align', 'right');
        $('li.translatable').css('text-align', 'right');
        $('p.ProgramHead').css('text-align', 'center');
        $('p.subtitle').css('text-align', 'center');
        $('p.float-center').css('text-align', 'center');
    }

    // Additional logic to change content or perform actions based on the selected language
    updateContent(language);
    updatePlaceholders(language)
    updateWorkingHoursStatus()


    if (byClickButton) {
        toggleLanguageMenu();
    }
}
function getLanguage() {
    return localStorage.getItem('SkyOfJerusalemPreferredLanguage') || 'arabic'; // Default language is Arabic
}
function toggleLanguageMenu() {
    var languageMenu = document.getElementById("language-menu");
    languageMenu.style.display = (languageMenu.style.display === "block") ? "none" : "block";
}

function updateContent(language) {
    if(language=='arabic'){
        $('body').css('font-family', 'Cairo, sans-serif');
    }
    if(language=='hebrew'){
        $('body').css('font-family', 'Heebo, sans-serif');
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
      const images = document.querySelectorAll('.gallery .img-responsive');
  
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

    $(".whatsapp-button").click(function(){
        // Get the WhatsApp link from the anchor tag href attribute
        var whatsappLink = $(this).find("a").attr("href");
        // Open the WhatsApp link in a new tab
        window.open(whatsappLink, '_blank');
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
        };

        // Check phone number length
        if (phoneNumber.length < 7 || phoneNumber.length > 10) {
            phoneError.text(errorMessages[selectedLanguage].phoneLength);
            return;
        }

        // Reset error messages
        phoneError.text("");

        const emailData = {
            to: "Remaxurlife15@gmail.com",
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
                    alert("شكرًا لك على رسالتك");

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


$(document).ready(function(){
    // Populate subcategory dropdown based on selected category
    $('#category-select').change(function(){
      var selectedCategory = $(this).val();
      var subcategories;
      switch(selectedCategory) {
        case 'manhaje':
            subcategories = [
                {value: 'all_programs', text: 'كل البرامج', data: {arabic: 'كل البرامج', hebrew: 'כל התוכניות', english: 'All Programs'}},
                {value: 'algorithm_melody', text: 'لحن اللوغاريتم', data: {arabic: 'لحن اللوغاريتم', hebrew: 'מניע השפעה', english: 'Impact Drive'}},
                {value: 'sustainability_chants', text: 'تراتيل الاستدامة', data: {arabic: 'تراتيل الاستدامة', hebrew: 'שירי קיימות', english: 'Sustainability Chants'}},
                {value: 'electronic_marketing', text: 'التسويق الالكتروني', data: {arabic: 'التسويق الالكتروني', hebrew: 'שיווק דיגיטלי', english: 'Electronic Marketing'}},
                {value: 'financial_management', text: 'الادارة المالية', data: {arabic: 'الادارة المالية', hebrew: 'ניהול פיננסי', english: 'Financial Management'}},
                {value: 'animal_therapy', text: 'علاج عن طريق الحيوان', data: {arabic: 'علاج عن طريق الحيوان', hebrew: 'טיפול בעזרת בעלי חיים', english: 'Animal Therapy'}},
                {value: 'cinematic_photography_therapy', text: 'علاج عن طريق التصوير السينيمائي', data: {arabic: 'علاج عن طريق التصوير السينيمائي', hebrew: 'טיפול בצילום קולנועי', english: 'Cinematic Photography Therapy'}},
                {value: 'nature_therapy', text: 'علاج بالطبيعة', data: {arabic: 'علاج بالطبيعة', hebrew: 'טיפול בטבע', english: 'Nature Therapy'}},
                {value: 'cinematic_makeup', text: 'المكياج السينمائي', data: {arabic: 'المكياج السينمائي', hebrew: 'איפור קולנועי', english: 'Cinematic Makeup'}},
                {value: 'threads_wealth', text: 'خيوط الثراء', data: {arabic: 'خيوط الثراء', hebrew: 'חוטי עושר', english: 'Threads of Wealth'}},
                {value: 'resin_art', text: 'فن الريزن', data: {arabic: 'فن الريزن', hebrew: 'אומנות רזין', english: 'Resin Art'}},
                {value: 'dabke_and_traditional_arts', text: 'دبكة وفنون تراثية', data: {arabic: 'دبكة وفنون تراثية', hebrew: 'דבקה ואומנויות מסורתיות', english: 'Dabke and Traditional Arts'}}
            ];
            break;
        case 'lamanhaje':
            subcategories = [
                {value: 'all_programs', text: 'كل البرامج', data: {arabic: 'كل البرامج', hebrew: 'כל התוכניות', english: 'All Programs'}},
                {value: 'leadership_symphony', text: 'عالم الواقع الافتراضي (VR)', data: {arabic: 'عالم الواقع الافتراضي (VR)', hebrew: 'עולם מציאות מדומה (VR)', english: 'Virtual Reality World (VR)'}},
                {value: 'alam_doma', text: 'عالم الدمى', data: {arabic: 'عالم الدمى', hebrew: 'עולם הבובות', english: 'World of Puppets'}},
                {value: 'fan_makrame', text: 'فن المكرمية', data: {arabic: 'فن المكرمية', hebrew: 'אמנות מקרמה', english: 'Macrame Art'}},
                {value: 'summer_camps', text: 'مخيمات صيفية', data: {arabic: 'مخيمات صيفية', hebrew: 'מחנות קיץ', english: 'Summer Camps'}},
                {value: 'one-time_trips', text: 'رحلات لمرة واحدة', data: {arabic: 'رحلات لمرة واحدة', hebrew: 'טיולים חד פעמיים', english: 'One-Time Trips'}},
                {value: 'swimming', text: 'سباحة', data: {arabic: 'سباحة', hebrew: 'שחייה', english: 'Swimming'}},
                {value: 'horseback_riding', text: 'ركوب خيل', data: {arabic: 'ركوب خيل', hebrew: 'רכיבה על סוסים', english: 'Horseback Riding'}},
                {value: 'diving', text: 'غوص', data: {arabic: 'غوص', hebrew: 'צלילה', english: 'Diving'}},
                {value: 'surfing', text: 'ركوب أمواج', data: {arabic: 'ركوب أمواج', hebrew: 'גלישת גלים', english: 'Surfing'}},
                {value: 'extreme_sports', text: 'رياضات تحدّي', data: {arabic: 'رياضات تحدّي', hebrew: 'ספורט אתגרי', english: 'Extreme Sports'}}
            ];
            break;
        case 'mehani':
            subcategories = [
                {value: 'all_programs', text: 'كل البرامج', data: {arabic: 'كل البرامج', hebrew: 'כל התוכניות', english: 'All Programs'}},
                {value: 'hairdressing', text: 'حلاقة', data: {arabic: 'حلاقة', hebrew: 'תספורת', english: 'Hairdressing'}},
                {value: 'cooking', text: 'طبيخ', data: {arabic: 'طبيخ', hebrew: 'בישול', english: 'Cooking'}},
                {value: 'sweet_making', text: 'صناعة حلويات', data: {arabic: 'صناعة حلويات', hebrew: 'הכנת ממתקים', english: 'Sweet Making'}},
                {value: 'party_decorating', text: 'تزين وتنسيق حفلات', data: {arabic: 'تزين وتنسيق حفلات', hebrew: 'קישוט והפקת מסיבות', english: 'Party Decorating'}},
                {value: 'little_chef', text: 'الشيف الصغير', data: {arabic: 'الشيف الصغير', hebrew: 'השף הקטן', english: 'Little Chef'}},
                {value: 'dj', text: 'DJ', data: {arabic: 'DJ', hebrew: 'די ג\'יי', english: 'DJ'}},
                {value: 'beauty_and_nails', text: 'تجميل وأظافر', data: {arabic: 'تجميل وأظافر', hebrew: 'איפור וציפורניים', english: 'Beauty and Nails'}}
            ];
            break;
        default:
            subcategories = [{value: 'all_programs', text: 'كل البرامج', data: {arabic: 'كل البرامج', hebrew: 'כל התוכניות', english: 'All Programs'}}];
    }
      populateSubcategoryDropdown(subcategories);
      changeLanguage(getLanguage(), false)
    }).trigger('change');
  
    // Handle search button click
    $('#search-btn').click(function(){
      var category = $('#category-select').val();
      var subcategory = $('#subcategory-select').val();
      console.log("Searching for Category:", category, "and Subcategory:", subcategory);
      // Perform search based on selected category and subcategory
      // This can be implemented as needed
    });
  
    // Function to populate subcategory dropdown
    function populateSubcategoryDropdown(subcategories) {
        var subcategorySelect = $('#subcategory-select');
        subcategorySelect.empty();
        
        $.each(subcategories, function(index, item) {
            subcategorySelect.append($('<option>', {
                value: item.value,
                text: item.text,
                'data-lang-arabic': item.data.arabic,
                'data-lang-hebrew': item.data.hebrew,
                'data-lang-english': item.data.english,
                'class' : "translatable"
            }));
        });
    
        // Set 'كل البرامج' as selected by default
        subcategorySelect.val('all_programs');
        
    }
    
  });

  function SearchProgram() {
    var category = $("#category-select").val();
    var subCategory = $("#subcategory-select").val(); // Fix missing '#' here

    var targetOffset = $('#' + category).offset().top;
    $("html, body").animate({
        scrollTop: targetOffset
    }, 1000); 

    $("#"+category+"-content").show()

    targetOffset = $('#' + subCategory).offset().top;
    $("html, body").animate({
        scrollTop: targetOffset
    }, 1000); 

    $("#"+subCategory+"-content").show()
}

