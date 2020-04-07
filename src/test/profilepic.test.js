// profilepic.test.js

import React from 'react';
import ProfilePic from '../profile-pic';
import { render, fireEvent } from '@testing-library/react';

test('renders img with src set to url prop', () => {
    const { container } = render(<ProfilePic url='/someValue' />);
    expect(container.querySelector('img').getAttribute('src')).toBe(
        '/someValue'
    );
});

test('renders img with scr set to /default.jpg when no url prop is passed', () => {
    const { container } = render(<ProfilePic />);
    expect(container.querySelector('img').getAttribute('src')).toBe(
        '/default.jpg'
    );
});

test('renders first and last in the alt attribute', () => {
    const { container } = render(<ProfilePic first='Till' last='Grosch' />);
    expect(container.querySelector('img').getAttribute('alt')).toBe(
        'Till Grosch'
    );
});

test('onClick prop gets called when img is clicked', () => {
    const mockOnClick = jest.fn();
    const { container } = render(<ProfilePic onClick={mockOnClick} />);
    fireEvent.click(container.querySelector('img'));
    expect(mockOnClick.mock.calls.length).toBe(1);
});
