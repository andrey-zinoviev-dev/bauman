const mainContainer = document.querySelector('.main');
const footerButtons = Array.from(document.querySelectorAll('.footer__list-element'));
const scrollButton = document.querySelector('.content__button');
const footer = document.querySelector('.footer');
const footerList = footer.querySelector('.footer__list');

const footerLeftOffset = footer.offsetLeft;
const footerTopOffset = footer.offsetTop;
const footerListTopOffset = footerList.offsetTop;

const rotateDegree = 15;
const perspective = 500;
let scrollParameter = 0;
// const footerListOffset = footer.querySelector('.footer__list').offsetLeft;
// console.log(footerListOffset);

// const arrowButtons = Array.from(document.querySelectorAll('.reviews__button'));
const arrowButtonLeft = document.querySelector('.reviews__button_type_left');
const arrowButtonRight = document.querySelector('.reviews__button_type_right');
const reviewsSection = document.querySelector('.reviews');
const reviewSectionScroll = reviewsSection.querySelector('.reviews__scroll');
const reviewsContainer = reviewsSection.querySelector('.reviews__wrapper');
const reviews = Array.from(reviewsSection.querySelectorAll('.reviews__review'));

const firstMainButton = document.querySelector('.content__button_first');
const secondMainButton = document.querySelector('.content__button_second'); 
const servicesSection = mainContainer.querySelector('.services');
// кнопки отзывов
const reviewButtonsWrapper = reviewsSection.querySelector('.reviews__buttons');
const reviewButtonTemplate = document.querySelector('#reviews-thumbnail');

// кнопки под отзывами
const reviewsThumbnailsDiv = document.querySelector('.reviews__buttons');


let firstReviewOffset = 0;
let previousReviewOffset = 0;
let currentReviewOffset = 0;
let followingReviewOffset = 0;
let reviewOrder = 0;

//touch variables
let isTouched = false;
let initialCoord = 0;
let previousTranslate = 0;
let currentTranslate = 0;

//drag variables
let initialDragCoord = 0; 
let movedDragCoord = 0;
let finalDragCoord = 0;
let dragTranslate = 0;
let isDragged = false;
let reviewScroll = 0;

//thumbnails variables
let previousButton = null;
let currentButton;

//попапы и их переменные
const overallContainer = document.querySelector('.overall-container');
const popups = Array.from(document.querySelectorAll('.popup'));
const firstPopup = document.querySelector('.popup');
const registerPopup = document.querySelector('.popup_register');

// const popup = document.querySelector('.popup');
const openButtons = Array.from(document.querySelectorAll('.header__services-list-element-button'));
// const popupCloseButton = document.querySelector('.popup__button-close');

reviews.forEach((child, i, array) => {
  if(i < 0) {
    return;
  }
  if(i > array.length - 1) {
    return;
  }
  if(i === 0) {
    // console.log(array[i + 2]);
    return firstReviewOffset = array[i + 2].offsetLeft - array[i + 1].offsetLeft;
  }
  // console.log(array[i], array[i].offsetLeft - array[i - 1].offsetLeft);
  previousReviewOffset = array[i - 1].offsetLeft;
  followingReviewOffset = array[i].offsetLeft;
  currentReviewOffset = followingReviewOffset - previousReviewOffset;
});

function showMouseEvent(logo, evt) {
  // if(evt.target.classList.contains('footer__list-element-logo')) {
  //   return;
  // }
  const logoHeight = logo.clientHeight;
  const logoWidth = logo.clientWidth;
  
  const logoXCoordinate = evt.pageX - footerLeftOffset - logo.offsetLeft - logoWidth/2;
  const logoYCoordinate = evt.pageY - footerTopOffset - footerListTopOffset - logo.offsetTop - logoHeight/2;
  
  const rotateX = rotateDegree*logoYCoordinate/(logoHeight/2);
  const rotateY = rotateDegree*logoXCoordinate/(logoWidth/2);
  // console.log(logoXCoordinate, logoYCoordinate);
  // console.log(evt.target.offsetLeft);
  // console.log(evt.pageX - footerLeftOffset - evt.target.offsetLeft - logoWidth/2, evt.pageY - footerTopOffset - evt.target.offsetTop - logoHeight/2);
  activateTiltEffect(rotateX, rotateY, logo);
};

function hideMouseEvent(evt) {
  deactivateTiltEffect(evt.target);
};

function activateTiltEffect(rotateX, rotateY, element) {
  // console.log(xCoordinate, yCoordinate);
  element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
}

function deactivateTiltEffect(element) {
  element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
  element.style.transition = 'transform 0.25s ease-in-out';
  setTimeout(() => {
    element.style.transition = 'none';
  }, 250);
}

