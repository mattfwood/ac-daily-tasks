const postmark = require('postmark');

const mailClient = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

export default mailClient;

// client.sendEmail(
//   {
//     From: "igor@example.com",
//     To: "chris@example.com",
//     Subject: "Hello from Postmark!",
//     HtmlBody: "Hello message body."
//   }
// ).then(response => {
//   console.log("Sending message");
//   console.log(response.To);
//   console.log(response.Message);
// });
