const fs = require("node:fs/promises");

const filename = "users.json";

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
  const users = data.users ?? [];
  return users;
}

function storeUsers(users) {
  return fs.writeFile(filename, JSON.stringify({ users: users || [] }));
}

exports.getUser = getUser;
exports.getUsers = getUsers;
exports.storeUsers = storeUsers;
