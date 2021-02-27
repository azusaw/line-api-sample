import React, { useState } from "react"

type Audience = {
  id: string
  name: string
  audienceCount: Number
}

const Example = () => {
  const [audienceList, setAudienceList] = useState<Audience[]>([])

  const SendNarrowMessaget = async () => {
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


  const getAudienceList = async () => {
    await fetch(
      "https://hogehoge.execute-api.ap-your-region.amazonaws.com/default/getLineAudienceList",
       { headers: { "Content-Type": "application/json" } }
     )
     .then((response) => response.json())
     .then((data) => {
       var tmpAudienceList = []
       for (var key in data.audienceGroups) {
         tmpAudienceList.push({
           name: data.audienceGroups[key].description,
           id: data.audienceGroups[key].audienceGroupId,
           audienceCount: data.audienceGroups[key].audienceCount,
         })
       }
       setAudienceList(tmpAudienceList)
     })
     .catch((e) => {
       console.error(e)
     })
  }
}
