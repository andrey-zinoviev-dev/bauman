footerButtons.forEach((button) => {
  button.addEventListener('mousemove', (evt) => {
    showMouseEvent(button, evt);
  });
  button.addEventListener('mouseleave', hideMouseEvent);
});

// scrollButton.addEventListener('click',() => {
//   mainContainer.scrollLeft = -750;
// })

window.addEventListener('wheel', (evt) => {
  
  const amountToScroll = - evt.wheelDelta*1;
  // if(scrollParameter <= 0) {
  //   if(amountToScroll)
  // }
  if(scrollParameter >= mainContainer.clientWidth) {

    if (amountToScroll > 0) {
      return;
    }

    // return scrollParameter = scrollParameter + amountToScroll;

  } 

  if(scrollParameter <= 0) {

    if (amountToScroll < 0) {
      return;
    }
    
  }
    scrollParameter = scrollParameter + amountToScroll;
  
  mainContainer.scrollTo({left: scrollParameter, behavior: "smooth"})
  evt.preventDefault();
}, {passive: false})