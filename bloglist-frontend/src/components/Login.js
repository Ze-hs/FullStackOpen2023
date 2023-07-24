import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/userAuthReducer';
import { useField } from '../hooks';
import { useNavigate } from 'react-router-dom';

import { Button, TextField } from '@mui/material';

import Notification from './Notification';

const Login = () => {
	const dispatch = useDispatch();
	const username = useField('text');
	const password = useField('password');
	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		dispatch(logIn(username.value, password.value));
		navigate('/');
	};

	return (
		<>
			<h2>log in to application</h2>
			<Notification />
			<form onSubmit={handleLogin}>
				<div>
					<TextField label="username" id={'username'} {...username} />
					<br />
					<TextField label="password" id={'password'} {...password} />
				</div>

				<Button id={'login'} type={'submit'}>
					Log in
				</Button>
			</form>
		</>
	);
};

export default Login;
