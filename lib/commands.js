const { readPasswords, writePasswords } = require("./passwords");
const { encrypt, decrypt } = require("./crypto");

function get(key) {
  console.log("Called GET", key);
  try {
    const passwords = readPasswords();
    const encryptedPassword = passwords[key];
    const password = decrypt(encryptedPassword);
    console.log(key, password);
  } catch (err) {
    console.error(err);
  }
}

function set(key, value) {
  console.log("Called SET", key, value);
  try {
    const passwords = readPasswords();
    const encryptedValue = encrypt(value);
    passwords.passwords[key] = encryptedValue;
    writePasswords(passwords);
  } catch (err) {
    console.error(err);
  }
}

function unset(key) {
  console.log("Called UNSET", key);
  try {
    const passwords = readPasswords();
    delete passwords.passwords[key];
    writePasswords(passwords);
  } catch (err) {
    console.error(err);
  }
}

exports.get = get;
exports.set = set;
exports.unset = unset;
