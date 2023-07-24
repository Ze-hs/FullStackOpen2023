import { useEffect } from 'react';

import Login from './components/Login';
import Logout from './components/Logout';

import User from './components/User';
import UserList from './components/UserList';
import BlogList from './components/BlogList';
import Blog from './components/Blog';

import { Routes, Route, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUserAuth } from './reducers/userAuthReducer';
import { initializeUsers } from './reducers/usersReducer';

const App = () => {
	const dispatch = useDispatch();

	// const blogs = useSelector((state) => state.blogs);
	const userAuth = useSelector((state) => state.userAuth);

	useEffect(() => {
		dispatch(initializeUserAuth());
		dispatch(initializeBlogs());
		dispatch(initializeUsers());
	}, []);

	if (!userAuth) {
		return <Login />;
	}

	return (
		<div>
			<div>
				<Link to="/">Blogs</Link>
				<Link to="/users">Users</Link>
				<span>{userAuth.name} logged in</span>
				<Logout />
			</div>

			<Routes>
				<Route path={'/'} element={<BlogList />} />
				<Route path={'/users'} element={<UserList />} />
				<Route path={'/users/:id'} element={<User />} />
				<Route path={'/blog/:id'} element={<Blog />} />
			</Routes>
		</div>
	);
};

export default App;
