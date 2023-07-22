const Login = ({
	handleLogin,
	username,
	password,
	setUsername,
	setPassword
}) => {
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
