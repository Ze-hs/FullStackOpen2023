import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
	name: 'blog',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},

		addBlog(state, action) {
			return state.concat(action.payload);
		},

		deleteBlog(state, action) {
			const id = action.payload;
			console.log(id, typeof id);
			return state.filter((elem) => elem.id !== id);
		},

		addLikes(state, action) {
			const newBlog = action.payload;
			return state.map((blog) =>
				blog.id === newBlog.id ? newBlog : blog
			);
		}
	}
});

export const { setBlogs, addBlog, deleteBlog, addLikes } = blogSlice.actions;

// Pull the blogs from the mongo database and sorts them
export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogList = await blogService.getAll();
		const sortedBlog = blogList.sort((a, b) => b.likes - a.likes);
		dispatch(setBlogs(sortedBlog));
	};
};

export const createBlogs = (blog, user) => {
	return async (dispatch) => {
		const response = await blogService.create(blog);
		dispatch(addBlog({ ...response, user }));
	};
};

export const handleDelete = (id) => {
	return async (dispatch) => {
		await blogService.remove(id);
		dispatch(deleteBlog(id));
	};
};

export const handleLikes = (id, blog) => {
	return async (dispatch) => {
		const newBlog = await blogService.update(id, blog);
		dispatch(addLikes(newBlog));
	};
};

export default blogSlice.reducer;
