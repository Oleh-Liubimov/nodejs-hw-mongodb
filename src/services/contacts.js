import createHttpError from "http-errors";
import { ContactsCollection } from "../db/models/contact.js";

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const contact = ContactsCollection.create(payload);
    return contact;
};

