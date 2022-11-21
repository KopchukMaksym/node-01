const contacts = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const readList = async () => {
                const contactList = await contacts.listContacts();
                console.table(contactList);
            };
            readList();

            break;

        case "get":
            const getContact = async () => {
                const contact = await contacts.getContactById(id);
                console.log(contact);
            };
            getContact();

            break;

        case "add":
            const addNewContact = () => {
                contacts.addContact(name, email, phone);
                console.log(`Added new contact ${name}`);
            };
            addNewContact();
            break;

        case "remove":
            const deleteContact = () => {
                contacts.removeContact(id);
                console.log(`Deleted contact ${id}`);
            };
            deleteContact();
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);
