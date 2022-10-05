const menuButton = document.querySelector('.popup-menu-button');
const popUpMenu = document.querySelector('.popup-menu');
const popUpMenuOptions = document.getElementsByClassName('popup-a');
const seemoreButton = document.querySelector('.seemore');
const galleryLayout = document.querySelector('.gallery-layout');
const buttonText = document.querySelector('.button-text');
const buttonArrow = document.querySelector('.arrow');

function openPopupMenu() {
    document.querySelector('#nav-icon4').classList.toggle('open');
    if (popUpMenu.classList.contains('open-popup')) {
        popUpMenu.classList.remove('open-popup');
    }
    else {
        popUpMenu.classList.add('open-popup');
        querySelector(body).style.overflow = 'hidden';
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
