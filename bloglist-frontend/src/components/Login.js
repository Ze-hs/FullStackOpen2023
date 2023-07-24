import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/userAuthReducer';
import { useField } from '../hooks';
import { useNavigate } from 'react-router-dom';

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
					<label>username</label>
					<input id={'username'} {...username} />

					<br />

					<label>password</label>
					<input id={'password'} {...password} />
				</div>

				<button id={'login'} type={'submit'}>
					Log in
				</button>
			</form>
		</>
	);
};

export default Login;
