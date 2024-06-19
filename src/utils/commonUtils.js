export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function debounceLeading(func, wait) {
  let timeout;
  return function (...args) {
    if (!timeout) {
      func(...args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
  };
}
