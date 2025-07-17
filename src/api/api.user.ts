
import { instance } from "./api.config";


export const UserService = {
    getAllUsers() {
        return instance.get('users/')
    }
};
