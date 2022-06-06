
import axios from 'axios';

// Login user
export const loginUser = (values) => {
    const url = 'users/login';

    return axios.post(url, values)
        .then(response => response.data);
}




// Signup user
export const signupUser = (values) => {
    const url = 'users';

    return axios.post(url, values)
        .then(response => response.data);
}
