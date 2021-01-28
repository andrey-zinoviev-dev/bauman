class Picture {
    constructor(imageTemplateSelector, service, link) {
        this._imageTemplateSelector = imageTemplateSelector;
        this.service = service;
        this.link = link;
    }
    _getImageTemplate() {
        const imageTemplate = document.querySelector(this._imageTemplateSelector).content.querySelector('.slide').cloneNode(true);
        return imageTemplate;
    }
    _setEventListener() {
        this._element.addEventListener('click', () => {
            console.log('link is clicked');
        })
    }
    _fillTemplate() {
        this._element = this._getImageTemplate();
        this._element.querySelector('.slide__img').src = this.link;
        this._element.querySelector('.slide__span').textContent = this.service;
        return this._element;
    }
}