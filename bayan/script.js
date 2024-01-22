

document.addEventListener("DOMContentLoaded", function () {

    // Call the function on page load
    updateWorkingHoursStatus();
});

function shareOn(type) {
    
    const text = 'الكرت الديجيتالي الخاص بمركز بيان للتجميل - القدس';
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
    const currentHour = now.getHours();
    
    const workingHours = {
        0: currentHour >= 9 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 09:00', // Sunday
        1: currentHour >= 9 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 09:00', // Monday
        2: currentHour >= 9 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 09:00', // Tuesday
        3: currentHour >= 9 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 09:00', // Wednesday
        4: currentHour >= 9 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 09:00', // Thursday
        5: currentHour >= 9 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 09:00', // Friday
        6: currentHour >= 9 && currentHour < 17 ? 'Open until 17:00' : 'Closed, Open at 10:00', // Saturday
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
        name: "مركز بيان للتجميل",
        phone: "+972535620105",
        email: ""
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
    };
    const selectedLanguage = languageData[language];
    localStorage.setItem('preferredLanguage_bayan', language);
    document.getElementById("selected-language").innerText = selectedLanguage.text;
    document.getElementById("language-menu-btn").getElementsByTagName("img")[0].src = selectedLanguage.flag;

    // Additional logic to change content or perform actions based on the selected language
    updateContent(language);
    updateWorkingHoursStatus()


    if (byClickButton) {
        toggleLanguageMenu();
    }
}
function getLanguage() {
    return localStorage.getItem('preferredLanguage_bayan') || 'arabic'; // Default language is Arabic
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

    var players = {}; // Object to store video players

    // Function to open the video dialog
    function openVideoDialog(videoId, num) {
      $("#video-overlay" + num).fadeIn();
      playVideo(videoId, num); // Play the video
    }
    
    // Function to close the video dialog
    function closeVideoDialog(num) {
      stopVideo(num); // Stop the video
      $("#video-overlay" + num).fadeOut();
    }
    
    // Function to stop the video
    function stopVideo(num) {
        if (players[num] && typeof players[num].stopVideo === 'function') {
          players[num].stopVideo();
        }
      }
    
    // Function to play the video
    function playVideo(videoId, num) {
      if (!players[num]) {
        players[num] = new YT.Player('player' + num, {
          height: '315',
          width: '560',
          videoId: videoId,
          events: {
            'onReady': function (event) {
              event.target.playVideo();
            }
          }
        });
      } else {
        players[num].loadVideoById(videoId);
        players[num].playVideo();
      }
    }
    
    // Close the video dialog when clicking outside
    $(document).mouseup(function (e) {
      for (var i = 1; i <= 3; i++) {
        var videoDialog = $("#video-overlay" + i + " .videoDialog");
        if (!videoDialog.is(e.target) && videoDialog.has(e.target).length === 0) {
          closeVideoDialog(i.toString());
        }
      }
    });
    
    // Event listeners for opening the video dialogs
    $("#open-video-dialog-1").click(function (e) {
      e.preventDefault();
      openVideoDialog("SMKCy7Dtw88", "1"); // YouTube video ID for the first video
    });
    
    $("#open-video-dialog-2").click(function (e) {
      e.preventDefault();
      openVideoDialog("k-bbDwc3IcI", "2"); // YouTube video ID for the second video
    });
    
    $("#open-video-dialog-3").click(function (e) {
      e.preventDefault();
      openVideoDialog("-yfx2R-ouJo", "3"); // YouTube video ID for the third video
    });
    
});

