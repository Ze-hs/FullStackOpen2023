const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
	const result = listHelper.dummy();
	expect(result).toBe(1);
});

describe('total likes', () => {
	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listHelper.listWithOneBlog);
		expect(result).toBe(5);
	});
});

describe('favourite blog', () => {
	test('Find most liked blog among many', () => {
		const result = listHelper.favouriteBlog(listHelper.manyBlogs);
		expect(result).toEqual({
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		});
	});
});

describe('Most blog', () => {
	test('Find the author with the most blogs', () => {
		const result = listHelper.mostBlogs(listHelper.manyBlogs);
		expect(result).toEqual({
			author: 'Robert C. Martin',
			blogs: 3
		});
	});
});

describe('Most likes', () => {
	test('Find the author with the most likes', () => {
		const result = listHelper.mostLikes(listHelper.manyBlogs);
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17
		});
	});
});
