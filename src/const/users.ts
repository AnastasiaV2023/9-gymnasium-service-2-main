// src/const/users.ts
// Массив моковых пользователей для демонстрации работы страниц пользователей и профиля.
// Используется в UsersPage и UserPage для отображения информации о пользователях.

export const users = [
    {
        id: 1,
        name: 'Петров Иван Алексеевич',
        year: '2010',
        letter: 'А',
        email: 'ivan@example.com',
        role: 'Выпускник',
        avatar: '/avatars/1.jpg',
        phone: '+7 (999) 123-45-67',
        status: 'Готов помогать гимназии',
        joinDate: '10.11.2020'
    },
    {
        id: 2,
        name: 'Сидорова Мария Андреевна',
        year: '2010',
        letter: 'В',
        email: 'maria@example.com',
        role: 'Выпускник',
        avatar: '/avatars/2.jpg',
        phone: '+7 (999) 234-56-78',
        status: 'Доступен для удаленной помощи',
        joinDate: '10.11.2020'

    },
    // ... другие пользователи
    { 
        id: 3, 
        name: 'Козлов Алексей Владимирович', 
        year: '2010',
        letter: 'Б',
        email: 'alex@example.com', 
        role: 'Выпускник', 
        avatar: '/avatars/3.jpg' ,
        phone: '+7 (999) 232-22-26',
        status: 'Не доступен',
        joinDate: '10.11.2020'

    },
];
