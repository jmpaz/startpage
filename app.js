/* global SlimSelect */
const body = document.querySelector('body');

const getColorScheme = async theme => {
  const response = await fetch(`schemes/${theme}.json`);
  const data = await response.json();
  return [data.colors, data.special];
};

const setTheme = async (theme, isImgTheme = false) => {
  const [colors, special] = await getColorScheme(theme).then(data => data);

  if (isImgTheme) {
    const imgSrc = `url(images/${theme}.jpg)`;
    body.classList.add('img');
    body.style.setProperty('background-image', imgSrc);
  }

  body.classList.add('themed');

  [colors, special].forEach(colorType => {
    for (const [color, value] of Object.entries(colorType))
      document.documentElement.style.setProperty(`--${color}`, value);
  });
};

const dropdownData = [
  { placeholder: true, text: 'Theme' },
  { text: 'Default (system)', value: 'default' }, // regular option
  {
    label: 'Flat',
    options: [
      { class: 'flat', text: 'Ayu Mirage', value: 'ayu-mirage' },
      { class: 'flat', text: 'Lakeside', value: 'lakeside' }
    ]
  },
  {
    label: 'Images',
    options: [
      { class: 'img', text: 'Field', value: 'field' },
      { class: 'img', text: 'Mist', value: 'mist' },
      { class: 'img', text: 'Stones', value: 'stones' },
      { class: 'img', text: 'Pastel', value: 'pastel' }
    ]
  }
];

const selectionHandler = selection => {
  body.className = '';
  body.style = '';

  switch (selection.class) {
    case 'flat':
      setTheme(selection.value);
      break;
    case 'img':
      setTheme(selection.value, true);
      break;
    default:
      document.documentElement.style = '';
  }
};

new SlimSelect({
  select: '#theme',
  data: dropdownData,
  showSearch: false,
  hideSelectedOption: true,
  onChange: selectionHandler
});
