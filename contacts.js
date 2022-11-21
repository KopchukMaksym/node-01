const fs = require("fs").promises;
const path = require("node:path");
const { isArrayBuffer } = require("util/types");

const contactsPath = path.join(process.cwd(), "/db/contacts.json");

function listContacts() {
    return fs
        .readFile(contactsPath)
        .then((data) => JSON.parse(data.toString()))
        .catch((err) => err.message);
}

function getContactById(contactId) {
    return fs
        .readFile(contactsPath)
        .then((data) => JSON.parse(data.toString()))
        .then((data) => data.filter((el) => el.id === contactId))
        .catch((err) => err.message);
}

async function addContact(name, email, phone) {
    const array = await listContacts();
    const id = array.length + 1;
    array.push({ id: `${id}`, name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(array));
}

async function removeContact(contactId) {
    const array = await listContacts();
    const index = array.filter((el) => el.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(index));
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};
