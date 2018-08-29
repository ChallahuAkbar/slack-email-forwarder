# slack-email-forwarder

This project forwards emails sent to the webteam@fairviewhs.org email to the #email channel in slack.

## How to Install for development

You need to install dependencies, do so by running `npm install`

Then you want to create `test-env.json` for login credentials. Here is the template, just fill in the login details:

```json
{
  "EMAIL_LOGIN": "most likely webteam@fairviewhs.org",
  "EMAIL_PASS": "the webteam@fairviewhs.org password",
  "SLACK_TOKEN": "the slack api token (you have to be a slack admin to get this)",
  "EMAIL_CHANNEL_ID": "the slack channel token"
}
```

Gulp is used only for development

To watch for file changes run `gulp watch`

Webpack is used only for production code

Check for scripts in the `package.json` or `gulpfile.js`