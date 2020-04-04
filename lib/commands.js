const { readPasswords, writePasswords, writeDB } = require("./passwords");
const { encrypt, decrypt, hashPassword } = require("./crypto");

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
    passwords[key] = encryptedValue;
    writePasswords(passwords);
  } catch (err) {
    console.error(err);
  }
}

function unset(key) {
  console.log("Called UNSET", key);
  try {
    const passwords = readPasswords();
    delete passwords[key];
    writePasswords(passwords);
  } catch (err) {
    console.error(err);
  }
}

function reset(masterPassword) {
  const db = {
    masterPassword: hashPassword(masterPassword),
    passwords: {},
  };

  writeDB(db);
  console.log("Reseted database with new master password");
}

function changeMasterPassword(newMasterPassword) {
  const passwords = readPasswords();
  const passwordKeys = Object.keys(passwords);

  const passwordsDecrypted = {};
  passwordKeys.forEach((passwordKey) => {
    const value = passwords[passwordKey];
    passwordsDecrypted[passwordKey] = decrypt(value);
  });

  const db = {
    masterPassword: hashPassword(newMasterPassword),
    passwords: passwords,
  };
  writeDB(db);

  const passwordsEncrypted = {};
  passwordKeys.forEach((passwordKey) => {
    const value = passwordsDecrypted[passwordKey];
    passwordsEncrypted[passwordKey] = encrypt(value);
  });

  writePasswords(passwordsEncrypted);
}

exports.get = get;
exports.set = set;
exports.unset = unset;
exports.reset = reset;
exports.changeMasterPassword = changeMasterPassword;
