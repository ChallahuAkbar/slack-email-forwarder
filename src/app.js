import MailListener from 'mail-listener2-updated';
import { sendMessage } from './slack';


const mailListener = new MailListener({
  username: process.env.EMAIL_LOGIN,
  password: process.env.EMAIL_PASS, // We have to make sure that the server is secure!
  host: 'imap.gmail.com', // THIS WILL BE GMAIL
  port: 993, // imap port // MAKE THIS GMAIL
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: console.log, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  // searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});


mailListener.start(); // start listening

// stop listening
//mailListener.stop();

mailListener.on("server:connected", function(){
  sendMessage('connected');
  console.log("imapConnected");
});

mailListener.on("server:disconnected", function(){
  sendMessage('disconnected');
  console.log("imapDisconnected");
});

mailListener.on("error", function(err){
  sendMessage('error');
  console.log(err);
});

mailListener.on("mail", function (mail, seqno, attributes) { // SEE https://nodemailer.com/extras/mailparser/
  // do something with mail object including attachments
  console.log("emailParsed", mail);

  // POST TO SLACK!
  // See: https://api.slack.com/methods/chat.postMessage
  sendMessage(mail.text);

  // mail processing code goes here
});

mailListener.on("attachment", function(attachment){
  console.log(attachment.path);
});

// it's possible to access imap object from node-imap library for performing additional actions. E.x.
// mailListener.imap.move(:msguids, :mailboxes, function(){})