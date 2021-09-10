import axios from "axios";

export default{
    signupUser(data) {
        return axios.post('http://localhost:3000/api/users/signup', data)
    },
    signinUser(data) {
        return axios.post('http://localhost:3000/api/users/login', data)
    },
    myProfile() {
        return axios.get("http://127.0.0.1:3000/api/users/profils/" + localStorage.getItem("userId"),{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
    },
    myProfilePicture(data) {
        return axios.put("http://127.0.0.1:3000/api/users/profils/" + localStorage.getItem("userId"), { headers:{ "Authorization": "Bearer " + localStorage.getItem("token")} }, data)
    }
}