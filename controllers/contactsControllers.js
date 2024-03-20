import {
  getContactsService,
  createContactService,
  deleteContactService,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const contacts = await getContactsService(owner);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const owner = req.user._id;
    const deletedContact = await deleteContactService({ _id, owner });
    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }
    res.json(deletedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const newContact = await createContactService({ ...req.body, owner });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};
