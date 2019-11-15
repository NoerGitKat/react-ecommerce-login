import { useState, useEffect } from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import axios from 'axios';
import catchErrors from './../utils/catchErrors';
import baseUrl from './../utils/baseUrl';
import handleAuth from './../utils/auth';

const INITIAL_NEW_USER = {
	name: '',
	email: '',
	password: '',
};

function Signup() {
	const [newUser, setNewUser] = useState(INITIAL_NEW_USER);
	const [isDisabled, setIsDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const isNotEmptyUser = Object.values(newUser).every(value => Boolean(value));

		if (isNotEmptyUser) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [newUser]);

	const handleChange = e => {
		const { name, value } = e.target;

		setNewUser(prevState => ({
			...prevState,
			[name]: value,
		}));

		setErrorMessage('');
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			setIsLoading(true);

			// Make request to server
			const url = `${baseUrl}/api/signup`;
			const payload = { ...newUser };
			const token = await axios.post(url, payload);
			handleAuth(token.data);
			setErrorMessage('');
		} catch (err) {
			// display error
			console.error('ERROR! The form submission failed:', err);
			setIsLoading(false);
			catchErrors(err, setErrorMessage);
		}
	};

	return (
		<>
			<Message attached icon="settings" header="Get Started!" content="Create a new account" color="teal" />
			<Form loading={isLoading} error={Boolean(errorMessage)} onSubmit={handleSubmit}>
				<Message error header="Oops!" content={errorMessage} />
				<Message success icon="check" header="Success!" content="You have successfully created an account!" />
				<Segment>
					<Form.Input
						fluid
						icon="user"
						iconPosition="left"
						label="Name"
						autoComplete="on"
						placeholder="Name"
						onChange={handleChange}
						value={newUser.name}
						name="name"
					/>
					<Form.Input
						fluid
						icon="envelope"
						iconPosition="left"
						label="Email"
						autoComplete="on"
						placeholder="Email"
						onChange={handleChange}
						value={newUser.email}
						type="email"
						name="email"
					/>
					<Form.Input
						fluid
						icon="lock"
						iconPosition="left"
						label="Password"
						autoComplete="on"
						placeholder="Password"
						onChange={handleChange}
						value={newUser.password}
						type="password"
						name="password"
					/>
					<Button disabled={isDisabled} icon="signup" type="submit" color="orange" content="Signup" />
				</Segment>
			</Form>
			<Message attached="bottom" warning>
				<Icon name="help" />
				Existing user?{' '}
				<Link href="/login">
					<a>Log in</a>
				</Link>{' '}
				here!
			</Message>
		</>
	);
}

export default Signup;
