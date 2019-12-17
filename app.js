/* global SlimSelect */
const body = document.querySelector('body');

async function setTheme(theme, isImgTheme = false) {
  const getScheme = async () => {
    const response = await fetch(`pywal/${theme}.json`);
    return await response.json();
  };
  const scheme = await getScheme().then(data => data);

  const colors = {
    bgMain: scheme['colors'].color0,
    bgCard: scheme['special'].background,
    bgHover: scheme['colors'].color5,
    fgMain: scheme['special'].foreground,
    fgHover: scheme['colors'].color0
  };

  if (isImgTheme) {
    const imgSrc = `url(images/${theme}.jpg)`;
    body.classList.add('img');
    body.style.setProperty('background-image', imgSrc);
  }

  document.documentElement.style.setProperty('--bg-card', colors.bgCard);
  document.documentElement.style.setProperty('--bg-hover', colors.bgHover);
  document.documentElement.style.setProperty('--fg-main', colors.fgMain);
  document.documentElement.style.setProperty('--fg-hover', colors.fgHover);
}

new SlimSelect({
  select: '#theme',
  showSearch: false,
  hideSelectedOption: true,
  data: [
    { placeholder: true, text: 'Select a theme...' },
    { text: 'Default (system)', value: 'default' }, // regular option
    {
      label: 'Flat',
      options: [
        { class: 'flat', text: 'Mirage', value: 'mirage' },
        { class: 'flat', text: 'Timbre', value: 'timbre' }
      ]
    },
    {
      label: 'Images',
      options: [
        { class: 'img', text: 'Stones', value: 'stones' },
        { class: 'img', text: 'Pastel', value: 'pastel' }
      ]
    }
  ],
  onChange: selection => {
    body.className = '';
    body.style = '';

    switch (selection.class) {
      case 'flat':
        console.log('flat schemes not yet implemented');
        break;
      case 'img':
        setTheme(selection.value, true);
        break;
      default:
        document.documentElement.style = '';
    }
  }
});
