# [Test task for the Echo](https://echo-test-frontend.vercel.app/)

This is the repository with code of my **React frontend app for echo registration/authorization backend** that I have made
for the Echo test task (task bellow in a Russian language). It was made with **react, scss, react router, "react-text-mask" and redux.**
[Live demo](https://echo-test-frontend.vercel.app/)

## Заметка для проверяющего
Здравствуйте! В этом тестовом задании я использовал redux для хранения токена между компонентами. SCSS для стилей.
**Upd:** Мне сказали, что передадут тестовое задание на проверку в понедельник. Поэтому я решил
выполнить остальные дополнительные части задания до понедельника. Для маски телефона я использовал "react-text-mask". 
Я не очень понял про загрузку изображения. У меня была идея в base64 отправлять, но я так и не нашёл поля для этого в бэкенде. Поэтому 
лишь сделал input с типом file. Дальнейшие возможные улучшения: изучить и использовать formik и, возможно, что-нибудь вроде "redux persist".

### Реализовано

#### Обязательное
- [X] Само веб-приложение

#### Дополнительное
- [X] Маска телефона
- [X] Галочка «посмотреть пароль»
- [X] Блокировка повторной отправки кода смс (Отправить код повторно, через 20 секунд)
- [X] Сохранение данных форм и авторизации - например: если пользователь ввел телефон в форме, после перезагрузки он должен сохранится
- [X] Защита от повторной отправки формы если запрос еще не завершен

## Technologies I've used
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

## Screenshots

![image](https://user-images.githubusercontent.com/83648973/221027770-76c34b62-546e-4f70-b5ac-6ca6c5694983.png)

![image](https://user-images.githubusercontent.com/83648973/221027804-ebc203ee-55a5-45f3-b122-fe309ad17177.png)

![image](https://user-images.githubusercontent.com/83648973/221027851-ea48e385-21dd-4a25-b157-6bb2b2ba6e27.png)

![image](https://user-images.githubusercontent.com/83648973/221027875-d5008205-3a8b-4d16-b48c-df3df551ecfd.png)

![image](https://user-images.githubusercontent.com/83648973/221027968-a8a31757-2c04-4a90-b56e-8f09add5de96.png)

![image](https://user-images.githubusercontent.com/83648973/221027998-47a5109e-d06f-4f3c-ace9-c553459ec130.png)

![image](https://user-images.githubusercontent.com/83648973/221028063-84ef3dd1-73a9-4899-ae6c-6fb3a62eba09.png)

![image](https://user-images.githubusercontent.com/83648973/221028135-bf69f734-523c-40f1-9de2-4fa962943185.png)


## [Task (in a Russian language)](web-job.pdf)

### Тестовое задание – Frontend (Формы)
Продемонстрируйте свои навыки, используя любой из предложенных стеков:
- Vue.js
- React
- React native

#### Задание:
Необходимо реализовать фронтенд часть для системы авторизации/регистрации (бакэнд
часть реализована здесь - https://backend-front-test.dev.echo-company.ru/):
1. Страницу авторизации
2. Страницу восстановления пароля
3. Страницу регистрации
4. Страницу «Личный кабинет»

#### 1. Страница авторизации
   Содержит форму с полями:
   - Телефон
   - Пароль
   - Запомнить меня – галочка
   - Ссылки «Забыли пароль?» и «Регистрация»

   Данные для успешной авторизации: +7 999 999-99-99 пароль 1234567890
   При успешной авторизации - переходим на страницу «Личный кабинет»
   При неуспешной авторизации - выводим сообщение об ошибки

#### 2. Страница восстановления пароля
   Содержит форму с полями:
   - Шаг 1: 
     - Телефон
   - Шаг 2:
     - Код из СМС
   
   Ссылки «Вспомнил пароль!» и «Регистрация»

   Данные для восстановления пароля, телефон: +7 999 999-99-99 код из СМС: 5555
   Реализовать используемый на многих сайтах стандартный алгоритм восстановления через СМС

#### 3. Страница регистрации
   Содержит форму с полями:
   - Имя
   - Телефон
   - Пароль
   - Аватар - загрузка файла изображения (необязательно, но будет большим плюсом)

Ссылку «Авторизация»

При успешной регистрации - переходим на страницу «Личный кабинет»
   
При неуспешной регистрации - выводим сообщение об ошибках

#### 4. Страница личный кабинет
Выводить приветствие «Здравствуйте, Имя!» и кнопку «Выход»
   
#### Будет плюсом:
   - Маска телефона
   - Галочка «посмотреть пароль»
   - Блокировка повторной отправки кода смс (Отправить код повторно, через 20 секунд)
   - Сохранение данных форм и авторизации - например: если пользователь ввел телефон
   в форме, после перезагрузки он должен сохранится
   - Защита от повторной отправки формы если запрос еще не завершен

#### Общие требования:
   Для стилей использовать SCSS
   
Использовать библиотеки:
   - Vue – vuex, vuelidate, vue-route,
   - React – redux, react-router
   - React Native – expo, redux, react-navigation
   
Придерживаться стандартам оформления кода выбранного стека
   - Vue - https://v3.ru.vuejs.org/ru/style-guide/
   - React - https://webformyself.com/rukovodstvo-po-stilyu-napisaniya-koda-react/
   
Адаптивность - корректное отображение от iPhone X до 4K мониторов
   
Использовать Routing - после обновления должны остаться на текущей странице
   
#### Критерии оценки
   - В первую очередь оценивается логика организации кода и проекта в целом
   - Отсутствие глюков и багов
   - Внимание к деталям
   - Удобство и логичность для пользователя
   - Читаемость и восприятие кода
   
#### Результат
   Проект должен быть выложен на GitHub и содержать readme файл с инструкциями по
   развертыванию и запуску проекта, ссылку на GitHub приложите в комментарии к задаче и
   нажмите кнопку «Завершить» в крайнем случае отправьте на почту info@echo-company.ru

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
