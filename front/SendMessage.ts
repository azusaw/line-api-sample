import React, { useState } from "react"

const Example = () => {
  const SendNarrowMessage = async () => {
    const formData = {
      audience: checkedAudienceList,
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
