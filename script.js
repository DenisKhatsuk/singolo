
function makeActive(parentClass, childrenClass, activeClass) {
  let parent = document.getElementsByClassName(parentClass)[0];
  let children = parent.getElementsByClassName(childrenClass);

  parent.addEventListener('click', function(event){
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove(activeClass);
    }
    event.target.classList.add(activeClass);
  }, false);
}

makeActive('navigation', 'navigation__link', 'navigation__link_active');
makeActive('tags', 'tag__link', 'tag_active');