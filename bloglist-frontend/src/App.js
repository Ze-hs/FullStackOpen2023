import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import loginService from './services/login';
import blogService from './services/blogs';
import Logout from './components/Logout';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		if (user) {
			blogService.getAll().then((blogs) => setBlogs(blogs));
		}
	}, [refresh, user]);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser');
		if (loggedUserJSON) {
			const loggedUser = JSON.parse(loggedUserJSON);
			setUser(loggedUser);
			blogService.setToken(loggedUser.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
		} catch (error) {
			setErrorMessage(error.message);
		}
		//Reset fields
		setUsername('');
		setPassword('');
	};

	const handleLogOut = () => {
		window.localStorage.clear();
		blogService.setToken(null);
		setUser(null);
	};

	const handleLikes = async (id, data) => {
		const response = await blogService.update(id, data);
		refreshBlog();
		return response.data;
	};

	const handleDelete = async (id) => {
		const response = await blogService.remove(id);
		refreshBlog();
		return response.data;
	};
	const setErrorMessage = (message) => {
		setMessage(message);
		setTimeout(() => setMessage(null), 5000);
	};

	const refreshBlog = () => {
		setRefresh(!refresh);
	};

	if (user === null) {
		return (
			<div>
				<h2>log in to application</h2>
				<Notification message={message} />
				<Login
					username={username}
					password={password}
					setPassword={setPassword}
					setUsername={setUsername}
					handleLogin={handleLogin}
				/>
			</div>
		);
	}

	return (
		<div>
			<h2>blogs</h2>
			<p>{user.name} logged in</p>
			<Logout handleLogOut={handleLogOut} />
			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					handleLikes={handleLikes}
					handleDelete={handleDelete}
					user={user}
				/>
			))}

			<Toggleable>
				<BlogForm
					setBlogs={setBlogs}
					blogs={blogs}
					setMessage={setMessage}
					user={user}
				/>
			</Toggleable>
		</div>
	);
};

export default App;
