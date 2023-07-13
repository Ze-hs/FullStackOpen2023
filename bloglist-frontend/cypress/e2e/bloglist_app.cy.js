describe('Bloglist App', () => {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`);

		// Making a new user
		const user = {
			name: 'John Smith',
			password: 'userpass',
			username: 'user'
		};

		cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user);
		cy.visit('');
	});

	it('Shows the login page by default', () => {
		cy.contains('log in to application');
	});

	it('Login fails with wrong credentials', () => {
		cy.get('#username').type('wronguser');
		cy.get('#password').type('wronguserpass');
		cy.contains('Log in').click();

		cy.contains('log in to application');
		cy.get('.error').should('contain', 'Wrong Credentials');
	});

	it('Login succeds with right credentials', () => {
		cy.get('#username').type('user');
		cy.get('#password').type('userpass');
		cy.contains('Log in').click();
		cy.contains('John Smith logged in');
	});
});

describe.only('When Logged in', function () {
	beforeEach(function () {
		cy.resetDB({
			name: 'John Smith',
			password: 'userpass',
			username: 'user'
		});
		cy.login({ username: 'user', password: 'userpass' });
		cy.createBlog({
			title: 'Dog vs Cat',
			author: 'CatLover69',
			url: 'https://google.ca'
		});

		cy.visit('');
	});

	it('A blog can be created', function () {
		cy.contains('Add new blog').click();

		cy.get('#title').type('React vs Angular');
		cy.get('#author').type('Dave Vendisel');
		cy.get('#url').type('https:googe.com');

		cy.get('#create').click();
		cy.contains('React vs Angular Dave Vendisel');
	});

	it('User can like a blog', function () {
		cy.contains('view').click();
		cy.contains('like').click();

		cy.get('.likesCounter').should('contain', 'likes 1');
	});

	it('Creators can delete blogs', function () {
		cy.contains('view').click();
		cy.contains('Delete').click();

		cy.get('html').should('not.contain', 'Dog vs Cat');
	});

	it('Only Creators can delete blogs', function () {
		cy.contains('log out').click();
		cy.createUser({
			name: 'Amanda Crew',
			password: '123456',
			username: 'aman'
		});

		cy.get('#username').type('aman');
		cy.get('#password').type('123456');
		cy.contains('Log in').click();

		cy.contains('view').click();
		cy.get('html').should('not.contain', 'delete');
	});

	it.only('Blogs are ordered', function () {
		cy.createBlog({
			title: 'Most Liked',
			author: 'CatLover69',
			url: 'https://google.ca',
			likes: 3
		});

		cy.createBlog({
			title: 'Second Most Liked',
			author: 'CatLover69',
			url: 'https://google.ca',
			likes: 2
		});

		cy.createBlog({
			title: 'Third Most Liked',
			author: 'CatLover69',
			url: 'https://google.ca',
			likes: 1
		});

		cy.visit('');

		cy.get('.blog').eq(0).should('contain', 'Most Liked');

		//Changing likes and then reordering automatically
		cy.contains('Second Most Liked').contains('view').click();

		cy.contains('div:visible', 'Second Most Liked')
			.contains('button', 'like')
			.as('likeButton');

		cy.get('@likeButton').click();
		cy.contains('div:visible', 'Second Most Liked').should(
			'contain',
			'likes 3'
		);
		cy.get('@likeButton').click();
		cy.contains('div:visible', 'Second Most Liked').should(
			'contain',
			'likes 4'
		);

		cy.visit('');
		cy.get('.blog').eq(0).should('contain', 'Second Most Liked');
	});
});
