import App from "next/app";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { redirectUser } from "./../utils/auth";
import baseUrl from "./../utils/baseUrl";
import Layout from "./../components/_App/Layout";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { authToken } = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Check if current user has token
    if (!authToken) {
      const isProtectedRoute =
        ctx.pathname === "/account" || ctx.pathname === "/create";

      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      try {
        // Get user account data with token
        const endpoint = `${baseUrl}/api/account`;
        const payload = { headers: { authorization: authToken } };
        const response = await axios.get(endpoint, payload);
        const user = response.data;

        // Add user to every page
        pageProps.user = user;
        // Check user role, if only "user" then prohibit redirect from /create
        const isRoot = user.role === "root";
        const isAdmin = user.role === "admin";

        const isNotAuthorized =
          !(isRoot || isAdmin) && ctx.pathname === "/create";

        if (isNotAuthorized) {
          redirectUser(ctx, "/");
        }
      } catch (err) {
        console.log(`Server error! ${err}`);
        // 1. Remove invalid token
        destroyCookie(ctx, "authToken");
        // 2. Redirect user to /login
        redirectUser(ctx, "/login");
      }
    }

    return { pageProps };
  }

  componentDidMount() {
    window.addEventListener("storage", this.syncLogout);
  }

  syncLogout = event => {
    if (event.key === "logout") {
      Router.push("/login");
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
