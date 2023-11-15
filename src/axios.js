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





export function loginNewUser(username) {
    return showAPI.post(`/users/${username}`, username)

}
export function loginUser(username) {
    return showAPI.patch(`/users/${username}`, username)
}

export function getChars(show_id, numOfChars) {
    return axios.get(`/characters/${show_id}/${numOfChars}`)
}




