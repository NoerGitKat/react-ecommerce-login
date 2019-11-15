import cookie from "js-cookie";
import Router from "next/router";

// Client-side utility
const handleAuth = token => {
  // Set cookie in client
  cookie.set("authToken", token);
  // Then push user to /account
  Router.push("/account");
};

// Server-side utility
export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export default handleAuth;
