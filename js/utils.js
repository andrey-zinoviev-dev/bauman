const mainContainer = document.querySelector('.main');
const footerButtons = Array.from(document.querySelectorAll('.footer__list-element'));
const scrollButton = document.querySelector('.content__button');
const footer = document.querySelector('.footer');
const footerLeftOffset = footer.offsetLeft;
const footerTopOffset = footer.offsetTop;

const rotateDegree = 15;
const perspective = 500;
let scrollParameter = 0;
// const footerListOffset = footer.querySelector('.footer__list').offsetLeft;
// console.log(footerListOffset);

function showMouseEvent(logo, evt) {
  // if(evt.target.classList.contains('footer__list-element-logo')) {
  //   return;
  // }
  const logoHeight = logo.clientHeight;
  const logoWidth = logo.clientWidth;
  const logoXCoordinate = evt.pageX - footerLeftOffset - logo.offsetLeft - logoWidth/2;
  const logoYCoordinate = evt.pageY - footerTopOffset - logo.offsetTop - logoHeight/2;
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