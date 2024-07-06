import { ContactsCollection } from "../db/models/Contacts.js";

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const getContact = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

