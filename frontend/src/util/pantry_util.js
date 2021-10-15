import axios from "axios";

export const fetchPantry = () => {
    return axios.get(`/api/pantries`)
}

// export const createPantry = pantry => {
//     return axios.post('/api/pantries', pantry)
// }

export const editPantry = pantry => {
    return axios.patch(`/api/pantries/update`, pantry)
}