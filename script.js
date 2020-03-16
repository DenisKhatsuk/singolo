window.onload = function() {
  addSelectedStateToItemOnClick('navigation', 'navigation__link', 'navigation__link_active');
  addSelectedStateToItemOnClick('tags', 'tag__link', 'tag_active');
  addSelectedStateToItemOnClick('portfolio__body', 'portfolio__item', 'portfolio__item_active');

  addPortfolioTagsHandler();
}

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

