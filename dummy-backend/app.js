const express = require('express');
const bodyParser = require('body-parser');

const { getStoredPosts, storePosts } = require('./data/posts');

function delay(timeMs) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(), timeMs))
}
const app = express();

// app.set("trust proxy", true)

app.use(bodyParser.json());


app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use((req, res, next) => {
  console.log("Received request %s from %s : %s", req.method, req.host, req.ip);
  next();
} )

app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  console.log("Get posts");
  // await delay(3000);
  res.json({ posts: storedPosts });
});

app.get('/posts/:id', async (req, res) => {
  console.log("Get single with id: %s", req.params.id)
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post('/posts', async (req, res) => {
  console.log("Post posts");
  const existingPosts = await getStoredPosts();
  const lastId = existingPosts.length.toString()
  const postData = req.body
  console.log("postdata: %s", postData)
  const newPost = {
    ...postData,
    id: lastId
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: postData });
});

app.listen(8080);
console.log("Listening at: localhost:8080/")
