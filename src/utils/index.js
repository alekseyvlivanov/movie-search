function createElement(tag, className) {
  const e = document.createElement(tag);
  e.className = className;

  return e;
}

export default { createElement };
