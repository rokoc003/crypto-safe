const readline = require("readline");

function askQuestion(question, { hideAnswer }) {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readlineInterface.question(question, (answer) => {
      resolve(answer);
      readlineInterface.output.write("\n");
      readlineInterface.close();
    });
    if (hideAnswer) {
      readlineInterface._writeToOutput = function () {
        readlineInterface.output.write("");
      };
    }
  });
}
function askForPassword(key) {
  return askQuestion(`Enter password of ${key}: `);
}

function askForMasterPassword() {
  return askQuestion("Please enter master password: ", {
    hideAnswer: true,
  });
}

exports.askForPassword = askForPassword;
exports.askForMasterPassword = askForMasterPassword;
