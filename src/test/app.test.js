import React from 'react';
import App from '../app';
import { render, waitForElement } from '@testing-library/react';

import axios from '../net/axios';
jest.mock('../net/axios'); // automatic jest mock

test('App shows nothing at first', async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: 'Till',
            last: 'Grosch',
            imgUrl: '/someValue',
            bio: 'Jest another Bio'
        }
    });
    const { container } = render(<App />);
    expect(container.children.length).toBe(6);
    await waitForElement(() => container.querySelector('div'));
    expect(container.children.length).toBe(6);
});
