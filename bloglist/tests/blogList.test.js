const list_helper = require('../utils/list_helper');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = list_helper.manyBlogs.map((blog) => new Blog(blog));
	const promiseArr = blogObjects.map((blogObj) => blogObj.save());

	await Promise.all(promiseArr);
});

describe('Supertest: Getting blogs from DB', () => {
	test('Retrieve correct amount of blogs', async () => {
		const response = await api.get('/api/blogs');

		expect(response.body.length).toBe(list_helper.manyBlogs.length);
	});

	test('Blogs have the id property', async () => {
		const response = await api.get('/api/blogs');

		response.body.forEach((blog) => {
			expect(blog.id).toBeDefined();
		});
	});

	test('Sucessfully posting a new blog', async () => {
		const response = await api
			.post('/api/blogs')
			.send(list_helper.listWithOneBlog[0]);

		const blogMatch = { ...list_helper.listWithOneBlog[0] };
		blogMatch.id = blogMatch._id;
		delete blogMatch.__v;
		delete blogMatch._id;

		expect(response.status).toBe(201);
		expect(response.body).toEqual(blogMatch);

		const blogList = await api.get('/api/blogs');

		expect(blogList.body.length).toBe(list_helper.manyBlogs.length + 1);
	});

	test('Likes property is defaulted to 0 if missing', async () => {
		const response = await api
			.post('/api/blogs')
			.send(list_helper.listWithoutLikes[0]);

		expect(response.body.likes).toBe(0);
	});

	test('Return bad request if missing title or url', async () => {
		await api
			.post('/api/blogs')
			.send(list_helper.listWithoutTitle[0])
			.expect(400);

		await api
			.post('/api/blogs')
			.send(list_helper.listWithoutTitle[0])
			.expect(400);
	});

	test('Deleting a blog', async () => {
		const deleteNote = list_helper.manyBlogs[0];
		await api.delete(`/api/blogs/${deleteNote._id}`).expect(204);

		const response = await api.get('/api/blogs');

		expect(response.body.length).toBe(list_helper.manyBlogs.length - 1);
	});

	test('Updating a blog', async () => {
		const updateNote = list_helper.manyBlogs[0];
		const response = await api
			.put(`/api/blogs/${updateNote._id}`)
			.send({ likes: 999 });

		expect(response.body.likes).toBe(999);
	});

	test('dummy', async () => {
		await Blog.deleteMany({});
		await User.deleteMany({});
	});
});
