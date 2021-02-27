import React from "react"

const Login: React.FC = () => {
  
  /* LINE settings */
  const clientId = "your-client-id"
  const redirectUrl = "your-redirect-target-url"
  const lineUrl =
    "https://access.line.me/oauth2/v2.1/authorize?response_type=code" +
    "&client_id=" +
    clientId +
    "&redirect_uri=" +
    redirectUrl +
    "&scope=profile%20openid%20email" +
    "&state=mbpj" +
    "&prompt=consent" +
    "&bot_prompt=aggressive"

  return (
    <a href={lineUrl}>
      {"Login"}        
    </a>
  )
}

export default Login
