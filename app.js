// reference: set properties
// document.documentElement.style.setProperty('--bg-img', `url(${src})`);
// document.documentElement.style.setProperty('--bg-main', `#232836`);

const body = document.querySelector('body');

async function setTheme(theme) {
  const getScheme = async () => {
    const response = await fetch(`../pywal/${theme}.json`);
    return await response.json();
  };
  const scheme = await getScheme().then(data => data);
  const imgSrc = `url(images/${theme}.jpg)`;

  const colors = {
    bgMain: scheme.colors.color0,
    bgCard: scheme.special.background,
    bgHover: scheme.colors.color5,
    fgMain: scheme.special.foreground,
    fgHover: scheme.colors.color0
  };

  body.classList.add('img');
  body.style.setProperty('background-image', imgSrc);
  document.documentElement.style.setProperty('--bg-card', colors.bgCard);
  document.documentElement.style.setProperty('--bg-hover', colors.bgHover);
  document.documentElement.style.setProperty('--fg-main', colors.fgMain);
  document.documentElement.style.setProperty('--fg-hover', colors.fgHover);
}

document.querySelector('#default').addEventListener('click', () => {
  body.className = '';
  body.style = '';
  document.documentElement.style = '';
});

document.querySelector('#pastel').addEventListener('click', () => {
  body.className = '';
  body.style = '';
  setTheme('pastel');
});

document.querySelector('#stones').addEventListener('click', () => {
  body.className = '';
  body.style = '';
  setTheme('stones');
});
