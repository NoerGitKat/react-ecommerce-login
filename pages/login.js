import { useState, useEffect } from "react";
import { Button, Segment, Form, Icon, Message } from "semantic-ui-react";
import catchErrors from "./../utils/catchErrors";
import Link from "next/link";

const INITIAL_USER = {
  email: "",
  password: ""
};

function Login() {
  const [user, setUser] = useState(INITIAL_USER);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if values of user are empty
    const userValues = Object.values(user);
    const isNotEmpty = userValues.every(value => Boolean(value));

    if (isNotEmpty) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;

    setUser(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErrorMessage("");
      // Make request to server
    } catch (error) {
      setIsLoading(false);
      catchErrors(error, setErrorMessage);
    }
  };

  return (
    <>
      <Message
        attached
        icon="settings"
        color="blue"
        header="Welcome back!"
        content="Fill in your details to login"
      />
      <Form
        loading={isLoading}
        error={Boolean(errorMessage)}
        onSubmit={handleSubmit}
      >
        <Message error header="Oops!" content={errorMessage} />
        <Segment>
          <Form.Input
            fluid
            autoComplete="on"
            icon="envelope"
            iconPosition="left"
            label="Email"
            onChange={handleChange}
            value={user.email}
            placeholder="Email"
            type="email"
            name="email"
          />
          <Form.Input
            fluid
            autoComplete="on"
            icon="lock"
            iconPosition="left"
            label="Password"
            onChange={handleChange}
            value={user.password}
            placeholder="Password"
            type="password"
            name="password"
          />

          <Button
            disabled={isDisabled || isLoading}
            icon="sign in"
            type="submit"
            name="submit"
            color="orange"
            content="Login!"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Don't have an account yet?{" "}
        <Link href="/signup">
          <a>Sign up</a>
        </Link>{" "}
        for an account!
      </Message>
    </>
  );
}

export default Login;
