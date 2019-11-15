import cookie from "js-cookie";
import Router from "next/router";

const handleAuth = token => {
  // Set cookie in client
  cookie.set("authToken", token);
  // Then push user to /account
  Router.push("/account");
};

export default handleAuth;
