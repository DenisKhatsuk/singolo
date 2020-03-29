window.onload = function() {
  addSelectedStateToItemOnClick('.tags', '.tag__link', '.tag_active');
  addSelectedStateToItemOnClick('.portfolio__body', '.portfolio__item', '.portfolio__item_active');

  portfolioShuffle('.portfolio__body', '.portfolio__item');

  interactiveHomePhoneButton('#iphone-1');
  interactiveHomePhoneButton('#iphone-2');
  interactiveHomePhoneButton('#iphone-3');

  activateSlider('.slider', '.slider__slide');

  addFormHandler('.contact-form', '.modal-overlay', '.modal-overlay_hidden');

  pageScrollHandler();
  asideNavigationHandler();
}

// Common functions

function addSelectedStateToItemOnClick(parentClass, itemClass, activeClass) {
  let parent = document.querySelector(parentClass);
  let items = parent.querySelectorAll(itemClass);

  parentClass = parentClass.substring(1);
  itemClass = itemClass.substring(1);
  activeClass = activeClass.substring(1);

  parent.addEventListener('click', function(event){
    items.forEach(function(el) {
      el.classList.remove(activeClass);
    })
    if (event.target.classList.contains(itemClass)) {
      event.target.classList.add(activeClass);
    } else if (event.target.closest(`[class^=${itemClass}`)) {
      event.target.closest(`[class^=${itemClass}`).classList.add(activeClass);
    }
  }, false);
}

// Page scroll handler for main menu 

function pageScrollHandler() {
  document.addEventListener('scroll', onScroll, false);
  function onScroll() {
    let currentScrollPosition = window.scrollY;
    let sections = document.querySelectorAll('main > section');
    let mainMenuItems = document.querySelectorAll('.navigation .navigation__link');
    let asideMenuItems = document.querySelectorAll('.aside-navigation .aside-navigation__link');
    sections.forEach(function(section) {
      if (section.offsetTop - 95 <= currentScrollPosition && (section.offsetTop + section.offsetHeight) > currentScrollPosition) {
        mainMenuItems.forEach(function(item) {
          item.classList.remove('navigation__link_active');
          if (section.getAttribute('class') === item.getAttribute('href').substring(1)) {
            item.classList.add('navigation__link_active');  
          };
        });
        asideMenuItems.forEach(function(item) {
          item.classList.remove('aside-navigation__link_active');
          if (section.getAttribute('class') === item.getAttribute('href').substring(1)) {
            item.classList.add('aside-navigation__link_active');  
          };
        });
      }
    });
  }
}

// Slider related functions

function interactiveHomePhoneButton(parentId) {
  let parent = document.querySelector(parentId);
  let homeButton = parent.querySelector('.iphone-home-img');
  let screenImage = parent.querySelector('.iphone__background');
  homeButton.addEventListener('click',function(){
    screenImage.classList.toggle('iphone__background_hidden');
  }, false);
}

function activateSlider(sliderClass, slideClass) {
  let slider = document.querySelector(sliderClass);
  let slides = slider.querySelectorAll(slideClass);
  let currentSlide = 0;
  let isEnabled = true;

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
    let arrowNext = slider.querySelector('.slider__nav_next');
    let arrowPrev = slider.querySelector('.slider__nav_prev');
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

  arrowClickHandler();
}

// Portfolio related functions
function portfolioShuffle(portfolioClass, itemClass) {
  let portfolio = document.querySelector(portfolioClass);
  let portfolioTags = document.querySelector('.portfolio__tags .tags');
  
  function getPortfolioItems(portfolio, itemClass) {
    let items = portfolio.querySelectorAll(itemClass);
    let itemsArray = [];
    items.forEach(function(el) {
      itemsArray.push(el);
    })
    return itemsArray;
  }

  function removeAllItemsFromPortfolio(portfolio) {
    portfolio.innerHTML = '';  
  };

  function randomIndex(itemsLength) {
    return Math.floor(Math.random() * itemsLength);
  }

  function addPortfolioItemsInRandomOrder(portfolio, items) {
    let itemsLength = items.length;
    while (itemsLength > 0) {
      let index = randomIndex(itemsLength);
      portfolio.appendChild(items[index]);
      items.splice(index, 1);
      itemsLength--;
    }
  }

  portfolioTags.addEventListener('click', function(){
    let items = getPortfolioItems(portfolio, itemClass);
    removeAllItemsFromPortfolio(portfolio);
    addPortfolioItemsInRandomOrder(portfolio, items);
  }, false);  
}

