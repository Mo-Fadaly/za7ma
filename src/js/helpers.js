function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

function qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector);
}

function newEl(elm) {
  return document.createElement(elm);
}

function $on(target, type, cb, useCapture) {
  target.addEventListener(type, cb, !!useCapture);
}

function getXML(url, opts = {}) {
  return fetch(url, opts)
    .then(res => res.text())
    .catch(err => console.error(err));
}

export default { qs, qsa, $on, newEl, getXML };
