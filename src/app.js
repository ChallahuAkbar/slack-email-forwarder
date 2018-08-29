import MailListener from 'mail-listener2-updated';
import { sendMessage, sendFile, sendEmail, test } from './slack';
import fs from 'fs';

const deleteFile = path => valueFromPromise =>
  new Promise((resolve, reject) => 
    fs.unlink(path, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve(valueFromPromise);
    })
  );

const mailListener = new MailListener({
  username: process.env.EMAIL_LOGIN,
  password: process.env.EMAIL_PASS,
  host: 'imap.gmail.com',
  port: 993, // imap port
  tls: true, // Required for secure connection google
  connTimeout: 10000,
  authTimeout: 5000,
  debug: console.log,
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  // searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: false, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  // mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
  attachments: true, // download attachments as they are encountered to the project directory
  // attachmentOptions: { directory: "./attachments/" } // specify a download directory for attachments
});

mailListener.start();

mailListener.on("server:connected", () => {
  sendMessage('connected');
});

mailListener.on("server:disconnected", () => {
  sendMessage('disconnected');
});

mailListener.on("error", error => 
  sendMessage(`Error encountered: \n ${error}`)
);

mailListener.on("mail", mail => {
  sendEmail(mail.subject, mail.from[0].name, mail.text)
    .catch(error =>
      sendMessage(`Something went wrong sending an email: ${error}`)
    );
});

mailListener.on("attachment", attachment => {
  const { fileName, path } = attachment;
  const fileTypeArray = fileName.split('.');
  sendFile(fileName, fileTypeArray[fileTypeArray.length - 1], path)
    .then(deleteFile(path))
    .catch(error => 
      sendMessage(`Something went wrong uploading a file: ${error}`)
    );
});