function translateReviewsLeft() {
  previousButton = reviewsThumbnailsDiv.children[reviewOrder + 1];
  reviewOrder -= 1;
  
  if(reviewOrder < - 1) {
    reviewOrder = reviews.length - 2;
  }
  switchThumbnail(reviewOrder);
  return reviewsContainer.style.transform = `translateX(${-currentReviewOffset * reviewOrder}px)`;
}

function translateReviewsRight() {
  previousButton = reviewsThumbnailsDiv.children[reviewOrder + 1];
  reviewOrder += 1;
  
  if(reviewOrder >= reviews.length - 1) {
    reviewOrder = -1;
    // return reviewsContainer.style.transform = `translateX(${currentReviewOffset})`
  }
  switchThumbnail(reviewOrder);
  return reviewsContainer.style.transform = `translateX(${-currentReviewOffset * reviewOrder}px)`;
}

//touch functions
function initiateTouchMovement(evt) {
  // console.log('move is started');
  isTouched = true;
  initialCoord = evt.touches[0].clientX;
}

function continueTouchMovement(evt) {
  if(isTouched) {
    currentTranslate = evt.touches[0].clientX - initialCoord + previousTranslate;
    reviewsContainer.style.transform = `translateX(${currentTranslate}px)`;
    if(reviewOrder <= -1) {
      // isTouched = false;
      if(currentTranslate > previousTranslate) {
        isTouched = false;
      }
    }
    if(reviewOrder >= reviews.length - 2) {
      // isTouched = false
      if(currentTranslate < previousTranslate) {
        isTouched = false;
      }
    }
  }
}

function finishTouchMovement() {
  isTouched = false;
  const movedBy = currentTranslate - previousTranslate;
  if(movedBy < - 100) {
    reviewOrder += 1;

  }
  if(movedBy > 100) {
    reviewOrder -= 1;
    
  }
  currentTranslate = reviewOrder * -currentReviewOffset;
  previousTranslate = currentTranslate;
  reviewsContainer.style.transform = `translateX(${currentTranslate}px)`;
};

//фукнции для перетягивания контейнера с отзывами (drag-n-drop)
function dragInitiated(evt) {
  reviewsContainer.style.cursor = 'grabbing';
  initialCoord = evt.clientX;
  isDragged = true;
  reviewScroll = reviewSectionScroll.scrollLeft;
  // return reviewsContainer.addEventListener('mousemove', dragInProcess);
}

function dragInProcess(evt) {
  if(!isDragged) {
    return;
  }
  movedDragCoord = evt.clientX;
  dragTranslate = movedDragCoord - initialCoord;
  reviewSectionScroll.scrollLeft = -dragTranslate + reviewScroll;
  // return moveResult;
}

function dragFinish() {
  isDragged = false;
  reviewsContainer.style.cursor = 'grab';
  // return reviewsContainer.style.transform = `translateX(${dragTranslate}px)`;
  // reviewsContainer.removeEventListener('mousemove', dragInProcess);
  // return finalDragCoord = movedDragCoord - initialCoord + dragTranslate;
}

// function dragContainer(pixels) {
//   return reviewsContainer.style.transform = `translateX(${pixels}px)`;
// }

function generateTemplate(element, selector) {
  const template = element.content.cloneNode(true).querySelector(selector);
  return template;
}

function switchThumbnail(i) {
  const button = reviewsThumbnailsDiv.children[i + 1];
  button.classList.add('reviews__buttons-button_status_active');
  previousButton.classList.remove('reviews__buttons-button_status_active');
  previousButton = button;
  // console.log(evt.target);
}

function clickThumbnail(button, i) {
  return () => {
    
    currentButton = button;
    currentButton.classList.add('reviews__buttons-button_status_active');

    previousButton.classList.remove('reviews__buttons-button_status_active');
    previousButton = button;

    reviewOrder = i - 1;
    return reviewsContainer.style.transform = `translateX(${-currentReviewOffset * reviewOrder}px)`;
  }
}

function openPopup (popup) {
  // console.log(button);
  return () => {
    popup.classList.add('popup_opened');
    overallContainer.classList.add('overall-container_blurred');
    // console.log(button);
  };
}

function closePopup (popupSection) {
  return() => {
    popupSection.classList.remove('popup_opened');
    overallContainer.classList.remove('overall-container_blurred');
  };
}

//прокручивание по нажатию на кнопку
function scrollToSection(section) {
  return () => {
    window.scrollTo({top: section.offsetTop, behavior: "smooth"});
  };
}