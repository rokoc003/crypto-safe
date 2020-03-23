const { readPasswords, writePasswords } = require("./lib/passwords");

const [command, key, value] = process.argv.slice(2);

function get() {
  console.log("Called GET", key);
  try {
    const passwords = readPasswords();
    console.log(passwords[key]);
  } catch (err) {
    console.error(err);
  }
}

function set() {
  console.log("Called SET", key, value);
  try {
    const passwords = readPasswords();
    passwords[key] = value;
    writePasswords();
  } catch (err) {
    console.error(err);
  }
}

function unset() {
  console.log("Called UNSET", key);
  try {
    const passwords = readPasswords();
    delete passwords[key];
    writePasswords();
  } catch (err) {
    console.error(err);
  }
}

if (command === "get") {
  get();
} else if (command === "set") {
  set();
} else if (command === "unset") {
  unset();
} else {
  console.error("Unknown command");
}
