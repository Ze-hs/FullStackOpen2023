import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogReducer,
		user: userReducer
	}
});

store.subscribe(() => {
	console.log(store.getState());
});

export default store;
