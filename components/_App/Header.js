import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';

function Header() {
  // Temp user
  const user = false;

  return (
    <Menu fluid={true} id="menu" inverted={true}>
      <Container text>
        <Link href="/">
          <Menu.Item header>
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ marginRight: '1em' }}
            />{' '}
            ReactReserve
          </Menu.Item>
        </Link>
        <Link href="/cart">
          <Menu.Item header>
            <Icon name="cart" style={{ marginRight: '1em' }} /> Cart
          </Menu.Item>
        </Link>
        {user ? (
          <>
            <Link href="/create">
              <Menu.Item header>
                <Icon name="add square" style={{ marginRight: '1em' }} /> Create
              </Menu.Item>
            </Link>
            <Link href="/account">
              <Menu.Item header>
                <Icon name="user" size="large" style={{ marginRight: '1em' }} />{' '}
                Account
              </Menu.Item>
            </Link>
            <Menu.Item header>
              <Icon
                name="sign out"
                size="large"
                style={{ marginRight: '1em' }}
              />{' '}
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/login">
              <Menu.Item header>
                <Icon
                  name="sign in"
                  size="large"
                  style={{ marginRight: '1em' }}
                />{' '}
                Login
              </Menu.Item>
            </Link>
            <Link href="/signup">
              <Menu.Item header>
                <Icon
                  name="signup"
                  size="large"
                  style={{ marginRight: '1em' }}
                />{' '}
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
