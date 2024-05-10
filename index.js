// 1. Прописываем общие функции

// Общая функция блокировки нажатия клавиши
const key_lock = e => e.preventDefault();


// 2. Запрещаем выделять текст и блокируем клавиатуру и мышь, чтобы злоумышленник не успел украсть контент и код

// Блокируем клавиатуру
window.addEventListener("keydown", key_lock);
// Закрываем доступ к стандартному контекстному меню для устранения возможности получить доступ к коду
window.oncontextmenu = () => false;
// Запрещаем выделять текст, чтобы невозможно было его скопировать
window.onselectstart = () => false;


// 3. Пишем основной функционал (блокирования нужных клавиш)

const keyboardShortcuts = {
  // Переменная keyboardShortcuts хранит объект с методами для работы с клавиатурными сокращениями
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
  },
  remove: keys => {
    // Приводим переданный ключ к нижнему регистру
    keys = keys.toLowerCase();
    // Получаем клавиатурное сокращение из объекта allShortcuts по ключу
    const shortcut = this.allShortcuts[keys];
    // Удаляем клавиатурное сокращение из объекта allShortcuts
    delete this.allShortcuts[keys];
    // Проверяем, существует ли клавиатурное сокращение с заданным ключом
    if (shortcut) {
      // Извлекаем тип события, целевой элемент и обработчик из сокращения
      const event = shortcut.event;
      const target = shortcut.target;
      const callback = shortcut.callback;
      // Проверяем поддерживается ли метод removeEventListener для удаления обработчика
      if (target.removeEventListener) {
        // Удаляем обработчик события
        target.removeEventListener(event, callback, false);
      } else if (target.detachEvent) {
        // Если removeEventListener не поддерживается, проверяем поддерживается ли метод detachEvent
        target.detachEvent("on" + event, callback);
      } else {
        // Если и detachEvent не поддерживается, устанавливаем значение 'false' для обработчика события
        target["on" + event] = false;
      }
    }
  }
};


// 4. Снимаем блокировку клавиатуры

window.removeEventListener("keydown", key_lock);


// 5. Блокируем нужные клавиши

// Блокируем нажатие F12
window.addEventListener("keydown", e => {
  e.keyCode === 123 && e.preventDefault();
});

// Блокируем нажатие горячих клавиш для доступа к коду
keyboardShortcuts.add("Ctrl+U", () => false);
keyboardShortcuts.add("Meta+Alt+U", () => false);
keyboardShortcuts.add("Ctrl+C", () => false);
keyboardShortcuts.add("Meta+C", () => false);
keyboardShortcuts.add("Ctrl+Shift+S", () => false);
keyboardShortcuts.add("Ctrl+S", () => false);
keyboardShortcuts.add("Ctrl+P", () => false);


// 6. Меняем внешний вид и функционал контекстного меню

document.addEventListener("DOMContentLoaded", () => {
  (function custom_context_menu() {
    // Создаём стили для меню
    const style = document.createElement("style");
    style.innerHTML = `
      .menu {
        display: none;
        position: absolute;
        background-color: #f5f5f5; /* Слегка серый цвет фона */
        min-width: 200px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        padding: 12px;
        z-index: 1;
        text-align: center;
        border-radius: 6px;
        color: #333;
        font-family: Arial, sans-serif;
        border: 1px solid #0188fe; /* Граница, как в Opera контекстного меню */
      }
        
      .menu a {
        color: #007AFF;
        padding: 8px 16px;
        text-decoration: none;
        display: block;
        transition: background-color 0.3s;
      }
        
      .menu a:hover {
        background-color: #EDEDED;
      }
    `;
    // Применяем их к документу
    document.head.appendChild(style); 

    // Создаём HTML-код для меню
    const menuDiv = document.createElement("div");
    menuDiv.id = "myMenu";
    menuDiv.classList.add("menu");
    menuDiv.innerHTML = `
      Хотите меню? Пишите на <a href="mailto:moyustimov@vk.com">moyustimov@vk.com</a>
    `;
    // Добавляем его в конец body
    document.body.appendChild(menuDiv); 

    // Меняем стандартное контекстное меню на кастомное
    document.addEventListener("contextmenu", e => {
      e.preventDefault(); 
      const menu = document.getElementById("myMenu");
      menu.style.display = "block";
      menu.style.left = e.pageX + "px";
      menu.style.top = e.pageY + "px";
    });

    // Скрываем меню при клике и прокрутке страницы
    const hideMenu = () => document.getElementById("myMenu").style.display = "none";
    
    document.addEventListener("click", hideMenu);
    document.addEventListener("scroll", hideMenu);
  })();
}, { once: true })


// 7. Удаляем все обработчики событий перед уходом с сайта

window.addEventListener("beforeunload", () => {
  window.removeEventListener("keydown");
  document.removeEventListener("contextmenu");
  document.removeEventListener("click");
  document.removeEventListener("scroll");
  keyboardShortcuts.remove("Ctrl+U");
  keyboardShortcuts.remove("Meta+Alt+U");
  keyboardShortcuts.remove("Ctrl+C");
  keyboardShortcuts.remove("Meta+C");
  keyboardShortcuts.remove("Ctrl+Shift+S");
  keyboardShortcuts.remove("Ctrl+S");
  keyboardShortcuts.remove("Ctrl+P");
}, { once: true });


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  legal and contact information  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Автор: Устинов Дмитрий Сергеевич (место и дата рождения: РФ, обл. Тверская, г. Бологое; 09.06.1995)
// Контакты: moyustimov@vk.com, https://t.me/moyustimov, https://vk.com/moyustimov
// Официальный репозиторий проекта: https://www.npmjs.com/package/website_security

// Код использует библиотеку shortcuts, доступную по адресу https://www.npmjs.com/package/shortcuts, написанную Fabio Spampinato