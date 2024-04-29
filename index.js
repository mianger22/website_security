// Переменная keyboardShortcuts хранит объект с методами для работы с клавиатурными сокращениями
const keyboardShortcuts = {
  // Объект allShortcuts хранит все зарегистрированные клавиатурные сокращения
  allShortcuts: {},
  // Метод add позволяет добавить новое клавиатурное сокращение
  add: (keys, callback, options = {}) => {
    // Параметры по умолчанию
    const defaults = {
      type: "keydown",
      propagate: false,
      disableInInput: false,
      target: document,
      keyCode: false
    };
    // Объединяем переданные опции с параметрами по умолчанию
    options = { ...defaults, ...options };
    // Получаем целевой элемент для сокращения
    const targetElement =
      typeof options.target === "string"
        ? document.getElementById(options.target)
        : options.target;
    // Приводим клавиши к нижнему регистру
    keys = keys.toLowerCase();
    // Обработчик события
    const handler = (event) => {
      // Условие для отключения сокращения в поле ввода
      event = event || window.event;
      if (options.disableInInput) {
        let target = event.target || event.srcElement;
        if (target.nodeType === 3) {
          target = target.parentNode;
        }
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
          return;
        }
      }
      // Получаем код клавиши и приводим к нижнему регистру
      const code = event.keyCode ? event.keyCode : event.which;
      const letter = String.fromCharCode(code).toLowerCase();
      const keyParts = keys.split("+");
      let count = 0;
      let ctrl = false,
        shift = false,
        alt = false,
        meta = false;
      // Проверка клавиш с учетом модификаторов
      for (let key of keyParts) {
        // Проверяем каждую клавишу с помощью switch
          switch (key) {
            case "ctrl":
            case "control":
              count++;
              ctrl = true;
              break;
            case "shift":
              count++;
              shift = true;
              break;
            case "alt":
              count++;
              alt = true;
              break;
            case "meta":
              count++;
              meta = true;
              break;
            default:
              if (
                key.length > 1 ||
                (options.keyCode && options.keyCode === code) ||
                letter === key
              ) {
                count++;
              }
          }
      }
      // Если нажато нужное сочетание клавиш, вызываем пользовательскую функцию
      if (
        count === keyParts.length &&
        ctrl === (event.ctrlKey || event.metaKey) &&
        shift === event.shiftKey &&
        alt === event.altKey &&
        meta === event.metaKey
      ) {
        callback(event);
        // Отменяем дальнейшее распространение события
        if (!options.propagate) {
          event.preventDefault();
          return false;
        }
      }
    };
    // Сохраняем сокращение в объект allShortcuts
    keyboardShortcuts.allShortcuts[keys] = {
      callback: handler,
      target: targetElement,
      event: options.type
    };
    // Добавляем обработчик события к целевому элементу
    targetElement.addEventListener(options.type, handler);
  }
};

// Примеры регистрации клавиатурных сокращений
keyboardShortcuts.add("Ctrl+U", () => alert("Доступ к коду запрещён"));
keyboardShortcuts.add("Meta+Alt+U", () => alert("Копирование запрещено"));
keyboardShortcuts.add("Ctrl+C", () => alert("Копирование запрещено"));
keyboardShortcuts.add("Meta+C", () => alert("Копирование запрещено"));
keyboardShortcuts.add("F12", () => alert("Открытие консоли запрещено"));

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  legal and contact information  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Я, Устинов Дмитрий Сергеевич, рождённый 09.06.1995 в городе Бологое Тверской области, сын Устинова Сергея Викторовича и Устиновой Ольги Константиновны (в девичестве Барановой), 
// автор данного кода. 

// Код использует библиотеку shortcuts <https://www.npmjs.com/package/shortcuts>, написанную Fabio Spampinato. 
// Без его кода я бы ни в жизнь не сделал этот npm-пакет, спасибо профессионалу своего дела.

// Мои адреса (если не отвечу в одном из них, пишите на другой): 
// test666777888999@yandex.ru, https://t.me/moyustimov, https://vk.com/moyustimov


// Дата и время создания: 21.04.2024, 14:54:46
// Авторы: Устинов Дмитрий Сергеевич, Fabio Spampinato [ https://www.npmjs.com/package/shortcuts ]
// Официальный репозиторий проекта: https://www.npmjs.com/package/website_security