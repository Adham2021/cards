

document.addEventListener("DOMContentLoaded", function () {

    // Call the function on page load
    updateWorkingHoursStatus();
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
        0: now.getHours() < 8 || now.getHours() > 16 ? 'Closed, Open at 08:00' : 'Open until 16:00', // Monday
        1: now.getHours() < 8 || now.getHours() > 16 ? 'Closed, Open at 08:00' : 'Open until 16:00', // Monday
        2: now.getHours() < 8 || now.getHours() > 16 ? 'Closed, Open at 08:00' : 'Open until 16:00', // Tuesday
        3: now.getHours() < 8 || now.getHours() > 16 ? 'Closed, Open at 08:00' : 'Open until 16:00', // Wednesday
        4: now.getHours() < 8 || now.getHours() > 16 ? 'Closed, Open at 08:00' : 'Open until 16:00', // Thursday
        5: now.getHours() < 8 || now.getHours() > 16 ? 'Closed, Open at 08:00 on Sun' : 'Open until 16:00', // Friday
        6: 'Closed, Open at 08:00' // Saturday
    };

    const statusOpenElement = document.getElementById('status-open');
    const statusUntilElement = document.getElementById('status-until');

    const currentLanguage = getLanguage();

    if (workingHours[dayOfWeek].includes('Closed')) {
        if (currentLanguage === 'hebrew') {
            statusOpenElement.textContent = 'סגור';
            if(dayOfWeek==5){
                statusUntilElement.textContent = 'נפתח ב 08:00 יום א`';
            }
            else{
            statusUntilElement.textContent = ' נפתח ב- 08:00';
            }
        } else if (currentLanguage === 'arabic') {
            statusOpenElement.textContent = 'مغلق';
            if(dayOfWeek==5){
            statusUntilElement.textContent = 'يفتح في الساعة 08:00 يوم الأحد';
            }
            else { 
                statusUntilElement.textContent = ' يفتح في الساعة 08:00';

            }
        } else if (currentLanguage === 'english') {
            statusOpenElement.textContent = 'Closed';
            statusUntilElement.textContent = ' Opens at 08:00';
        }
    
        statusOpenElement.classList.add('status-close');
        statusOpenElement.classList.remove('status-open');
    } else {
        if (currentLanguage === 'hebrew') {
            statusOpenElement.textContent = 'פתוח';
            statusUntilElement.textContent = ' עד 16:00';
        } else if (currentLanguage === 'arabic') {
            statusOpenElement.textContent = 'مفتوح';
            statusUntilElement.textContent = ' حتى 16:00';
        } else if (currentLanguage === 'english') {
            statusOpenElement.textContent = 'Open';
            statusUntilElement.textContent = ' Until 16:00';
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
        arabic: { flag: "/assets/images/files/flags/saudi-arabia.png", text: "العربية" },
        english: { flag: "/assets/images/files/flags/united-kingdom.png", text: "English" },
    };

    const selectedLanguage = languageData[language];
    localStorage.setItem('preferredLanguage', language);

    $("#selected-language").text(selectedLanguage.text);
    $("#language-menu-btn img").attr('src', selectedLanguage.flag);

    // Additional logic to change content or perform actions based on the selected language
    updateContent(language);
    updateWorkingHoursStatus();

    if (language === 'english') {
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




let currentIndex = 0;
let currentIndex2 = 0;
let currentIndex3 = 0;

let initialX = 0;
let initialX2 = 0;
let initialX3 = 0;

let isDragging = false;
let isDragging2 = false;
let isDragging3 = false;

const imageArray = [
    //gallery1
    [       
        'https://i.imgur.com/D0irBOT.jpg',
        'https://i.imgur.com/T74uKX6.jpg',
        'https://i.imgur.com/ku8gN9f.jpg',
        'https://i.imgur.com/5l8sO42.jpg',
        'https://i.imgur.com/17URgE1.jpg',
        'https://i.imgur.com/oNzmgzN.jpg',
        'https://i.imgur.com/cTL00o7.jpg',
        'https://i.imgur.com/54GniIP.jpg',
        'https://i.imgur.com/29kA20r.jpg',
        'https://i.imgur.com/syTyzgK.jpg',
        'https://i.imgur.com/FHIx6Sv.jpg',
        'https://i.imgur.com/NmE7NyR.jpg',
        'https://i.imgur.com/ISCp723.jpg'

    ],
    //gallery2
    [
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
    ],

    //gallery3

    [
        'https://i.imgur.com/Mr3zp6G.jpg',
        'https://i.imgur.com/ITO0oga.jpg',
        'https://i.imgur.com/U4ISrZW.jpg',
        'https://i.imgur.com/ttJq0WS.jpg',
        'https://i.imgur.com/ztwMqHQ.jpg',
        'https://i.imgur.com/piAcSBa.jpg'
    ]

];

function initGallery(gal) {
    const gallery = document.querySelector('.gallery'+gal);
    imageArray[gal-1].forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        gallery.appendChild(img);
    });

    // Attach touch event listeners
   
    gallery.addEventListener('touchstart', (e) => touchStart(e, gal));
    gallery.addEventListener('touchmove', (e) => touchMove(e, gal));
    gallery.addEventListener('touchend', touchEnd);
    gallery.galleryNumber=gal-1;
    if(gal==1)
    showSlide(currentIndex,gallery);
    if(gal==2)
    showSlide(currentIndex2,gallery);
    if(gal==3)
    showSlide(currentIndex3,gallery);
 
}

// Function to show a slide in a specific gallery
function showSlide(index, galleryElement) {
    const galleryImage = galleryElement.querySelector('img');
    galleryImage.src = imageArray[galleryElement.galleryNumber][index];
    // Update the currentIndex for the specific gallery
    galleryElement.currentIndex = index;
}

// Function to move to the previous slide in a specific gallery
function prevSlide(galleryNumber) {
    const galleryElement = document.querySelector('.gallery' + galleryNumber);

    galleryElement.currentIndex = (galleryElement.currentIndex - 1 + imageArray[galleryNumber - 1].length) % imageArray[galleryNumber - 1].length;
    galleryElement.galleryNumber=galleryNumber-1
    showSlide(galleryElement.currentIndex, galleryElement);
}

// Function to move to the next slide in a specific gallery
function nextSlide(galleryNumber) {
    const galleryElement = document.querySelector('.gallery' + galleryNumber );

    galleryElement.currentIndex = (galleryElement.currentIndex + 1) % imageArray[galleryNumber - 1].length;
    galleryElement.galleryNumber=galleryNumber-1
    showSlide(galleryElement.currentIndex, galleryElement);
}


function touchStart(e, galleryNumber) {
    switch (galleryNumber) {
        case 1:
            initialX = e.touches[0].clientX;
            isDragging = true;
            break;
        case 2:
            initialX2 = e.touches[0].clientX;
            isDragging2 = true;
            break;
        case 3:
            initialX3 = e.touches[0].clientX;
            isDragging3 = true;
            break;
        default:
            break;
    }
}


// Touch move function
function touchMove(e, galleryNumber) {
    let initialX, isDragging;

    switch (galleryNumber) {
        case 1:
            initialX = initialX;
            isDragging = isDragging;
            break;
        case 2:
            initialX = initialX2;
            isDragging = isDragging2;
            break;
        case 3:
            initialX = initialX3;
            isDragging = isDragging3;
            break;
        default:
            break;
    }

    if (isDragging) {
        const deltaX = e.touches[0].clientX - initialX;
        if (deltaX > 50) {
            prevSlide(galleryNumber);
            isDragging = false;
        } else if (deltaX < -50) {
            nextSlide(galleryNumber);
            isDragging = false;
        }
    }
}


// Touch end function
function touchEnd() {
    isDragging = false;
    isDragging2 = false;
    isDragging3 = false;
}

initGallery(1);
initGallery(2);
initGallery(3);

// Set up intervals for each gallery
const interval1 = setInterval(() => nextSlide(1), 5000);
const interval2 = setInterval(() => nextSlide(2), 5000);
const interval3 = setInterval(() => nextSlide(3), 5000);



// const reviewsArray = [
//     {
//         name: 'יוסי הק.',
//         subtitle: 'בעל בית בנהריה',
//         content: 'התמקצעות וייחודיות! התמקצעות מקצועית וייחודיות עם פרויקטים מרהיבים. המשרד יצר לנו חוויה עיצובית ופונקציונלית שהתאימה בדיוק לסגנון ולצרכים שלנו.'
//     },
//     {
//         name: 'דניאלה',
//         subtitle: 'בעלת חנות בגדים',
//         content: 'שירות אישי וייחודי. השירות שקיבלנו היה אישי ומקצועי. הצוות עבד יחד איתנו להבין את רצונינו ויצר פתרונות שהתאימו בצורה מושלמת לבית שלנו.'
//     },
//     {
//         name: 'אבי ז.',
//         subtitle: 'בעל חנות למכירת חומרי בניין',
//         content: 'אמינות ויציבות. עברנו תהליך של בניה חדשה עם המשרד והיינו מרוצים מאוד מהאמינות והיציבות של הצוות. תודה על יצירת הבית שתמיד חלמנו עליו.'
//     }
// ];

// let currentReviewIndex = 0;
// const slider = document.getElementById('slider');


// reviewsArray.forEach((review) => {
//     const slide = document.createElement('div');
//     slide.classList.add('slide');

//     slide.innerHTML = `
//     <img src="https://images.squarespace-cdn.com/content/v1/564142efe4b09d10c39f8a8f/1594926536902-L2RPB0G2W5J7PK3GSJX8/no-person-profile-pic.png" alt="${review.name}">
//     <h3>${review.name}</h3>
//     <p class="subtitle">${review.subtitle}</p>
//     <div class="stars">★★★★★</div>
//     <p>${review.content}</p>
// `;

//     slider.appendChild(slide);
// });

// const totalSlides = document.querySelectorAll('.slide').length;

// function changeSlide(direction) {
//     currentReviewIndex = (currentReviewIndex + direction + totalSlides) % totalSlides;

//     const translateValue = currentReviewIndex * 100 + '%';
//     slider.style.transform = 'translate(' + translateValue + ')';
// }



// // Automatic slide every 5 seconds
// setInterval(() => {
//     changeSlide(1);
// }, 5000);


document.getElementById('scan-icon').addEventListener('click', function () {

    // Slide up the barcode dialog
    document.getElementById('barcode-dialog').style.transform = 'translateY(0)';
    document.getElementById('barcode-dialog').style.display = 'block';
});

document.getElementById('close-dialog').addEventListener('click', function () {
    // Slide down the barcode dialog
    document.getElementById('barcode-dialog').style.transform = 'translateY(100%)';
});

// Close the dialog when clicking outside
document.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (clickedElement.className !== "fas fa-qrcode") {
        // Clicked outside the open dialog
        document.getElementById('barcode-dialog').style.transform = 'translateY(100%)';
    }
});

// Prevent clicks inside the dialog from closing it
document.getElementById('barcode-dialog').addEventListener('click', function (event) {
    event.stopPropagation();
});