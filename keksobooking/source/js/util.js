'use strict';

const changeElementContent = (parent, selector, content, type = 'text') => {
  if (typeof content === 'undefined') {
    return;
  }
  switch (type) {
    case 'text':
      parent.querySelector(selector).textContent = content;
      break;
    case 'html':
      parent.querySelector(selector).innerHTML = content;
      break;
    case 'src':
      parent.querySelector(selector).src = content;
      break;
  }
}

const isArrayEmpty = array => array.length === 0 ? true : false;

const removeNodeIfEmpty = (parent, selector, contentArray) => {
  const elem = parent.querySelector(selector);
  if (isArrayEmpty(contentArray)) {
    elem.remove();
  }
}

const setColor = (elem, color) => {
  elem.style.color = color;
}

const debounce = (func, wait, immediate) => {
  let timeout;
  return () => {
    let context = this;
    let doLater = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context);
      }
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(doLater, wait);
    if (callNow) {
      func.apply(context);
    }
  };
};

export {
  changeElementContent,
  isArrayEmpty,
  removeNodeIfEmpty,
  setColor,
  debounce
};

