const fetch = require("node-fetch");

exports.handler = async (event) => {

  const CHANNEL_ACCESS_TOKEN = "your-channel-access-token";

  try {
    const response = await fetch("https://api.line.me/v2/bot/audienceGroup/list", {
        headers: {
          Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        },
    });
    return response.json();
  } catch (e) {
    return e;
  }
};
