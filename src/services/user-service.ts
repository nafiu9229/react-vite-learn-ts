import apiClient from "./api-client";

export interface User {
        id: number;
        name: string;
        email: string;
    }

class UserService {
    getAllUsers = () => {
        const controller = new AbortController();            
        const request = apiClient.get('users', {signal: controller.signal});
        return {request , cancelC: () => controller}    
    };

    deleteUser = (id: number) => {
        return apiClient.delete('users/'+ id);
    }

    cerateUser = (user: User) => {
        return apiClient.post('users', user);
    }

    updateUser = (id: number, user: User) =>{
        return apiClient.patch('users/'+user.id, user);
    }
}

export default new UserService();
