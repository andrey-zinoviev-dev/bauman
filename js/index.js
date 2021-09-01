//назначение первой кнопки 1 отзыва при загрузке страницы
window.onload = () => {
   let buttons = Array.from(document.querySelectorAll('.reviews__buttons-button'));
   previousButton = buttons[1];
   previousButton.classList.add('reviews__buttons-button_status_active');
};

footerButtons.forEach((button) => {
  button.addEventListener('mousemove', (evt) => {
    showMouseEvent(button, evt);
  });
  button.addEventListener('mouseleave', hideMouseEvent);
});

// scrollButton.addEventListener('click',() => {
//   mainContainer.scrollLeft = -750;
// })

//раскомментировать для горизонтального скролла

// window.addEventListener('wheel', (evt) => {
  
//   const amountToScroll = - evt.wheelDelta*1;
//   // if(scrollParameter <= 0) {
//   //   if(amountToScroll)
//   // }
//   if(scrollParameter >= mainContainer.clientWidth) {

//     if (amountToScroll > 0) {
//       return;
//     }

//     // return scrollParameter = scrollParameter + amountToScroll;

//   } 

//   if(scrollParameter <= 0) {

//     if (amountToScroll < 0) {
//       return;
//     }
    
//   }
//     scrollParameter = scrollParameter + amountToScroll;
  
//   mainContainer.scrollTo({left: scrollParameter, behavior: "smooth"})
//   evt.preventDefault();
// }, {passive: false});

//отрисовка кнопок отзывов
reviews.forEach((review, i, array) => {
  // const buttonTemplate = reviewButtonTemplate;
  const button = generateTemplate(reviewButtonTemplate, '.reviews__buttons-button');
  reviewButtonsWrapper.append(button);
  button.addEventListener('click', clickThumbnail(button, i));
  // reviewButtonsWrapper.append(buttonTemplate);
});

//перекючение отзывов по радиальным кнопкам
// reviewsThumbnails.forEach((thumbnail) => {
//   console.log(thumbnail);
//   thumbnail.addEventListener('click', clickThumbnail(thumbnail));
// })
//кнопки для прокрутки отзывов

arrowButtonLeft.addEventListener('click', translateReviewsLeft);
arrowButtonRight.addEventListener('click', translateReviewsRight);

reviewsContainer.addEventListener('touchstart', initiateTouchMovement);
reviewsContainer.addEventListener('touchmove', continueTouchMovement);
reviewsContainer.addEventListener('touchend', finishTouchMovement);

//обработчики перетагивания (drag-n-drop)
// reviewsContainer.addEventListener('mousedown', dragInitiated);
// reviewsContainer.addEventListener('mousemove', dragInProcess);
// reviewsContainer.addEventListener('mouseup', dragFinish);

//обработчики попапа
openButtons.forEach((button, i) => {
  // console.log(button);
  if(i === 0) {
   return button.addEventListener('click', openPopup(firstPopup));
  }
  if(i === 1) {
    return button.addEventListener('click', openPopup(registerPopup));
  }

  // button.addEventListener('click', openPopup(button));
});

popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__button-close');
  const overlay = popup.querySelector('.popup__overlay');
  closeButton.addEventListener('click', closePopup(popup));
  overlay.addEventListener('click', closePopup(popup));
})
