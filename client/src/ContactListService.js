import axios from 'axios';

const url = '/api/contact-list/';

class ContactListService {
    // Get Contact List
    static async getContactList() {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }
    // Create Contact or Attributes
    static insertContact(actionUrl, data) {
        return axios.post(`${url}${actionUrl}`, data);
    }
    // UpdateAttribute
    static updateAttribute(actionUrl, data) {
        return axios.put(`${url}${actionUrl}`, data);
    }
    // Delete Contact or Attributes
    static deleteContact(actionUrl, id) {
        return axios.delete(`${url}${actionUrl}${id}`);
    }
}
export default ContactListService;