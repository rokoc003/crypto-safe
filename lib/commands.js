const { readPasswords, writePasswords } = require("./lib/passwords");

function get(key) {
  console.log("Called GET", key);
  try {
    const passwords = readPasswords();
    console.log(passwords[key]);
  } catch (err) {
    console.error(err);
  }
}

function set(key, value) {
  console.log("Called SET", key, value);
  try {
    const passwords = readPasswords();
    passwords[key] = value;
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
