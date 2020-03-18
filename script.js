window.onload = function() {
  addSelectedStateToItemOnClick('navigation', 'navigation__link', 'navigation__link_active');
  addSelectedStateToItemOnClick('tags', 'tag__link', 'tag_active');
  addSelectedStateToItemOnClick('portfolio__body', 'portfolio__item', 'portfolio__item_active');

  addPortfolioTagsHandler();

  interactiveHomePhoneButton('iphone-1');
  interactiveHomePhoneButton('iphone-2');
  interactiveHomePhoneButton('iphone-3');

  activateSlider('slider', 'slider__slide');

  addFormHandler('contact-form', 'modal-overlay', 'modal-overlay_hidden');
}

// Common functions

function addSelectedStateToItemOnClick(parentClass, itemClass, activeClass) {

  let parent = document.getElementsByClassName(parentClass)[0];
  let items = parent.getElementsByClassName(itemClass);

  parent.addEventListener('click', function(event){
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove(activeClass);
    }
    if (event.target.classList.contains(itemClass)) {
      event.target.classList.add(activeClass);
    } else {
      event.target.closest(`[class^=${itemClass}`).classList.add(activeClass);
    }
  }, false);

}

// Portfolio related functions

function hideAllItemsWithClass(parentClass, itemClass, hiddenClass) {
  let parent = document.getElementsByClassName(parentClass)[0];
  let items = parent.getElementsByClassName(itemClass);
  for (let i = 0; i < items.length; i++) {
    items[i].classList.add(hiddenClass);
  }
}

function showItemsWithActiveTagName(event, parentClass, itemClass, hiddenClass) {
  let parent = document.getElementsByClassName(parentClass)[0];
  let items = parent.getElementsByClassName(itemClass);
  let clickedTag = event.target.innerText;
  let itemsSelected = parent.querySelectorAll(`[data-tags*='${clickedTag}']`);
  if (clickedTag == 'All' || clickedTag == '') {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove(hiddenClass);
    }
  } else {
    for (let i = 0; i < itemsSelected.length; i++) {
      itemsSelected[i].classList.remove(hiddenClass);
    }
  }
}

function addPortfolioTagsHandler() {
  let portfolioTags = document.getElementsByClassName('tags')[0];
  portfolioTags.addEventListener('click', function(event){
    hideAllItemsWithClass('portfolio__body', 'portfolio__item', 'portfolio__item_hidden');
    showItemsWithActiveTagName(event, 'portfolio__body', 'portfolio__item', 'portfolio__item_hidden');  
  }, false);
}

// Slider related functions

function interactiveHomePhoneButton(parentId) {
  let parent = document.getElementById(parentId);
  let homeButton = parent.getElementsByClassName('iphone-home-img')[0];
  let screenImage = parent.getElementsByClassName('iphone__background')[0];
  homeButton.addEventListener('click',function(){
    screenImage.classList.toggle('iphone__background_hidden');
  }, false);
}

function activateSlider(sliderClass, slideClass) {
  let slider = document.getElementsByClassName(sliderClass)[0];
  let slides = slider.getElementsByClassName(slideClass);
  let currentSlide = 0;
  let isEnabled = true;
  arrowClickHandler();

  function changeCurrentSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
  }

  function hideSlide(direction) {
    isEnabled = false;
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener('animationend', function() {
      this.classList.remove('slider__slide_active', direction);
    },false);
  }

  function showSlide(direction) {
    slides[currentSlide].classList.add('slider__slide_next', direction);
    slides[currentSlide].addEventListener('animationend', function() {
      this.classList.remove('slider__slide_next', direction);
      this.classList.add('slider__slide_active');
      isEnabled = true;
    },false);
  }

  function nextSlide(n) {
    hideSlide('slide-to-left');
    changeCurrentSlide(n + 1);
    showSlide('slide-from-right');
  }

  function previousSlide(n) {
    hideSlide('slide-to-right');
    changeCurrentSlide(n - 1);
    showSlide('slide-from-left');
  }

  function arrowClickHandler() {
    let arrowNext = slider.getElementsByClassName('slider_arrow-next')[0];
    let arrowPrev = slider.getElementsByClassName('slider_arrow-prev')[0];
    arrowNext.addEventListener('click', function(){
      if (isEnabled) {
        nextSlide(currentSlide);
      }
    }, false);
    arrowPrev.addEventListener('click', function(){
      if (isEnabled) {
        previousSlide(currentSlide);
      }
    }, false);
  }
}

// Modal window 

function showModal(modalOverlayClass, modalOverlayHiddenClass) {
  let overlayWrapper = document.getElementsByClassName(modalOverlayClass)[0];
  overlayWrapper.classList.remove(modalOverlayHiddenClass);
}

function hideModal(modalOverlayClass, modalOverlayHiddenClass) {
  let overlayWrapper = document.getElementsByClassName(modalOverlayClass)[0];
  overlayWrapper.classList.add(modalOverlayHiddenClass);
}

function getDataFromForm(formClass) {
  let form = document.getElementsByClassName(formClass)[0];
  let subjectText = form.querySelector('[name="subject"]').value;
  let descriptionText = form.querySelector('[name="message"]').value;
  let data = {
    subject: subjectText,
    description: descriptionText,
  };
  return data;
}

function showFormDataInModal(modalOverlayClass) {
  let data = getDataFromForm('contact-form');
  let overlayWrapper = document.getElementsByClassName(modalOverlayClass)[0];
  let title = 'The letter was sent';
  let subject = data.subject != '' ? 'Subject: ' + data.subject : 'Without subject';
  let description = data.description != '' ? 'Description: ' + data.description : 'Without description';
  let titleEl = overlayWrapper.getElementsByClassName('submit-message__title')[0];
  let subjectEl = overlayWrapper.getElementsByClassName('submit-message__subject')[0];
  let descriptionEl = overlayWrapper.getElementsByClassName('submit-message__description')[0];
  titleEl.innerText = title;
  subjectEl.innerText = subject;
  descriptionEl.innerText = description;
}

function addFormHandler(formClass, modalOverlayClass, modalOverlayHiddenClass) {
  let form = document.getElementsByClassName(formClass)[0];
  let overlayWrapper = document.getElementsByClassName(modalOverlayClass)[0];
  let buttonSubmit = form.getElementsByTagName('button')[0];
  let buttonModal = overlayWrapper.getElementsByTagName('button')[0];
  buttonSubmit.addEventListener('click', function(e){
    e.preventDefault();
    showFormDataInModal(modalOverlayClass);
    showModal(modalOverlayClass, modalOverlayHiddenClass);
  }, false);
  buttonModal.addEventListener('click', function(e){
    hideModal(modalOverlayClass, modalOverlayHiddenClass);
  }, false);
}