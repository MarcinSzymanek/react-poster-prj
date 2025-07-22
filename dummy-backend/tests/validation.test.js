const {
  checkEmailRegistered,
  emailIsValid,
  passwordIsValid,
  validateSignupData,
} = require("../data/validation.js");

// Test basic email validation
test("Validate valid email is truthy", () => {
  const email = "test@gmail.com";
  expect(emailIsValid(email)).toBeTruthy();
});

test("Validate invalid email is falsy", () => {
  const email = "test@. gmail.com";
  expect(emailIsValid(email)).toBeFalsy();
});

test("Check existing email returns true", () => {
  const email = "test@gmail.com";
  const userList = [
    { username: "testUser1", password: "testPass2@", email: "test@gmail.com" },
  ];
  expect(checkEmailRegistered(email, userList)).toBe(true);
});

test("Check email exists on empty list returns false", () => {
  const email = "test@gmail.com";
  const list = [];
  expect(checkEmailRegistered(email, list)).toBe(false);
});

test("Validate Sign Up missing fields returns false", () => {
  let data = {
    username: "testUser1",
    email: "test@gmail.com",
  };
  expect(validateSignupData(data)).toBe(false);
  data = {
    email: "test@gmail.com",
    password: "secretPass2@",
  };
  expect(validateSignupData(data)).toBe(false);
  data = {
    username: "testUser1",
    password: "secretPass2@",
  };
  expect(validateSignupData(data)).toBe(false);
});

test("Validate Sign Up null fields returns false", () => {
  const data = {
    username: null,
    email: null,
    password: null,
  };
  expect(validateSignupData(data)).toBe(false);
  data.username = "testUser1";
  expect(validateSignupData(data)).toBe(false);
  data.email = "test@gmail.com";
  expect(validateSignupData(data)).toBe(false);
  data.password = "secretPass2@";
  data.username = null;
  expect(validateSignupData(data)).toBe(false);
});

test("Validate Sign Up valid data returns true", () => {
  const data = {
    username: "testUser1",
    email: "test@gmail.com",
    password: "secretPass2@",
  };

  expect(validateSignupData(data)).toBe(true);
});
