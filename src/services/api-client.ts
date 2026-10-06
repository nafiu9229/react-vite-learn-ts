import axios,  { CanceledError, AxiosError } from 'axios';

export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    // headers:{
    //     'api-key':''
    // }//each http req we need  to pass
});

export {CanceledError, AxiosError}