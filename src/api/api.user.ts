import { instance } from "./api.config";

interface GetUsersLazyArgs {
  offset: number;
  yearFrom: number | undefined;
  yearTo: number | undefined;
  classLetters: string[];
  fullName: string;
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
};
