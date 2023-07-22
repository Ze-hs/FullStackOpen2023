import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
// import loginService from './services/login';y
// import blogService from './services/blogs';
import Logout from './components/Logout';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';

// import { setNotification } from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';

const App = () => {
	const dispatch = useDispatch();

	const blogs = useSelector((state) => state.blogs);
	const user = useSelector((state) => state.user);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		dispatch(initializeUser());
		dispatch(initializeBlogs());
	}, []);

	if (user === null) {
		return (
			<div>
				<h2>log in to application</h2>
				<Notification />
				<Login
					username={username}
					password={password}
					setPassword={setPassword}
					setUsername={setUsername}
				/>
			</div>
		);
	}

	return (
		<div>
			<h2>blogs</h2>
			<p>{user.name} logged in</p>
			<Logout />
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}

			<Toggleable>
				<BlogForm />
			</Toggleable>
		</div>
	);
};

export default App;
