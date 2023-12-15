

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




const gallery = document.querySelector('.gallery');
let currentIndex = 0;
let initialX = 0;
let isDragging = false;

const imageArray = [
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/403138780_1011495743269330_6104723034540259437_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=RDQbkdpu44QAX9PqXI_&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfARCEIeRUEQuTf-2-4u1di0Fuw8wChC0N9QPI8jugl5ZQ&oe=657AC9B2',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/405799265_1011495659936005_2940389452757371972_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=oHIdCDC2X-4AX8C8rmP&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfCydcKnUuDoTIW7OsEFeXgoLmKFlEta6pBp0TeD2420qw&oe=6579C214',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/403206905_1011495709936000_1294158851946207645_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=ZMy0aeG6HaEAX-yZyXX&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfAWUnCGFZo-wUd5UkywVDmps2rI-YymeIooIcmMlqNb3g&oe=657A98E5',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/405793280_1011495696602668_2908312687926602602_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=V25GjAlwwC8AX9niS-5&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfDPfwLYXf5pzuZ2dA7_u0ceonMQqM1tX5UVFdaAl97c6Q&oe=657A4213',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/403170171_1011495719935999_306095610166371448_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=-JDMYVbJp5EAX9b_5y0&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfCpn_MxYLhbtoDhIHwv-NggPPV5CH7yYa4ADGUE1f53jA&oe=657A65AB',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/403717417_1011495726602665_7900997241013125519_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=BvqgwWLb9YwAX_3uGtL&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfAmfdY4fd4RhuZTt1lKx3ZpYyWRywukSqGjlA7KuMpv5w&oe=657B1A76',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/403155918_1011495626602675_8297722053895369376_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=UE3z0zh1F0gAX8OSp53&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfDjTqK3SmA6aQxWyPTX1U4LNlRjNwhyqk2X2mFB0b_hSw&oe=657B78F9',
    'https://scontent.ftlv19-2.fna.fbcdn.net/v/t39.30808-6/403725270_1011495669936004_2598338113921723447_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=R990VHyEZysAX9t_oNW&_nc_ht=scontent.ftlv19-2.fna&oh=00_AfDKYrJaJDEUc6FOxDx3i9oM0e-YNUfp5KFaq4CgZuGz4A&oe=657850D3',
    'https://scontent.ftlv19-2.fna.fbcdn.net/v/t39.30808-6/403713937_1011495636602674_8685912819137191999_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=6OLUrKg-lNMAX-OVMm-&_nc_ht=scontent.ftlv19-2.fna&oh=00_AfD-BQHjqRzteDqLvra0oIgsiFyNeUoMEQ3PATOoZUxWRA&oe=65783828',
    'https://scontent.ftlv19-1.fna.fbcdn.net/v/t39.30808-6/405796913_1011495686602669_1727247685080338223_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=FqQEDubIMW0AX_3qYCW&_nc_ht=scontent.ftlv19-1.fna&oh=00_AfAJqM466-JcuTvvmlAG90woFKq7ob4WQwZMRfDKfnA5ew&oe=6578EF50'
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
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/319544670_2334446533399044_7836413977894820304_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=ZRszCFfMHa0AX_TFOgl&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfD7xbyjSgHgYEWv74D9UVBs0Wsk66rzKYi3HP0tMu5BVQ&oe=657AB259',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/319736936_1319867251890628_5292575087120481907_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=9wQabyUB_t8AX8N2tDv&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfB1mvdDqHgyG2LSkIisRl8fGIfCgbLcTJFlNM7Y_dHUqw&oe=657A9F4D',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/320631306_1157536511539433_2229612356430371711_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=AU099xtO6fAAX9cGmpz&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfAg7lm8zmwy5Bkaq4VHaVvS0rWDhv0j5OVPljzXR0dJ9w&oe=657B5EC9',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/320294091_1179648309326956_92245036801179143_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=nrC-tCpOaJEAX94dkcp&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfAA6zS62yHgd7XMxyxFn31FaEkexowpvoka_1EG-DkkMQ&oe=657A246E',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/320005686_3301554150160808_8800759340622737071_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=G4UQoHUtnj4AX8w7syR&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfDs8E496MxUsHuh6JCyej8uWVgphEmE2CIWOyY3B0fcuA&oe=6579A6B7',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/320669073_1045112073551159_8689082408285648676_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=BfsM7BZlbX0AX_vFxUZ&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfAtQVlayM_DxFbjlRb5ePCTFg7fznKy-fV6qjZFLhogZw&oe=657A8F9B',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/319669234_1522484714917981_2025451435745095638_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=sq8BHHHJ8NcAX_6evXo&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfCbenysoqVrdCXcQRilm9lzHVGRJM_6hUx3gn0N_KcOng&oe=657AAC04',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/320389589_572466174878414_6675548429008414952_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=4hQN_q0OfjQAX-hLCs2&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfDGzmjCqw7cIcJYKLDXEzgDDyd-G0LuNagwONjZRXoaLw&oe=657ADF2F',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/320519725_907410690424213_1436345038507972154_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=Q92HzNCXl-gAX-8HS7K&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfBlXXdPPw3fDiXsITGSuowfv57jBCqIv2nL066wszTIxw&oe=657A972A',
    'https://scontent.fsdv2-1.fna.fbcdn.net/v/t39.30808-6/320080648_847815176544346_5023572296604230546_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=OOUgEnz0nOAAX9ZAu54&_nc_ht=scontent.fsdv2-1.fna&oh=00_AfCeEohTv1iX5Wy96hIEmxo0pAmVRdhcS3jtX9uD3ymHiw&oe=6579F586',
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
    const barcodeDialog = document.getElementById('barcode-dialog');
    const clickedElement = event.target;

    if (!clickedElement.alt=="Scan" || clickedElement.alt == undefined) {
        // Clicked outside the open dialog
        document.getElementById('barcode-dialog').style.transform = 'translateY(100%)';
    }
});

// Prevent clicks inside the dialog from closing it
document.getElementById('barcode-dialog').addEventListener('click', function(event) {
    event.stopPropagation();
});