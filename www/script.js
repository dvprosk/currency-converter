const uzsInput = document.querySelector('#wallet__item-uzs');
const rubInput = document.querySelector('#wallet__item-rub');
const usdInput = document.querySelector('#wallet__item-usd');

const rubUzsInput = document.querySelector('#rate-rub-uzs');
const usdUzsInput = document.querySelector('#rate-usd-uzs');
const usdRubInput = document.querySelector('#rate-usd-rub');

const clearButtons = document.querySelectorAll('.wallet__clear');


// ==============================
// Значения по умолчанию
// ==============================

const defaultRates = {
  rubToUzs: 125,
  usdToUzs: 11800,
  usdToRub: 84.35
};


// ==============================
// Получаем сохранённые курсы
// ==============================

const savedRates = JSON.parse(
  localStorage.getItem('currencyRates')
);


// Если курсы сохранены — используем их.
// Если нет — используем значения по умолчанию.

const rates = savedRates || defaultRates;


// Показываем курсы в input

rubUzsInput.value = rates.rubToUzs;
usdUzsInput.value = rates.usdToUzs;
usdRubInput.value = rates.usdToRub;


// ==============================
// Форматирование чисел
// ==============================

function formatNumber(value) {

  // Убираем пробелы
  value = value.replace(/\s/g, '');

  // Разделяем целую и дробную часть
  const [integerPart, decimalPart] = value.split('.');

  // Добавляем пробелы между тысячами
  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ' '
  );

  // Если есть дробная часть
  if (decimalPart !== undefined) {
    return `${formattedInteger}.${decimalPart}`;
  }

  return formattedInteger;
}


// ==============================
// Получение числа
// ==============================

function getNumber(value) {
  return Number(value.replace(/\s/g, ''));
}


// ==============================
// Получение текущих курсов
// ==============================

function getRates() {
  return {
    rubToUzs: Number(rubUzsInput.value),
    usdToUzs: Number(usdUzsInput.value),
    usdToRub: Number(usdRubInput.value)
  };
}


// ==============================
// Сохранение курсов
// ==============================

function saveRates() {

  const rates = getRates();

  localStorage.setItem(
    'currencyRates',
    JSON.stringify(rates)
  );
}


// ==============================
// Активная валюта
// ==============================

let activeCurrency = null;


// ==============================
// Обновление крестиков
// ==============================

function updateClearButtons() {

  const hasValue =
    uzsInput.value ||
    rubInput.value ||
    usdInput.value;

  clearButtons.forEach((button) => {

    button.style.display = hasValue
      ? 'block'
      : 'none';

  });
}


// ==============================
// UZS
// ==============================

uzsInput.addEventListener('input', () => {

  activeCurrency = 'uzs';

  uzsInput.value = formatNumber(
    uzsInput.value
  );

  convertFromUzs();

  updateClearButtons();

});


// ==============================
// RUB
// ==============================

rubInput.addEventListener('input', () => {

  activeCurrency = 'rub';

  rubInput.value = formatNumber(
    rubInput.value
  );

  convertFromRub();

  updateClearButtons();

});


// ==============================
// USD
// ==============================

usdInput.addEventListener('input', () => {

  activeCurrency = 'usd';

  usdInput.value = formatNumber(
    usdInput.value
  );

  convertFromUsd();

  updateClearButtons();

});


// ==============================
// UZS → RUB + USD
// ==============================

function convertFromUzs() {

  const uzs = getNumber(
    uzsInput.value
  );

  if (!uzs) {

    rubInput.value = '';
    usdInput.value = '';

    return;
  }

  const {
    rubToUzs,
    usdToUzs
  } = getRates();


  rubInput.value = formatNumber(
    (uzs / rubToUzs).toFixed(2)
  );


  usdInput.value = formatNumber(
    (uzs / usdToUzs).toFixed(2)
  );

}


// ==============================
// RUB → UZS + USD
// ==============================

function convertFromRub() {

  const rub = getNumber(
    rubInput.value
  );

  if (!rub) {

    uzsInput.value = '';
    usdInput.value = '';

    return;
  }

  const {
    rubToUzs,
    usdToRub
  } = getRates();


  uzsInput.value = formatNumber(
    (rub * rubToUzs).toFixed(2)
  );


  usdInput.value = formatNumber(
    (rub / usdToRub).toFixed(2)
  );

}


// ==============================
// USD → UZS + RUB
// ==============================

function convertFromUsd() {

  const usd = getNumber(
    usdInput.value
  );

  if (!usd) {

    uzsInput.value = '';
    rubInput.value = '';

    return;
  }

  const {
    usdToUzs,
    usdToRub
  } = getRates();


  uzsInput.value = formatNumber(
    (usd * usdToUzs).toFixed(2)
  );


  rubInput.value = formatNumber(
    (usd * usdToRub).toFixed(2)
  );

}


// ==============================
// Изменение курса RUB → UZS
// ==============================

rubUzsInput.addEventListener('input', () => {

  saveRates();

  if (activeCurrency === 'uzs') {
    convertFromUzs();
  }

  if (activeCurrency === 'rub') {
    convertFromRub();
  }

});


// ==============================
// Изменение курса USD → UZS
// ==============================

usdUzsInput.addEventListener('input', () => {

  saveRates();

  if (activeCurrency === 'uzs') {
    convertFromUzs();
  }

  if (activeCurrency === 'usd') {
    convertFromUsd();
  }

});


// ==============================
// Изменение курса USD → RUB
// ==============================

usdRubInput.addEventListener('input', () => {

  saveRates();

  if (activeCurrency === 'rub') {
    convertFromRub();
  }

  if (activeCurrency === 'usd') {
    convertFromUsd();
  }

});


// ==============================
// Очистка всех полей
// ==============================

clearButtons.forEach((button) => {

  button.addEventListener('click', () => {

    uzsInput.value = '';
    rubInput.value = '';
    usdInput.value = '';

    activeCurrency = null;

    updateClearButtons();

    uzsInput.focus();

  });

});


// ==============================
// Начальное состояние
// ==============================

updateClearButtons();

