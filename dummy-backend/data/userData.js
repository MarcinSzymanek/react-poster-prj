const fs = require("node:fs/promises");

const pathPrefix = "./db/";
let filename = pathPrefix + "users.json";

async function getUser(email) {
  const users = await getUsers();
  users.forEach((user) => {
    if (user.email === email) return user;
  });
  return null;
}

async function getUsers() {
  const rawFileContent = await fs.readFile(filename, { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const users = data.users;
  return users;
}

async function deleteUser(id) {
  const users = await getUsers();
  let index = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      index = i;
      break;
    }
  }

  if (index !== null) {
    users.splice(index, 1);
    storeUsers(users);
  }
}

function storeUsers(users) {
  return fs.writeFile(filename, JSON.stringify({ users: users || [] }));
}

// For testing with 'fresh' data
function setFilename(fname) {
  filename = pathPrefix + fname;
}

function getFilename() {
  return filename;
}

exports.getUser = getUser;
exports.getUsers = getUsers;
exports.storeUsers = storeUsers;
exports.deleteUser = deleteUser;
exports.setFilename = setFilename;
exports.getFilename = getFilename;
