import axios from "axios";

export default{
    signupUser(data) {
        return axios.post('http://localhost:3000/api/users/signup', data)
    },
    signinUser(data) {
        return axios.post('http://localhost:3000/api/users/login', data)
    }
}