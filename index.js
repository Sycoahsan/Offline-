const tid = '10057259187701524'; // yaha pr group ki id likho
let RAFAQATID = 100087954695395; // yha owner id
let MSGMS = 3000; // yaha pr message send krne ka time likhna ka kitny time bad msg send ho 1000 = 1 second
const login = require("priyanshu-fca");
const fs = require("fs");
const g = require('gradient-string');
console.log(g.rainbow(`██████╗  █████╗ ███████╗ █████╗  ██████╗  █████╗ ████████╗
██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
██████╔╝███████║█████╗  ███████║██║   ██║███████║   ██║   
██╔══██╗██╔══██║██╔══╝  ██╔══██║██║▄▄ ██║██╔══██║   ██║   
██║  ██║██║  ██║██║     ██║  ██║╚██████╔╝██║  ██║   ██║   
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝ ╚══▀▀═╝ ╚═╝  ╚═╝   ╚═╝   
                                                          `));
process.removeAllListeners('warning')
login({ appState: JSON.parse(fs.readFileSync('account.json', 'utf8')) }, (err, api) => {
  if (err) return console.error(err);
  process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  console.log("Logged in successfully! Reading messages...");

  let messages = fs.readFileSync('msgs.txt', 'utf8').split(/\r?\n/).filter(msg => msg.trim() !== "");
  let index = 0;

  function sendNextMessage() {
    if (messages.length === 0) {
      console.log("No messages found in msgs.txt!");
      return;
    }

    api.sendMessage(messages[index], tid);
    console.log(`Message sent: ${messages[index]}`);

    index = (index + 1) % messages.length;

    setTimeout(sendNextMessage, MSGMS);
  }

  setTimeout(sendNextMessage, 6000);
});