// Modal window 

function addFormHandler(formClass, modalOverlayClass, modalOverlayHiddenClass) {
  let form = document.querySelector(formClass);
  let overlayWrapper = document.querySelector(modalOverlayClass);
  let buttonSubmit = form.querySelector('button');
  let buttonModal = overlayWrapper.querySelector('button');

  function showModal(overlayWrapper, modalOverlayHiddenClass) {
    overlayWrapper.classList.remove(modalOverlayHiddenClass.substring(1));
  }

  function hideModal(overlayWrapper, modalOverlayHiddenClass) {
    overlayWrapper.classList.add(modalOverlayHiddenClass.substring(1));
  }

  function getDataFromForm(form) {
    let subjectText = form.querySelector('[name="subject"]').value.toString();
    let descriptionText = form.querySelector('[name="message"]').value.toString();
    let data = {
      subject: subjectText,
      description: descriptionText,
    };
    return data;
  }

  function showFormDataInModal(overlayWrapper, form) {
    let data = getDataFromForm(form);
    let title = 'The letter was sent';
    let subject = data.subject != '' ? 'Subject: ' + data.subject : 'Without subject';
    let description = data.description != '' ? 'Description: ' + data.description : 'Without description';
    let titleEl = overlayWrapper.querySelector('.submit-message__title');
    let subjectEl = overlayWrapper.querySelector('.submit-message__subject');
    let descriptionEl = overlayWrapper.querySelector('.submit-message__description');
    titleEl.innerText = title;
    subjectEl.innerText = subject;
    descriptionEl.innerText = description;
  }

  function checkRequiredFormFields(form) {
    let requiredFields = form.querySelectorAll('[required]');
    let fieldsAreNotEmpty = true;
    requiredFields.forEach(function(field) {
      if (field.value == '') {
        fieldsAreNotEmpty = false;
      } 
    });
    return fieldsAreNotEmpty;
  }

  function validateEmailFormField(form) {
    let emailField = form.querySelector('[name = email]');
    isValid = emailField.value.includes('@') ? true : false;
    return isValid;
  }

  function resetFormFields(form) {
    let formField = form.querySelectorAll('input, textarea');
    formField.forEach(function(el) {
      el.value = '';
    });  
  }

  buttonSubmit.addEventListener('click', function(e){
    if (checkRequiredFormFields(form) && validateEmailFormField(form)) {
      e.preventDefault();
      showFormDataInModal(overlayWrapper, form);
      showModal(overlayWrapper, modalOverlayHiddenClass);
    }
  }, false);
  buttonModal.addEventListener('click', function(e){
    resetFormFields(form);
    hideModal(overlayWrapper, modalOverlayHiddenClass);
  }, false);
}

// Aside navigation

function asideNavigationHandler() {
  let asideButton = document.querySelector('.mobile-menu-icon');
  let asidePanel = document.querySelector('.aside-panel');
  let isClosed = true;
  let asideMenu = document.querySelector('.aside__navigation');
  asideMenu.addEventListener('click', function(e) {
    asidePanel.classList.remove('aside-panel_open');
    asideButton.classList.remove('mobile-menu-icon_open');
    isClosed = true;
  }, false);
  asideButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (isClosed) {
      asideButton.classList.add('mobile-menu-icon_open');
      asidePanel.classList.add('aside-panel_open');
      isClosed = false;
    } else {
      asidePanel.classList.remove('aside-panel_open');
      asideButton.classList.remove('mobile-menu-icon_open');
      isClosed = true;
    }
  }, false);
}