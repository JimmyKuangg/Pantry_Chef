import axios from "axios";

export const fetchPantry = pantryId => {
    return axios.get(`/api/pantries/${pantryId}`)
}

export const createPantry = pantry => {
    return axios.post('/api/pantries', pantry)
}

export const editPantry = pantry => {
    return axios.patch(`/api/pantries/update/${pantry.id}`, pantry)
}