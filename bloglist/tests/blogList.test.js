const list_helper = require('../utils/list_helper');
const testData = require('../tests/testData');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

describe('Supertest: Getting blogs from DB', () => {
	let header;
	let user;
	beforeEach(async () => {
		await Blog.deleteMany({});
		await User.deleteMany({});

		//Create a new user
		await api.post('/api/users').send(testData.oneUser);

		//Create blogs as the new user
		user = await User.findOne({
			username: testData.oneUser.username
		});
		const blogObjects = list_helper.manyBlogs.map(
			(blog) => new Blog({ ...blog, user: user._id })
		);
		const promiseArr = blogObjects.map((blogObj) => blogObj.save());
		await Promise.all(promiseArr);

		// Getting the authorization token
		const login = await api.post('/api/login').send(testData.oneUser);
		header = {
			Authorization: `Bearer ${login.body.token}`
		};
	});

	test('Retrieve correct amount of blogs', async () => {
		const response = await api.get('/api/blogs').set(header);

		expect(response.body.length).toBe(list_helper.manyBlogs.length);
	});

	test('Blogs have the id property', async () => {
		const response = await api.get('/api/blogs').set(header);

		response.body.forEach((blog) => {
			expect(blog.id).toBeDefined();
		});
	});

	test('Sucessfully posting a new blog', async () => {
		const response = await api
			.post('/api/blogs')
			.set(header)
			.send(list_helper.listWithOneBlog[0]);

		const blogMatch = {
			...list_helper.listWithOneBlog[0],
			user: user._id.toString()
		};
		blogMatch.id = blogMatch._id;
		delete blogMatch.__v;
		delete blogMatch._id;

		expect(response.status).toBe(201);
		expect(response.body).toEqual(blogMatch);

		const blogList = await api.get('/api/blogs').set(header);

		expect(blogList.body.length).toBe(list_helper.manyBlogs.length + 1);
	});

	test('Likes property is defaulted to 0 if missing', async () => {
		const response = await api
			.post('/api/blogs')
			.set(header)
			.send(list_helper.listWithoutLikes[0]);

		expect(response.body.likes).toBe(0);
	});

	test('Return bad request if missing title or url', async () => {
		await api
			.post('/api/blogs')
			.set(header)
			.send(list_helper.listWithoutTitle[0])
			.expect(400);

		await api
			.post('/api/blogs')
			.set(header)
			.send(list_helper.listWithoutTitle[0])
			.expect(400);
	});

	test('Deleting a blog', async () => {
		const deleteNote = list_helper.manyBlogs[0];
		await api
			.delete(`/api/blogs/${deleteNote._id}`)
			.set(header)
			.expect(204);

		const response = await api.get('/api/blogs').set(header);

		expect(response.body.length).toBe(list_helper.manyBlogs.length - 1);
	}, 10000);

	test('Updating a blog', async () => {
		const updateNote = list_helper.manyBlogs[0];
		const response = await api
			.put(`/api/blogs/${updateNote._id}`)
			.set(header)
			.send({ likes: 999 });

		expect(response.body.likes).toBe(999);
	});

	test('test11', async () => 1);
});
