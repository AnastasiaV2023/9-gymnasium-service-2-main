import { instance } from "./api.config";

interface GetUsersLazyArgs {
  offset: number;
  yearFrom: number | undefined;
  yearTo: number | undefined;
  classLetters: string[];
  fullName: string;
}

// Интерфейс для обновления пользователя
export interface UpdateUserDto {
  fullName?: string;
  email?: string;
  graduationYear?: number;
  classLetter?: string;
  messageToGraduates?: string;
  messageToStudents?: string;
  occupation?: string;
  status?: string;
}

// Интерфейс пользователя
export interface User {
  id: number;
  fullName: string;
  email: string;
  graduationYear: number;
  classLetter: string;
  messageToGraduates: string;
  messageToStudents: string;
  occupation: string;
  status?: string;
}

export const UserService = {
  getAllUsers() {
    return instance.get("users/");
  },

  getUsersLazy({
    offset,
    yearFrom,
    yearTo,
    classLetters,
    fullName,
  }: GetUsersLazyArgs) {
    return instance.get(
      `/users/lazy?limit=20&offset=${offset}&yearFrom=${
        yearFrom || ""
      }&yearTo=${yearTo || ""}&fullName=${fullName || ""}&${classLetters
        .map((item) => `classLetter=${item || ""}`)
        .join("&")}`
    );
  },

  updateUser(id: number, userData: UpdateUserDto) {
    return instance.put(`users/${id}`, userData);
  },
};
