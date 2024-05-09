# Пакет website_security: 
[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=000000&repeat=false&random=false&width=435&lines=%D0%BE%D0%B3%D1%80%D0%BE%D0%BC%D0%BD%D0%B0%D1%8F+%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%B0+%D0%B2+%D0%BE%D0%B4%D0%BD%D0%BE%D0%B9+%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B5+%F0%9F%9A%80)](https://git.io/typing-svg)

**Продукт юридически защищён лицензией GNU AGPLv3**

<br>

## Для чего он нужен

Этот пакет обеспечивает защиту Вашего сайта от копирования, предотвращая кражу кода и контента.

Почему важно защищать сайт от копирования?

1. Потеря трафика: если другой сайт скопирует контент, который Вы публикуете, это может привести к утечке посетителей и трафика с Вашего сайта.
2. Ухудшение репутации: если скопированный сайт содержит некачественный контент или спам, это может негативно сказаться на репутации Вашего сайта.
3. Потеря дохода: если сайт-копия начнёт привлекать посетителей с помощью Вашего контента, Вы можете потерять доход, который получаете от рекламы и продаж на своём сайте.
4. Проблемы с SEO: копирование контента может вызвать проблемы с поисковой оптимизацией, поскольку поисковые системы могут наказать Ваш сайт за дублированный контент.


## Что умеет

1. Отключает доступ к коду блокировкой нажатия Ctrl + U, F12, Meta + Alt + U и закрытием контекстного меню.
2. Отключает копирование контента с помощью Ctrl + C, Meta + C.
3. Запрещает выделение текста и всего документа нажатием Ctrl + A, чтобы невозможно было его скопировать.
4. Не позволяет делать скриншоты, записывать экран, печатать и сохранять страницу.

К великому сожалению, с помощью JavaScript нельзя полностью предотвратить копирование сайта. Существуют браузеры, которые позволяют отключить JavaScript, вследствие чего данная защита становится бессмысленной. В итоге данный скрипт лишь усложняет жизнь злоумышленникам. Но есть и хорошая новость: всё меньше браузеров поддерживают отключение JavaScript. Это значит, что в будущем данный скрипт будет одним из лучших способов защиты сайта, так как ни один браузер не будет предоставлять возможность отключения. А значит, контент Вашего сайта и его структура не смогут быть скопированы.

**Внимание!** Проверяйте информацию. На момент написания этого сообщения - лишь несколько - браузеров позволяли отключать JavaScript. Но возможно, что сейчас ни один браузер не поддерживает такую функцию. Поэтому самое время установить этот скрипт, если Вы ещё этого не сделали.


## Инструкция

**Работает только c JavaScript**

Чтобы использовать, достаточно написать перед закрывающим тегом **</body>** файла **index.html**:
`<script src="https://unpkg.com/website_security@latest"></script>`

Или, если Ваш сайт написан на ReactJS, Vue, Angular или любой другой библиотеке/фреймворке, или просто желаете установить через npm,  
1. устанавливаете (пишете в терминале, в корневой папке проекта): 
`npm install website_security`  
2. подключаете (пишете в корневом файле javascript - в файле используемом в качестве точки входа для приложения - index.js или main.js):
`import "website_security"`


## Feedback

Буду рад обратной связи. Оставляйте [здесь](https://github.com/mianger22/website_security/issues) пожелания по улучшению или выявленные ошибки. Так я смогу быстрее развивать проект.


## Version 4.1.0

### История изменений (RU)

1. Улучшил readme.

### Changelog (EN)

1. Improved the readme.


## Авторство

Автор: Устинов Дмитрий Сергеевич (место и дата рождения: РФ, обл. Тверская, г. Бологое; 09.06.1995).
Код использует библиотеку [shortcuts](https://www.npmjs.com/package/shortcuts), написанную Fabio Spampinato. 


[Email](mailto:test666777888999@yandex.ru) | [Telegram](https://t.me/moyustimov) | [VK](https://vk.com/moyustimov)