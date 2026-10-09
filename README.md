# Currency Converter

Личный frontend-проект: конвертер валют для повседневного использования с Android-версией.

## Что реализовано

- конвертация между узбекским сумом (UZS), российским рублём (RUB) и долларом США (USD);
- редактирование курсов валют;
- автоматический пересчёт значений при вводе суммы;
- форматирование чисел для удобства чтения;
- сохранение курсов валют в `localStorage`;
- очистка введённых значений;
- Android-версия приложения на основе Capacitor.

JavaScript-функциональность реализована с использованием AI-инструментов в формате vibe coding. HTML-разметку и CSS-стили разработал самостоятельно.

## Стек

- HTML5
- CSS3
- JavaScript
- Capacitor
- Android Studio

## Структура

```text
www/
  index.html    Основная страница
  styles.css    Стили интерфейса
  script.js     Логика конвертации
android/        Android-проект
capacitor.config.json
                Конфигурация Capacitor
package.json    Зависимости проекта
```

## Запуск

Для просмотра веб-версии откройте `www/index.html` в браузере.

Для подготовки Android-проекта установите Node.js и Android Studio, выполните `npm install`, затем `npx cap sync android`. После этого откройте папку `android` в Android Studio.

## Android-приложение

Скачать APK-файл можно в разделе [Releases](https://github.com/dvprosk/currency-converter/releases) на GitHub.
