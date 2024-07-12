import createHttpError from 'http-errors';
import { createContact, getAllContacts, getContactById } from '../services/contacts.js';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      msg: 'Contacts found',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
  }
    res.status(200).json({
      status: 200,
        msg: `Successfully found contact with id ${contactId}!`,
        data:contact,
    });
};

export const createContactController = async (req, res, next) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        msg: 'Contact was created',
        data: contact,
    });
};

