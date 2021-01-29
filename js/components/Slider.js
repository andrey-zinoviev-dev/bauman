class Slider {
    constructor(sliderSelector, counter, templateSelector) {
        this.sliderSelector = document.querySelector(sliderSelector);
        this.counter = counter;
        this.templateSelector = document.querySelector(templateSelector);
    }
    _getTemplate() {
        const sliderTemplate = this.templateSelector.content.cloneNode(true);
        return sliderTemplate;
    }
    addItem(element) {
        this.sliderSelector.querySelector('.container').append(element);
    }
    _setEventListeners() {
        this.sliderSelector.querySelector('.slider__left').addEventListener('click', () => {
            // console.log(this.element.querySelector('.slides__slide').clientWidth);
            this.sliderSelector.querySelector('.container').style.transform = `translateX(${1280 * this.counter}px)`;
        });
        this.sliderSelector.querySelector('.slider__right').addEventListener('click', () => {
            // console.log(this.element.querySelector('.slides__slide').clientWidth);
            this.sliderSelector.querySelector('.container').style.transform = `translateX(${-1280 * this.counter}px)`;
        });   
    }
    generateSlider() {
        this.element = this._getTemplate();
        this._setEventListeners();
        return this.element;
    }
}