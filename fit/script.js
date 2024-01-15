

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
    const phoneNumber = '+972528957836';

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
        name: "מועתסם ח'ליליה - אדריכאל",
        phone: "+972528957836",
        email: "Moatasem97.kh@gmail.com"
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
        arabic: { flag: "/assets/images/files/flags/egypt.png", text: "العربية" },
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




const gallery = document.querySelector('.gallery');
let currentIndex = 0;
let initialX = 0;
let isDragging = false;

const imageArray = [
    'https://i.imgur.com/M2MdiJv.jpg',
    'https://i.imgur.com/pRcAbQj.jpg',
    'https://i.imgur.com/AQ4RM76.jpg',
    'https://i.imgur.com/nDUVkJK.jpg',
    'https://i.imgur.com/mCEnphz.jpg',
    'https://i.imgur.com/00ttFnj.jpg',
    'https://i.imgur.com/zgkKUj5.jpg',
    'https://i.imgur.com/9tNhABY.jpg',
    'https://i.imgur.com/BnfLdIw.jpg',
    'https://i.imgur.com/eWbJfiQ.jpg'

];

function initGallery() {
    imageArray.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        gallery.appendChild(img);
    });

    // Attach touch event listeners
    gallery.addEventListener('touchstart', touchStart);
    gallery.addEventListener('touchmove', touchMove);
    gallery.addEventListener('touchend', touchEnd);

    showSlide(currentIndex);
}

function showSlide(index) {
    const galleryImage = document.querySelector('.gallery img');
    galleryImage.src = imageArray[index];
    // Update the currentIndex
    currentIndex = index;
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % imageArray.length;
    showSlide(currentIndex);
}

function touchStart(e) {
    initialX = e.touches[0].clientX;
    isDragging = true;
}

function touchMove(e) {
    if (isDragging) {
        const deltaX = e.touches[0].clientX - initialX;
        if (deltaX > 50) {
            prevSlide();
            isDragging = false;
        } else if (deltaX < -50) {
            nextSlide();
            isDragging = false;
        }
    }
}

function touchEnd() {
    isDragging = false;
}

initGallery();
setInterval(() => {
    nextSlide();
}, 5000); // Change the interval time as needed


const gallery2 = document.querySelector('.gallery2');
let currentIndex2 = 0;
let initialX2 = 0;
let isDragging2 = false;

const imageArray2 = [
    'https://i.imgur.com/XRS5LAS.jpg',
    'https://i.imgur.com/5URyQqT.jpg',
    'https://i.imgur.com/xjav5NG.jpg',
    'https://i.imgur.com/raieYQr.jpg',
    'https://i.imgur.com/KRRakqv.jpg',
    'https://i.imgur.com/6Ao8X16.jpg',
    'https://i.imgur.com/0IkJITw.jpg',
    'https://i.imgur.com/IAy2Nz7.jpg',
    'https://i.imgur.com/G6nzhbH.jpg',
    'https://i.imgur.com/6Z3z2en.jpg'
];

function initGallery2() {
    imageArray2.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        gallery2.appendChild(img);
    });

    // Attach touch event listeners
    gallery2.addEventListener('touchstart', touchStart2);
    gallery2.addEventListener('touchmove', touchMove2);
    gallery2.addEventListener('touchend', touchEnd2);

    showSlide2(currentIndex2);
}

function showSlide2(index) {
    const galleryImage2 = document.querySelector('.gallery2 img');
    galleryImage2.src = imageArray2[index];
    // Update the currentIndex
    currentIndex2 = index;
}

function prevSlide2() {
    currentIndex2 = (currentIndex2 - 1 + imageArray2.length) % imageArray2.length;
    showSlide2(currentIndex2);
}

function nextSlide2() {
    currentIndex2 = (currentIndex2 + 1) % imageArray2.length;
    showSlide2(currentIndex2);
}

function touchStart2(e) {
    initialX2 = e.touches[0].clientX;
    isDragging2 = true;
}

function touchMove2(e) {
    if (isDragging2) {
        const deltaX2 = e.touches[0].clientX - initialX2;
        if (deltaX2 > 50) {
            prevSlide2();
            isDragging2 = false;
        } else if (deltaX2 < -50) {
            nextSlide2();
            isDragging2 = false;
        }
    }
}

function touchEnd2() {
    isDragging2 = false;
}

initGallery2();
setInterval(() => {
    nextSlide2();
}, 5000); // Change the interval time as needed




const reviewsArray = [
    {
        name: 'יוסי הק.',
        subtitle: 'בעל בית בנהריה',
        content: 'התמקצעות וייחודיות! התמקצעות מקצועית וייחודיות עם פרויקטים מרהיבים. המשרד יצר לנו חוויה עיצובית ופונקציונלית שהתאימה בדיוק לסגנון ולצרכים שלנו.'
    },
    {
        name: 'דניאלה',
        subtitle: 'בעלת חנות בגדים',
        content: 'שירות אישי וייחודי. השירות שקיבלנו היה אישי ומקצועי. הצוות עבד יחד איתנו להבין את רצונינו ויצר פתרונות שהתאימו בצורה מושלמת לבית שלנו.'
    },
    {
        name: 'אבי ז.',
        subtitle: 'בעל חנות למכירת חומרי בניין',
        content: 'אמינות ויציבות. עברנו תהליך של בניה חדשה עם המשרד והיינו מרוצים מאוד מהאמינות והיציבות של הצוות. תודה על יצירת הבית שתמיד חלמנו עליו.'
    }
];

let currentReviewIndex = 0;
const slider = document.getElementById('slider');


reviewsArray.forEach((review) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    slide.innerHTML = `
    <img src="https://images.squarespace-cdn.com/content/v1/564142efe4b09d10c39f8a8f/1594926536902-L2RPB0G2W5J7PK3GSJX8/no-person-profile-pic.png" alt="${review.name}">
    <h3>${review.name}</h3>
    <p class="subtitle">${review.subtitle}</p>
    <div class="stars">★★★★★</div>
    <p>${review.content}</p>
`;

    slider.appendChild(slide);
});

const totalSlides = document.querySelectorAll('.slide').length;

function changeSlide(direction) {
    currentReviewIndex = (currentReviewIndex + direction + totalSlides) % totalSlides;

    const translateValue = currentReviewIndex * 100 + '%';
    slider.style.transform = 'translate(' + translateValue + ')';
}



// Automatic slide every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);


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