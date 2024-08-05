import init from './main.js';

(() => {
  const btn = document
    .querySelector("#playButton");

    btn.addEventListener("click", () => {
      btn.hidden = true;
      btn.style.display = 'none';
      document.querySelector('html').style.cursor = 'none';
      init();
    });
})()