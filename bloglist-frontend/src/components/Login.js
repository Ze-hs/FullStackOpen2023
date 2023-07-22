import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/userReducer';

const Login = ({ username, password, setUsername, setPassword }) => {
	const dispatch = useDispatch();

	const handleLogin = async (event) => {
		event.preventDefault();
		dispatch(logIn(username, password));
	};

	return (
		<form onSubmit={handleLogin}>
			<div>
				<label>username</label>
				<input
					id={'username'}
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>

				<br />

				<label>password</label>
				<input
					id={'password'}
					type={'password'}
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>

			<button id={'login'} type={'submit'}>
				Log in
			</button>
		</form>
	);
};

export default Login;
