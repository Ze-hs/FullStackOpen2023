const Login = ({
	handleLogin,
	username,
	password,
	setUsername,
	setPassword,
}) => {
	return (
		<form onSubmit={handleLogin}>
			<div>
				<label>username</label>
				<input
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>

				<br />

				<label>password</label>
				<input
					type="password"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>

			<button type="submit">Log in</button>
		</form>
	);
};

export default Login;
