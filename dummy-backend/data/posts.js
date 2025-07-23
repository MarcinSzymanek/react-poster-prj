const fs = require("node:fs/promises");

const pathPrefix = "./db/";
let filename = pathPrefix + "posts.json";

async function getStoredPosts() {
  const rawFileContent = await fs.readFile(filename, { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const storedPosts = data.posts ?? [];
  return storedPosts;
}

function storePosts(posts) {
  return fs.writeFile(filename, JSON.stringify({ posts: posts || [] }));
}

exports.getStoredPosts = getStoredPosts;
exports.storePosts = storePosts;
