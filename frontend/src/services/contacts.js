import axios from "axios"

const baseUrl = '/api/persons'

const getAll = () =>   {
    const promise = axios.get(baseUrl);
    return promise.then(response => response.data);
}

const addContact = (new_contact) =>   {
    const promise = axios.post(baseUrl, new_contact);
    return promise.then(response => response.data);
}

const removeContact = (id) =>   {
    const promise = axios.delete(`${baseUrl}/${id}`);
    return promise.then(response => response.data);
}

const updateContact = (id, contact) =>   {
    console.log("Updating contact", id, "with", contact)
    
    const promise = axios.put(`${baseUrl}/${id}`, contact);
    return promise.then(response => response.data);
}

export default {getAll, addContact, removeContact, updateContact}