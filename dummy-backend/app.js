require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const { getStoredPosts, storePosts } = require("./data/posts");
const {
  emailIsValid,
  passwordIsValid,
  checkEmailRegistered,
  validateSignupData,
} = require("./data/validation");

const {
  getUser,
  getUsers,
  storeUsers,
  deleteUser,
} = require("./data/userData");

function delay(timeMs) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(), timeMs));
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use((req, res, next) => {
  console.log("Received request %s from %s : %s", req.method, req.host, req.ip);
  next();
});

app.get("/posts", async (req, res) => {
  const storedPosts = await getStoredPosts();
  console.log("Get posts");
  // await delay(3000);
  res.json({ posts: storedPosts });
});

app.get("/posts/:id", async (req, res) => {
  console.log("Get single with id: %s", req.params.id);
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post("/posts", async (req, res) => {
  console.log("Post posts");
  const existingPosts = await getStoredPosts();
  const lastId = existingPosts.length.toString();
  const postData = req.body;
  console.log("postdata: %s", postData);
  const newPost = {
    ...postData,
    id: lastId,
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: "Stored new post.", post: postData });
});

app.post("/signup", async (req, res) => {
  console.log("Post signup");
  const newUserData = req.body;

  if (!validateSignupData(newUserData)) {
    res.status(400).json({ message: "missing field", data: newUserData });
    return;
  }

  if (!emailIsValid(newUserData.email)) {
    res
      .status(400)
      .json({ message: "Invalid email", email: newUserData.email });
    return;
  }

  let passValid = passwordIsValid(newUserData.password);
  if (!passValid.status) {
    res
      .status(400)
      .json({ message: "Password validation error: " + passValid.message });
    return;
  }

  const users = await getUsers();

  if (checkEmailRegistered(newUserData.email, users)) {
    res
      .status(400)
      .json({ message: "Email already registered", email: newUserData.email });
    return;
  }

  let idUsername = newUserData.username.toLowerCase().replace(" ", "-");
  const newUserId = idUsername + users.length.toString();

  const newUser = {
    id: newUserId,
    username: newUserData.username,
    email: newUserData.email,
    password: newUserData.password,
  };

  const updatedUsers = [newUser, ...users];
  await storeUsers(updatedUsers);

  const token = jwt.sign(
    {
      id: newUserId,
      username: newUserData.username,
      email: newUserData.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res
    .status(201)
    .json({ message: "User registered succesfully.", token: token });
});

app.listen(process.env.PORT);
console.log("Listening at: localhost:%d/", process.env.PORT);
