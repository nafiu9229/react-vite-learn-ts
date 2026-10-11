
export interface User {
    id: number;
    name: string;
    email: string;
}

/*
import apiClient from "./api-client";

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

    updateUser = (id: number, user: User) => {
        return apiClient.patch('users/'+id, user);
    }
}

export default new UserService();
*/

/**
 * we have created seperate http generic service. if we are specific for the user then above one is good.
 */
import create from './http-service';

export default create('users');
