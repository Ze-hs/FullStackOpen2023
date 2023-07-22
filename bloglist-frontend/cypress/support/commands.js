// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', `${Cypress.env('BACKEND')}/api/login`, {
		username,
		password
	}).then(({ body }) => {
		localStorage.setItem('loggedUser', JSON.stringify(body));
	});
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
	cy.request({
		url: `${Cypress.env('BACKEND')}/api/blogs`,
		method: 'POST',
		body: { title, author, url, likes },
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem('loggedUser')).token
			}`
		}
	});
});

Cypress.Commands.add('createUser', ({ name, password, username }) => {
	// Making a new user
	const user = {
		name,
		password,
		username
	};

	cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user);
});

Cypress.Commands.add('resetDB', ({ name, password, username }) => {
	cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`);

	// Making a new user
	const user = {
		name,
		password,
		username
	};

	cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, user);
});
