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
const sendMessage = document.querySelector('.msg');
const viewer = document.querySelector('.img-viewer');
const galleryImgs = document.querySelectorAll('.gall-img');
const buttonRight = document.querySelector('.right-button');
const buttonLeft = document.querySelector('.left-button');
const imgCont = document.querySelector('.img-viewer-img-container-inner');

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

sendMessage.addEventListener('click', openContactForm);

function openImgViewer() {
    if (viewer.style.display === 'flex') {
        viewer.style.display = "none";
    }
    else {
        viewer.style.display = 'flex';
        imgCont.style.marginLeft = '700vw';
    }
};

function openImgViewerForEachImg() {
    for (let i = 0; i < galleryImgs.length; i++) {
        galleryImgs[i].addEventListener('click', openImgViewer);     
    }
};

openImgViewerForEachImg();

document.querySelector('.close-viewer').addEventListener('click', openImgViewer);

function imgContButtonMoveRight() {
    switch (imgCont.style.marginLeft) {
        case '700vw':
            imgCont.style.marginLeft = '630vw';
            break;
        case '630vw':
            imgCont.style.marginLeft = '560vw';
            break;
        case '560vw':
            imgCont.style.marginLeft = '490vw';
            break;
        case '490vw':
            imgCont.style.marginLeft = '420vw';
            break;
        case '420vw':
            imgCont.style.marginLeft = '350vw';
            break;
        case '350vw':
            imgCont.style.marginLeft = '280vw';
            break;
        case '280vw':
            imgCont.style.marginLeft = '210vw';
            break;
        case '210vw':
            imgCont.style.marginLeft = '140vw';
            break;
        case '140vw':
            imgCont.style.marginLeft = '70vw';
            break;
        case '70vw':
            imgCont.style.marginLeft = '0vw';
            break;
        case '0vw':
            imgCont.style.marginLeft = '-70vw';
            break;
        case '-70vw':
            imgCont.style.marginLeft = '-140vw';
            break;
        case '-140vw':
            imgCont.style.marginLeft = '-210vw';
            break;
        case '-210vw':
            imgCont.style.marginLeft = '-280vw';
            break;
        case '-280vw':
            imgCont.style.marginLeft = '-350vw';
            break;
        case '-350vw':
            imgCont.style.marginLeft = '-420vw';
            break;
        case '-420vw':
            imgCont.style.marginLeft = '-490vw';
            break;
        case '-490vw':
            imgCont.style.marginLeft = '-560vw';
            break;
        case '-560vw':
            imgCont.style.marginLeft = '-630vw';
            break;
        case '-630vw':
            imgCont.style.marginLeft = '-700vw';
            break;
        case '-700vw':
            imgCont.style.marginLeft = '-700vw';
            break;
    }
}

function imgContButtonMoveLeft() {
    switch (imgCont.style.marginLeft) {
        case '-700vw':
            imgCont.style.marginLeft = '-630vw';
            break;
        case '-630vw':
            imgCont.style.marginLeft = '-560vw';
            break;
        case '-560vw':
            imgCont.style.marginLeft = '-490vw';
            break;
        case '-490vw':
            imgCont.style.marginLeft = '-420vw';
            break;
        case '-420vw':
            imgCont.style.marginLeft = '-350vw';
            break;
        case '-350vw':
            imgCont.style.marginLeft = '-280vw';
            break;
        case '-280vw':
            imgCont.style.marginLeft = '-210vw';
            break;
        case '-210vw':
            imgCont.style.marginLeft = '-140vw';
            break;
        case '-140vw':
            imgCont.style.marginLeft = '-70vw';
            break;
        case '-70vw':
            imgCont.style.marginLeft = '0vw';
            break;
        case '0vw':
            imgCont.style.marginLeft = '70vw';
            break;
        case '70vw':
            imgCont.style.marginLeft = '140vw';
            break;
        case '140vw':
            imgCont.style.marginLeft = '210vw';
            break;
        case '210vw':
            imgCont.style.marginLeft = '280vw';
            break;
        case '280vw':
            imgCont.style.marginLeft = '350vw';
            break;
        case '350vw':
            imgCont.style.marginLeft = '420vw';
            break;
        case '420vw':
            imgCont.style.marginLeft = '490vw';
            break;
        case '490vw':
            imgCont.style.marginLeft = '560vw';
            break;
        case '560vw':
            imgCont.style.marginLeft = '630vw';
            break;
        case '630vw':
            imgCont.style.marginLeft = '700vw';
            break;
        case '700vw':
            imgCont.style.marginLeft = '700vw';
            break;
    }
}

buttonRight.addEventListener('click', imgContButtonMoveRight);
buttonLeft.addEventListener('click', imgContButtonMoveLeft);
