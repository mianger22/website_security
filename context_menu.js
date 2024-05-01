module.exports = function context_menu() {
  // Создаем контейнер для контекстного меню
  const contextMenu = document.createElement('div');
  contextMenu.id = 'contextMenu';
  contextMenu.style.display = 'none';
  contextMenu.style.position = 'absolute';
  contextMenu.style.backgroundColor = '#fff';
  contextMenu.style.border = '1px solid #ccc';
  contextMenu.style.padding = '5px';

  // Создаем список пунктов меню
  const menuList = document.createElement('ul');
  menuList.id = "menuList";

  // Создаем первый пункт меню
  const menuItem1 = document.createElement('li');
  menuItem1.id = "menuItem1";
  const menuItemLink1 = document.createElement('a');
  menuItemLink1.id = "menuItemLink1";
  menuItemLink1.href = '#';
  menuItemLink1.innerText = 'Пункт меню 1';
  menuItemLink1.addEventListener('click', () => {
    alert('Вы выбрали пункт меню 1');
  });
  menuItem1.appendChild(menuItemLink1);

  // Добавляем пункт меню в список
  menuList.appendChild(menuItem1);

  // Добавляем список в контейнер
  contextMenu.appendChild(menuList);

  // Добавляем контейнер в документ
  document.body.appendChild(contextMenu);

  // -------------------

  // Показать контекстное меню при клике правой кнопкой мыши
  document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    var contextMenu = document.getElementById('contextMenu');
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.top = event.pageY + 'px';
    contextMenu.style.display = 'block';
  });

  // Скрыть контекстное меню при клике вне его области
  document.addEventListener('click', function(event) {
    var contextMenu = document.getElementById('contextMenu');
    if (event.target != contextMenu) {
      contextMenu.style.display = 'none';
    }
  });

  // Обработчики для выбора пунктов меню
  document.getElementById('menuItem1').addEventListener('click', function(event) {
    // Выполнить действие для пункта меню 1
  });
}