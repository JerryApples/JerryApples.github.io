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
const contSection = document.querySelector('.contact-form');
const contForm = document.querySelector('.contact-form-bg');
const header = document.querySelector('header');
const section1 = document.querySelector('.xryst-about');
const section2 = document.querySelector('.xryst-gallery');
const section3 = document.querySelector('.xryst-hero');
const closeButton = document.querySelector('.x');

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
    if (contForm1.classList.contains('open-contact-form')) {
        contCont.style.display = 'none';
        contForm1.classList.remove('open-contact-form');
        contForm2.classList.remove('open-contact-form');
    }
    else {
        contCont.style.display = 'flex';
        contForm1.classList.add('open-contact-form');
        contForm2.classList.add('open-contact-form');
    }
}

function closeForm() {
    contForm1.classList.remove('open-contact-form');
    contForm2.classList.remove('open-contact-form');
    contCont.style.display = 'none';
}

contact.addEventListener('click', openContactForm); 

header.addEventListener('click', closeForm);
section1.addEventListener('click', closeForm);
section2.addEventListener('click', closeForm);
closeButton.addEventListener('click', closeForm);
