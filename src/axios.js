import axios from "axios";

const showAPI = axios.create({
    baseURL: 'https://api.tvmaze.com/shows'
})

export function getShowCharacters() {
    return showAPI.get('/7/cast')
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