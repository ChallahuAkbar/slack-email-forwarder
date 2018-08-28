import { WebClient } from '@slack/client';
const token = process.env.SLACK_TOKEN;
const emailChannelId = process.env.EMAIL_CHANNEL_ID;
const web = new WebClient(token);
export function sendMessage(text) {
  return web.chat.postMessage({
    channel: emailChannelId,
    text
  })
};