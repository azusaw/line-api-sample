import React, { useEffect, useState } from "react"
import { useLocation } from "@reach/router"
import { Avatar } from "@material-ui/core"

const RedirectPage: React.FC = () => {
  const urlParams = useLocation().search
  const [state, setState] = useState<{
    userName: null | string
    userId: null | string
    picture: null | string
    isFriend: null | boolean
  }>({ userName: null, userId: null, picture: null, isFriend: false })
  const [tmpLineInfo, setTmpInfo] = useState<{
    idToken: null | string,
    accessToken: null | string
  }>({ idToken: "", accessToken: "" })

  const fetchResource = async () => {
    /* Get AccessToken and IDToken by code on redirect URL*/
    const method = "post"
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    }
    const obj1 = {
      grant_type: "authorization_code",
      code: new URLSearchParams(urlParams).get("code"),
      redirect_uri: "your-redirect-url,
      client_id: "your-client-id",
      client_secret: "your-client-secret",
    }

    var body = Object.keys(obj1)
      .map((key) => key + "=" + encodeURIComponent(obj1[key]))
      .join("&")

    await fetch("https://api.line.me/oauth2/v2.1/token", {
      method,
      headers,
      body,
    })
      .then((response) => response.json())
      .then((data) => {
        setTmpInfo({
          accessToken: data.access_token,
          idToken: data.id_token
      })
      .catch((e) => {
        console.error(e)
      })

    /* Get user info */
    await fetch("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${tmpLineInfo.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        /* Save local storage as a measure against reloading */
        localStorage.setItem("userName", data.displayName)
        localStorage.setItem("userId", data.userId)
        localStorage.setItem("picture", data.pictureUrl)
      })
      .catch((e) => {
        console.error(e)
      })

    /* Check user friend status */
    await fetch("https://api.line.me/friendship/v1/status", {
      headers: {
        Authorization: `Bearer ${tmpLineInfo.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("friend", data.friendFlag)
        setState({
          userName: localStorage.getItem("userName"),
          userId: localStorage.getItem("userId"),
          picture: localStorage.getItem("picture"),
          isFriend: localStorage.getItem("friend") == "true" ? true : false,
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    const code = new URLSearchParams(urlParams).get("code")
    /* Determine is LINE login from the URL */
    if (code) {
      if (
        !localStorage.getItem("userName") ||
        localStorage.getItem("userName") == "undefined" ||
        !localStorage.getItem("userId") ||
        localStorage.getItem("userId") == "undefined" ||
        !localStorage.getItem("picture") ||
        localStorage.getItem("picture") == "undefined" ||
        !localStorage.getItem("friend") ||
        localStorage.getItem("friend") == "undefined"
      ) {
        fetchResource()
      } else {
        setState({
          userName: localStorage.getItem("userName"),
          userId: localStorage.getItem("userId"),
          picture: localStorage.getItem("picture"),
          isFriend: localStorage.getItem("friend") == "true" ? true : false,
        })
      }
    } else {
      /* Delete local storage info if not LINE login */
      localStorage.removeItem("userName")
      localStorage.removeItem("userId")
      localStorage.removeItem("picture")
      localStorage.removeItem("friend")
    }
  }, [])

  return (
    <div>
      {state.picture && state.userName && (
        <div>
          {state.userName}({ state.isFriend ? "friend" : "notFriend" })
           <Avatar
             src={state.picture}
             style={{ margin: "1rem 3rem 0 0" }}
           />
        </div>
       )}
    </div>
  )
}

export default RedirectPage

