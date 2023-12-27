

document.addEventListener("DOMContentLoaded", function () {
var t=  $("#facebook").val()
    // Call the function on page load
    updateWorkingHoursStatus();
});

$(document).ready(function () {
    $("#flip-services").on("click", function () {
        $(this).toggleClass("active");
        $("#panel-services").slideToggle("slow");
    });

    $("#flip-hours").on("click", function () {
        $(this).toggleClass("active");
        $("#panel-hours").slideToggle("slow");
    });
    $(".qa-content").on("click", function () {
        $(this).toggleClass("active");
        $(this).nextAll(".qa-panel:first").slideToggle("slow");
    });
});
function shareOn(type) {
    
    const text = 'Check out this awesome website!';
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

    const workingHours = {
        0: now.getHours() < 8 || now.getHours() > 17 ? 'Closed, Open at 08:00' : 'Open until 17:00', // Monday
        1: now.getHours() < 8 || now.getHours() > 17 ? 'Closed, Open at 08:00' : 'Open until 17:00', // Monday
        2: now.getHours() < 8 || now.getHours() > 17 ? 'Closed, Open at 08:00' : 'Open until 17:00', // Tuesday
        3: now.getHours() < 8 || now.getHours() > 17 ? 'Closed, Open at 08:00' : 'Open until 17:00', // Wednesday
        4: now.getHours() < 8 || now.getHours() > 17 ? 'Closed, Open at 08:00' : 'Open until 17:00', // Thursday
        5: now.getHours() < 8 || now.getHours() > 17 ? 'Closed, Open at 08:00' : 'Open until 17:00', // Friday
        6: 'Closed, Open at 08:00' // Saturday
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

        statusOpenElement.classList.add('status-close');
        statusOpenElement.classList.remove('status-open');
    }

    else {
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


function sendWhatsAppMessage() {
    const whatsappLink = document.getElementById("whatsapp-link");
    const phoneNumber = '+972525007464';

    // Replace 'YOUR_DEFAULT_MESSAGE' with your desired default message
    const defaultMessage = encodeURIComponent('שלום , אשמח לעוד פרטים...');

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
        name: "גרר אלמג'ד",
        phone: "+972525007464",
        email: "infoalmjd@gmail.com"
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





function changeLanguage(language, byClickButton = true) {
    const languageData = {
        hebrew: { flag: "/assets/images/files/flags/israel.png", text: "עברית" },
        arabic: { flag: "/assets/images/files/flags/saudi-arabia.png", text: "العربية" },
        english: { flag: "/assets/images/files/flags/united-kingdom.png", text: "English" },
    };
    const selectedLanguage = languageData[language];
    localStorage.setItem('preferredLanguage', language);
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
    return localStorage.getItem('preferredLanguage') || 'hebrew'; // Default language is Hebrew
}
function toggleLanguageMenu() {
    var languageMenu = document.getElementById("language-menu");
    languageMenu.style.display = (languageMenu.style.display === "block") ? "none" : "block";
}

function updateContent(language) {
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
  