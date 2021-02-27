import React, { useState } from "react"

type LineInfo = {
  userName: string
  userId: string
  picture: string
  isFriend: boolean
}

type Audience = {
  [key: string]: boolean
}

const Example = () => {
  /* If you want to create access token(JWT Token) by your self, don't define */
  const CHANNEL_ACCESS_TOKEN = "your-access-token"
  
  const SendMessage = async (message: string, lineInfo: LineInfo) => {
    /* attention: It is channel access token, NOT user accsess token */
    const formData = {
      chanelAccessToken: CHANNEL_ACCESS_TOKEN,
      userId: lineInfo.userId,
      userName: lineInfo.userName,
    }
    fetch(
      "https://hogehoge.execute-api.ap-your-region.amazonaws.com/default/pushLineMessage",
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
    .then((response) => {
      console.log("success")
    })
    .catch((e) => {
      console.error(e)
    })
  }

  
  const SendNarrowMessage = async (message: string, audienceList: Audience[]) => {
    const formData = {
      audience: audienceList,
      messages: messages,
    }
    fetch(
      "https://hogehoge.execute-api.ap-your-region.amazonaws.com/default/pushLineNarrowMessage",
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        console.log("success")
      })
      .catch((e) => {
        console.error(e)
      })
  }
}
