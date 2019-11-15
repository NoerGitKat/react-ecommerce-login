import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

// Util
import showProgressBar from "./../../utils/showProgressBar";

function Header() {
  const router = useRouter();

  // Shows progress bar
  showProgressBar();

  // Temp user
  const user = false;

  // Check current path for active state
  function pathIsActive(pathname) {
    return pathname === router.pathname;
  }

  return (
    <Menu fluid id="menu" inverted stackable>
      <Container text>
        <Link href="/">
          <Menu.Item header active={pathIsActive("/")}>
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ marginRight: "1em" }}
            />{" "}
            React Online Shop
          </Menu.Item>
        </Link>
        <Link href="/cart">
          <Menu.Item header active={pathIsActive("/cart")}>
            <Icon name="cart" style={{ marginRight: "1em" }} /> Cart
          </Menu.Item>
        </Link>
        {user ? (
          <>
            <Link href="/create">
              <Menu.Item header active={pathIsActive("/create")}>
                <Icon name="add square" style={{ marginRight: "1em" }} /> Create
              </Menu.Item>
            </Link>
            <Link href="/account">
              <Menu.Item header active={pathIsActive("/account")}>
                <Icon name="user" size="large" style={{ marginRight: "1em" }} />{" "}
                Account
              </Menu.Item>
            </Link>
            <Menu.Item header>
              <Icon
                name="sign out"
                size="large"
                style={{ marginRight: "1em" }}
              />{" "}
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/login">
              <Menu.Item header active={pathIsActive("/login")}>
                <Icon
                  name="sign in"
                  size="large"
                  style={{ marginRight: "1em" }}
                />{" "}
                Login
              </Menu.Item>
            </Link>
            <Link href="/signup">
              <Menu.Item header active={pathIsActive("/signup")}>
                <Icon
                  name="signup"
                  size="large"
                  style={{ marginRight: "1em" }}
                />{" "}
                Signup
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  );
}

export default Header;
