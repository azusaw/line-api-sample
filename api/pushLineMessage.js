const line = require('@line/bot-sdk');

exports.handler = async (event) => {

    const client = new line.Client({
      channelAccessToken: 'your-channel-access-token'
    });

    const message = {
      type: 'text',
      text: `${event.message}};

    await client.pushMessage(event.userId, message)
      .then(() => {
        console.log('send message')
      })
      .catch((err) => {
        console.log('error: ', err)
      });

};
