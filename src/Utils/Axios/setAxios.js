import axios from 'axios';
import { showSnackbar } from '../Snackbar';

export const setAxiosConfig = (data = '', axiosRegister = true,setInterceptor= true) =>{
    console.log("working calling", data)
    if(axiosRegister) {
        axios.defaults.headers.common['Authorization'] = 'Bearer '+data.token;
    }

    if(setInterceptor){
    
        axios.interceptors.response.use(
            function (response) {
                return response;
            },
            function (error) {
                console.log("err", error)
                if(error.response.status == 409) {
                    showSnackbar(error.response.data.msg, 'ERROR')
                }
                return Promise.reject(error);
            }
        );
    }

   
};