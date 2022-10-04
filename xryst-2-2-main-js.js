const menuButton = document.querySelector('.popup-menu-button');
const popUpMenu = document.querySelector('.popup-menu');
const popUpMenuOptions = document.getElementsByClassName('popup-a');

function openPopupMenu() {
    if (popUpMenu.classList.contains('open-popup')) {
        popUpMenu.classList.remove('open-popup');
    }
    else {
        popUpMenu.classList.add('open-popup');
        querySelector(body).style.overflow = 'hidden';
    }
}

menuButton.addEventListener('click', openPopupMenu);

function hidePopUpMenu() {
    popUpMenu.classList.remove('open-popup');
}

for (i=0; i < popUpMenuOptions.length; i++) {
    popUpMenuOptions[i].addEventListener('click', hidePopUpMenu);
}