import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavorite) {
    contactsQuery.where('isFavorite').equals(filter.isFavorite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calcPaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ userId, _id: contactId });
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = ContactsCollection.create({ ...payload, userId });
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = ContactsCollection.findOneAndDelete({ _id: contactId, userId });
  return contact;
};

export const updateContact = async (contactId, userId, payload) => {
  if (!userId) return;

  const result = await ContactsCollection.findOneAndUpdate({ userId, _id: contactId }, payload, {
    new: true,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  return {
    contact: result.value,
  };
};
