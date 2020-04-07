import React from 'react';
import BioEditor from '../bio-editor';
import { render, fireEvent, waitFor, getByText } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import axios from '../net/axios';

jest.mock('../net/axios'); // automatic jest mock

// test(`When no bio is passed to BioEditor, an "add your bio" button is rendered.`, () => {
//     const { container } = render(<BioEditor />);
//     expect(container.querySelectorAll('button')[0].innerHTML).toBe(
//         'add your bio'
//     );
// });

// test(`When bio is passed to BioEditor, an "Edit" button is rendered.`, () => {
//     const { container } = render(<BioEditor bio='Jest another Bio.' />);
//     expect(container.querySelectorAll('button')[0].innerHTML).toBe('edit');
// });

// test(`Clicking the "Add" button causes a textarea and a "Save" button to be rendered.`, async () => {
//     const { container, findByText, findByLabelText } = render(<BioEditor />);

//     fireEvent.click(container.querySelector('button'));
//     const bioTextarea = await findByLabelText('Bio:');
//     const saveButton = await findByText('save');
//     expect(bioTextarea).toBeInTheDocument();
//     expect(saveButton).toBeInTheDocument();
// });

test(`Clicking the "Edit" button causes a textarea and a "Save" button to be rendered.`, async () => {
    const { container, findByText, findByPlaceholderText } = render(
        <BioEditor bio='Jest another Bio.' />
    );

    fireEvent.click(container.querySelector('button'));
    const bioTextarea = await findByPlaceholderText('Once upon a time...');
    const saveButton = await findByText('save');
    expect(bioTextarea).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
});

// test(`Clicking the "Save" button causes an ajax request.`, async () => {
//     const mockOnClick = jest.fn();
//     axios.post.mockResolvedValue({
//         data: { bio: 'Jest another Bio.' }
//     });
//     const { container, getByText, findByText } = render(
//         <BioEditor bio='Jest another Bio.' updateProfile={mockOnClick} />
//     );
//     fireEvent.click(getByText('edit'));
//     const saveButton = await findByText('save');
//     fireEvent.click(saveButton);
//     // await waitFor(() => screen.getByRole('heading'))
//     const newBio = await findByText('Jest another Bio.');
//     expect(axios.post).toHaveBeenCalledTimes(1);
//     expect(newBio).toHaveTextContent('Jest another Bio.');
// });

// test(`When the mock request is successful, the function that was passed as a
// prop to the component gets called.`, () => {});
