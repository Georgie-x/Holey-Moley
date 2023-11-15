import axios from "axios";

const showAPI = axios.create({
    baseURL: 'https://holey-moley.onrender.com'
})

export function getShowCharacters() {
    return showAPI.get('/7/cast')
}


export function getAllShows() {
    return showAPI.get('/api/shows');
}





export function loginNewUser(username) {
    return showAPI.post(`/api/users`, { username: username, logged_in: true })

}
export function loginUser(username) {
    return showAPI.patch(`/api/users/${username}`, username)
}

export function getChars(show_id, numOfChars) {
    return axios.get(`/api/characters/${show_id}/${numOfChars}`)
}




