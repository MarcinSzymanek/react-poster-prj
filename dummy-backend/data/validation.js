/**
 * Check whether or not the email exists in the array of objects provided
 * @param {string} email to check against the array
 * @param {array(user)} array of users, containing the email key
 * @returns {boolean} true if email exists in the database
 */
function checkEmailRegistered(email, users) {
  let result = false;
  users.forEach((element) => {
    if (element.email === email) {
      result = true;
      return;
    }
  });
  return result;
}

/**
 * Simple validation function for matching emails
 * This does not match every possible email address and more importantly, does not check whether the email exists
 * It is, however good to catch some common errors
 * @param {string} email Email to validate
 * @returns {boolean} true if the email is valid (consists of chars followed by @ followed by more chars)
 */
function emailIsValid(email) {
  return email.toLowerCase().match(/^\S+@\S+$/);
}

// Check https://stackoverflow.com/questions/18057962/regex-pattern-including-all-special-characters
// For useful patterns for special characters

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} status - true if validation was succesful
 * @property {string} message -  a message describing why the result was unsuccesful, or an empty string
 */
/**
 * @function passwordIsValid - Checks whether a password is valid (8 chars, a lowercase and uppercase letter, a special character)
 * @param {string} password
 */
function passwordIsValid(password) {
  let result = { status: true, message: "" };
  if (password.length < 8) {
    result.status = false;
    result.message += "Password too short. ";
  }
  // Match one Uppercase letter
  if (!password.match(/[A-Z]/)) {
    result.status = false;
    result.message += "Password must contain a capital letter. ";
  }
  // Match one Lowercase letter
  if (!password.match(/[a-z]/)) {
    result.status = false;
    result.message += "Password must contain a lowercase letter. ";
  }
  // Match one Number
  if (!password.match(/[0-9]/)) {
    result.status = false;
    result.message += "Password must contain a number. ";
  }
  // Match a special character
  if (!password.match(/[!-\/:-@[-`{-~]/)) {
    result.status = false;
    result.message += "Password must contain a special character. ";
  }
  return result;
}

function validateSignupData(data) {
  console.log("Validate data:");
  console.log(data);
  if (data == null) return false;
  const required = ["email", "username", "password"];
  for (const key of required) {
    if (!Object.hasOwn(data, key)) {
      console.log("Missing key: " + key);
      return false;
    }
  }

  console.log("Values: ");
  console.log(Object.values(data));
  if (Object.values(data).includes(null)) return false;

  return true;
}

exports.emailIsValid = emailIsValid;
exports.passwordIsValid = passwordIsValid;
exports.checkEmailRegistered = checkEmailRegistered;
exports.validateSignupData = validateSignupData;
