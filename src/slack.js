import { WebClient } from '@slack/client';
import SlackUpload from 'node-slack-upload';
import fs from 'fs';
const token = process.env.SLACK_TOKEN;
const emailChannelId = process.env.EMAIL_CHANNEL_ID;

const web = new WebClient(token); // Basic slack client
const slack = new SlackUpload(token); // Better slack client for uploading things

export function sendMessage(text) {
  return web.chat.postMessage({
    channel: emailChannelId,
    text
  });
}

const asyncUpload = (options) => {
  return new Promise((resolve, reject) =>
    slack.uploadFile(options, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    })
  )
}

export function sendEmail(subject, from, text) {
  return asyncUpload({
    content: text,
    filetype: 'txt',
    title: `Email`,
    initialComment: `Email from "${from}" about "${subject}"`,
    channels: emailChannelId
  });
};

export function sendFile(fileName, filetype, filePath) {
  return asyncUpload({
    file: fs.createReadStream(filePath),
    filetype,
    title: fileName,
    channels: emailChannelId
  });
}