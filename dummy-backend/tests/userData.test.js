const { createFreshUsers } = require("../data/resetUtil");
const {
  getUser,
  getUsers,
  storeUsers,
  deleteUser,
  setFilename,
  getFilename,
} = require("../data/userData");

// Setup test
const testUserData = {
  id: "testUser1-0",
  username: "testUser1",
  email: "test@gmail.com",
  password: "secretPass2@",
};

const defaultFilename = getFilename();
const freshDBFile = "testUsers.json";

beforeEach(() => {
  setFilename(freshDBFile);
  createFreshUsers(freshDBFile);
});

afterEach(() => {
  setFilename(defaultFilename);
});

test("Get users returns empty list", async () => {
  const users = await getUsers();
  expect(users.length).toBe(0);
});

test("Store new user -> get users contains new user", async () => {
  let users = await getUsers();
  const updatedUsers = [testUserData, ...users];
  await storeUsers(updatedUsers);
  users = await getUsers();
  expect(users).toContainEqual(testUserData);
});

test("Delete user removes test user", async () => {
  let users = await getUsers();
  expect(users).not.toContain(testUserData);
  expect(users.length).toBe(0);

  const updatedUsers = [testUserData, ...users];
  await storeUsers(updatedUsers);
  users = await getUsers();
  expect(users).toContainEqual(testUserData);
  expect(users.length).toBe(1);
  await deleteUser(testUserData.id);

  users = await getUsers();
  expect(users).not.toContain(testUserData);
  expect(users.length).toBe(0);
});

setFilename(defaultFilename);
