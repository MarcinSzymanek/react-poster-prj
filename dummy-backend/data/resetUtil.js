const fs = require("node:fs/promises");

const pathPrefix = "./db/";

async function resetPosts() {
  console.log("Resetting posts to default");
  const rawFileContent = await fs.readFile("./db/defaultPosts.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  console.log("Default data: ");
  console.log(data);
  return await fs.writeFile(
    "../posts.json",
    JSON.stringify({ posts: data.posts || [] })
  );
}

async function resetUsers() {
  const rawFileContent = await fs.readFile("./db/defaultUsers.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  console.log("Default data: ");
  console.log(data);
  return await fs.writeFile(
    "../db/users.json",
    JSON.stringify({ posts: data.posts || [] })
  );
}

async function createFreshUsers(filename) {
  return await fs.writeFile(
    pathPrefix + filename,
    JSON.stringify({ users: [] })
  );
}

exports.createFreshUsers = createFreshUsers;
// resetPosts();
