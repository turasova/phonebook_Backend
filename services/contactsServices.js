import Contact from "../db/models/Contact.js";

export const getContactsService = async (owner) => {
  const contacts = await Contact.find({ owner });
  return contacts;
};

export const createContactService = async (filter) => {
  const contact = await Contact.create(filter);
  return contact;
};

export const deleteContactService = async (filter) => {
  const deletedContact = await Contact.findOneAndDelete(filter);
  return deletedContact;
};
