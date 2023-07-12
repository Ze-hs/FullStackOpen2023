import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

const blog = {
	author: 'Some random',
	title: 'Component testing is done with react-testing-library',
	url: 'localhost',
	likes: 3,
	user: {
		name: 'root'
	}
};

const user = {
	name: 'root',
	username: 'rootuser'
};

test('Hidden blog renders title and author', () => {
	const { container } = render(<Blog blog={blog} user={user} />);

	const div = container.querySelector('.whenHidden');
	const url = container.querySelector('.url');
	const likesCounter = container.querySelector('.likesCounter');

	expect(div).toHaveTextContent(
		'Component testing is done with react-testing-library Some random'
	);
	expect(url).not.toBeVisible();
	expect(likesCounter).not.toBeVisible();
});

test('Details are shown when the detail button is clicked', async () => {
	const { container } = render(<Blog blog={blog} user={user} />);

	// Simulate a click on the details button
	const userClick = userEvent.setup();
	const button = container.querySelector('.detailsBtn');
	await userClick.click(button);

	//Getting elements
	const url = container.querySelector('.url');
	const likesCounter = container.querySelector('.likesCounter');

	expect(url).toBeVisible();
	expect(likesCounter).toBeVisible();
});

test('Function to add likes is called correct amount of times', async () => {
	const mockHandler = jest.fn();

	const { container } = render(
		<Blog blog={blog} user={user} handleLikes={mockHandler} />
	);

	const button = container.querySelector('.likesCounter button');

	//Simulate  Clicking the like button twice
	const agent = userEvent.setup();
	await agent.click(button);
	await agent.click(button);

	expect(mockHandler.mock.calls).toHaveLength(2);
});
