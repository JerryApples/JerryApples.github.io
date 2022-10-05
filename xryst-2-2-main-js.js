const menuButton = document.querySelector('.popup-menu-button');
const popUpMenu = document.querySelector('.popup-menu');
const popUpMenuOptions = document.getElementsByClassName('popup-a');
const seemoreButton = document.querySelector('.seemore');
const galleryLayout = document.querySelector('.gallery-layout');
const buttonText = document.querySelector('.button-text');
const buttonArrow = document.querySelector('.arrow');
const contact = document.querySelector('.contact');
const contForm1 = document.querySelector('.contact-form-1');
const contForm2 = document.querySelector('.contact-form-2');
const contCont = document.querySelector('.contact-form-container')

function openPopupMenu() {
    document.querySelector('#nav-icon4').classList.toggle('open');
    if (popUpMenu.classList.contains('open-popup')) {
        popUpMenu.classList.remove('open-popup');
    }
    else {
        popUpMenu.classList.add('open-popup');
    }
};

menuButton.addEventListener('click', openPopupMenu);

for (i=0; i < popUpMenuOptions.length; i++) {
    popUpMenuOptions[i].addEventListener('click', openPopupMenu);
};

function openGallery() {
    if (galleryLayout.classList.contains('show-gallery')) {
        galleryLayout.classList.remove('show-gallery');
        buttonText.textContent = 'See More';
    }
    else {
        galleryLayout.classList.add('show-gallery');
        buttonText.textContent = 'See Less';
    }
}

seemoreButton.addEventListener('click', openGallery);

function openContactForm() {
    if (contForm1.style.transform = 'translateY(-90vh)') {
        contForm1.style.transform = 'translateY(0)';
        contForm2.style.transform = 'translateY(0)';
    }
}

contact.addEventListener('click', openContactForm); 

