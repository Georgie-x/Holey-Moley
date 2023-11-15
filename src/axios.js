import axios from "axios";

const showAPI = axios.create({
    baseURL: 'https://holey-moley-be.onrender.com/api/'
})

export function getShowCharacters() {
    return showAPI.get('/7/cast')
}


export function getAllShows() {
    return showAPI.get('/shows');
}


const dbURL = `https://holey-moley.onrender.com`


function loginNewUser(username) {
    return axios.post(`${dbURL}/api/users/${username}`, username)

}
function loginUser (username) {
    return axios.patch(`${dbURL}/api/users/${username}`, username)
}

function getChars (show_id, numOfChars) {
    return axios.get(`${dbURL}/api/characters/${show_id}/${numOfChars}`)
}


export { loginNewUser, loginUser, getChars}

