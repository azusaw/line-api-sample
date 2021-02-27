const fetch = require("node-fetch");

exports.handler = async (event) => {

  /* Assemble the body of the specified Audience */
  var audienceBody = []
  for(var key in event.audience) {
    if (event.audience[key] == true) {
      audienceBody.push({"type": "audience", "audienceGroupId": key})
    }
  }
  console.log(audienceBody)
  

  const CHANNEL_ACCESS_TOKEN = "your-channel-access-token";
  var method = "post";
  const headers = {
    Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    "Content-Type": "application/json"
  };
  const body = JSON.stringify({
    "messages": [
      {
        "type": "text",
        "text": event.messages,
      },
    ],
    "recipient": {
      "type": "operator",
      "or": audienceBody
    }
    });

  await fetch("https://api.line.me/v2/bot/message/narrowcast", {
    method,
    headers,
    body,
  })
    .then((response) => response.json())
    .catch((e) => {
      console.error(e);
    });

};
