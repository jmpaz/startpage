// reference: set properties
// document.documentElement.style.setProperty('--bg-img', `url(${src})`);
// document.documentElement.style.setProperty('--bg-main', `#232836`);

const body = document.querySelector('body');

document.querySelector('#default').addEventListener('click', () => {
  body.className = '';
});

document.querySelector('#stone').addEventListener('click', () => {
  body.className = '';
  body.classList.add('stones');
  body.classList.add('img');
});

document.querySelector('#pastel').addEventListener('click', () => {
  body.className = '';
  body.classList.add('pastel');
  body.classList.add('img');
});
