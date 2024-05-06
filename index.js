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

// Блокируем нажатие горячих клавиш для доступа к коду
keyboardShortcuts.add("Ctrl+U", () => alert("Доступ к коду запрещён"));
keyboardShortcuts.add("Meta+Alt+U", () => alert("Копирование запрещено"));
keyboardShortcuts.add("Ctrl+C", () => alert("Копирование запрещено"));
keyboardShortcuts.add("Meta+C", () => alert("Копирование запрещено"));
keyboardShortcuts.add("F12", () => alert("Открытие консоли запрещено"));

// Запрещаем выделять текст, чтобы невозможно было его скопировать
document.body.onselectstart = () => false;

// Закрываем доступ к контекстному меню для устранения возможности получить доступ к коду
document.oncontextmenu = () => false;

// Заменяем на собственное контекстное меню
(function custom_context_menu() {
  // Создаем стили для меню
  const style = document.createElement('style');
  style.innerHTML = `
    .menu {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      padding: 12px;
      z-index: 1;
    }
    .menu a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
    .menu a:hover {
      background-color: #f1f1f1;
    }
  `;
  document.head.appendChild(style); // Применяем стили к документу
  
  // Создаем HTML-код для меню
  const menuDiv = document.createElement('div'); // Создаем новый элемент div
  menuDiv.id = 'myMenu'; // Устанавливаем id для нового элемента
  menuDiv.classList.add('menu'); // Используем метод classList для добавления класса
  menuDiv.innerHTML = `
    <a href="#" onclick="window.open('${window.location.href}','_blank');">Открыть в новой вкладке</a>
    <a href="#">Сохранить как...</a>
    <a href="mailto:youremail@example.com">Отправить по электронной почте</a>
    <a href="#" id="print">Печать</a>
  `;
  document.body.appendChild(menuDiv); // Добавляем новый элемент в конец body
  
  // Добавляем обработчик событий для показа/скрытия меню
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const menu = document.getElementById('myMenu');
    menu.style.display = 'block';
    menu.style.left = e.pageX + 'px';
    menu.style.top = e.pageY + 'px';
    return false;
  }); // Отменяем стандартное поведение правой кнопки мыши
  
  document.addEventListener('click', function(e) {
    const menu = document.getElementById('myMenu');
    menu.style.display = 'none';
  }); // Скрываем меню при клике
  
  document.getElementById('print').addEventListener('click', function(e) {
    window.print();
  }); // Добавляем обработчик для кнопки "Печать"  
})();

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  legal and contact information  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Автор: Устинов Дмитрий Сергеевич (место и дата рождения: РФ, обл. Тверская, г. Бологое; 09.06.1995)
// Контакты: test666777888999@yandex.ru, https://t.me/moyustimov, https://vk.com/moyustimov
// Официальный репозиторий проекта: https://www.npmjs.com/package/website_security

// Код использует библиотеку shortcuts, доступную по адресу https://www.npmjs.com/package/shortcuts, написанную Fabio Spampinato