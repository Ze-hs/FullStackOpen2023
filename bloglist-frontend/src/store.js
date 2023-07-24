import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import userAuthReducer from './reducers/userAuthReducer';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/usersReducer';
import commentReducer from './reducers/commentReducer';

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogReducer,
		userAuth: userAuthReducer,
		users: usersReducer,
		comments: commentReducer
	}
});

store.subscribe(() => {
	console.log(store.getState());
});

export default store;
