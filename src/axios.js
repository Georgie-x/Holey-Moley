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