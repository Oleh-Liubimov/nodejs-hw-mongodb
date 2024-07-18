import { ContactsCollection } from '../db/models/contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getAllContacts = async ({page,perPage}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();


  const contacts = await contactsQuery.limit(limit).skip(skip).exec();

  const paginationData = calcPaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
};

export const updateContact = async (contactId, payload,) => {
  const result = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  console.log(result);

  if (!result || !result.value) return null;

  return {
    contact: result.value,
  };
};
