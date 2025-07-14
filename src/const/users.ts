// src/const/users.ts
// Массив моковых пользователей для демонстрации работы страниц пользователей и профиля.
// Используется в UsersPage и UserPage для отображения информации о пользователях.

export const users = [
    {
        id: 1,
        name: 'Петров Иван Алексеевич',
        year: 2010,
        letter: 'А',
        email: 'ivan@example.com',
        password: "",
        shareWithAlumni: "",
        shareWithStudents: "",
        profession: "",
        role: 'Выпускник',
        avatar: '/avatars/1.jpg',
        status: 'Готов помогать гимназии',
        connection: ""
    },
    {
        id: 2,
        name: 'Сидорова Мария Андреевна',
        year: 2008,
        letter: 'В',
        email: 'maria@example.com',
        password: "",
        shareWithAlumni: "",
        shareWithStudents: "",
        profession: "",
        role: 'Выпускник',
        avatar: '/avatars/2.jpg',
        status: 'Доступен для удаленной помощи',
        connection: ""
    },
    // ... другие пользователи
    { 
        id: 3, 
        name: 'Козлов Алексей Владимирович', 
        year: 1980,
        letter: 'Б',
        email: 'alex@example.com', 
        password: "",
        shareWithAlumni: "",
        shareWithStudents: "",
        profession: "",
        role: 'Выпускник', 
        avatar: '/avatars/3.jpg' ,
        status: 'Не доступен',
        connection: ""
    },
];
