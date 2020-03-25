const { get, set, unset, reset } = require("./lib/commands");
const { askForPassword, askForMasterPassword } = require("./lib/questions");
const { readMasterPassword } = require("./lib/passwords");
const { verifyHash } = require("./lib/crypto");
const { connect, close } = require("./lib/db");

const [command, key] = process.argv.slice(2);

async function run() {
  try {
    await connect();
    const answeredMasterPassword = await askForMasterPassword();
    if (command === "reset") {
      return reset(answeredMasterPassword);
    }
    const masterPassword = readMasterPassword();

    if (!verifyHash(answeredMasterPassword, masterPassword)) {
      console.error("You have no access!");
      return;
    }

    if (command === "get") {
      get(key);
    } else if (command === "set") {
      const password = await askForPassword(key);
      set(key, password);
    } else if (command === "unset") {
      unset(key);
    } else {
      console.error("Unknown command");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await close();
  }
}
run();
