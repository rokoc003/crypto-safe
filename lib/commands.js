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
  const encryptedValue = encrypt(value);
  try {
    const passwords = readPasswords();
    passwords[key] = encryptedValue;
    writePasswords();
  } catch (err) {
    console.error(err);
  }
}

function unset(key) {
  console.log("Called UNSET", key);
  try {
    const passwords = readPasswords();
    delete passwords[key];
    writePasswords();
  } catch (err) {
    console.error(err);
  }
}

exports.get = get;
exports.set = set;
exports.unset = unset;
