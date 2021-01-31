class Slider {
    constructor(sliderSelector, counter, picsLength, templateSelector) {
        this.sliderSelector = document.querySelector(sliderSelector);
        this.counter = counter;
        this.picsLength = picsLength;
        this.templateSelector = document.querySelector(templateSelector);
    }
    _getTemplate() {
        const sliderTemplate = this.templateSelector.content.cloneNode(true);
        return sliderTemplate;
    }
    addItem(element) {
        this.sliderSelector.querySelector('.slider__wrapper').append(element);
    }
    setCounterToZero() {
        if(this.counter >= this.picsLength - 1) {
            this.counter = -1;
        }
    }
    setCounterToLastNumber() {
        if(this.counter <= 0) {
            this.counter = this.picsLength;
        }
    }
    _setEventListeners() {
        this.sliderSelector.querySelector('.slider__left').addEventListener('click', () => {
            // console.log(this.element.querySelector('.slides__slide').clientWidth);
            // if(this.counter <= 0) {
            //     this.counter = this.picsLength;
            // }
            this.setCounterToLastNumber();
            this.counter -=1;
            this.sliderSelector.querySelector('.slider__wrapper').style.transform = `translateX(${-1280 * this.counter}px)`;
        });
        this.sliderSelector.querySelector('.slider__right').addEventListener('click', () => {
            // console.log(this.element.querySelector('.slides__slide').clientWidth);
            // if(this.counter >= this.picsLength - 1) {
            //     this.counter = -1;
            // }
            this.setCounterToZero();
            this.counter +=1;
            this.sliderSelector.querySelector('.slider__wrapper').style.transform = `translateX(${-1280 * this.counter}px)`;
        });   
        
    }
    autoChangePic() {
        // if(this.counter >= this.picsLength - 1) {
        //     this.counter = -1;
        // }
        this.setCounterToZero();
        this.counter +=1;
        this.sliderSelector.querySelector('.slider__wrapper').style.transform = `translateX(${-1280 * this.counter}px)`;
        setTimeout(() => {
            this.autoChangePic();
        }, 3000)
    }
    generateSlider() {
        this.element = this._getTemplate();
        this._setEventListeners();
        return this.element;
    }
}