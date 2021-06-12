const loginModel = require('../models/loginModel');

let ERR_MESSAGE = 'All fields must be filled';

const validateEmail = (email) => {
  if (!email) {
    throw new Error(ERR_MESSAGE);
  }
  if (email) {
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email)) {
      throw new Error(ERR_MESSAGE);
    }
  }
};

const validatePassword = (password) => {
  if (!password || password.length <= 5) {
    ERR_MESSAGE = 'All fields must be filled';
    throw new Error(ERR_MESSAGE);
  }
};

const checkingEmailExists = async (email) => {
  const account = await loginModel.getByEmail(email);
  if (!account) {
    ERR_MESSAGE = 'Incorrect username or password';
    throw new Error(ERR_MESSAGE);
  }
};

const validations = async (email, password) => {
  validateEmail(email);
  validatePassword(password);
  await checkingEmailExists(email);
  const user = await loginModel.getByEmail(email);
  return user;
};

module.exports = {
  validations,
};