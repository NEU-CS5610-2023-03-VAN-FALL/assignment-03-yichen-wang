import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Movies from '../components/Movies';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the fetch function to simulate server responses
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            results: [
                {
                    id: 1,
                    title: 'Test Movie',
                    overview: 'This is a test movie',
                    poster_path: '/test.jpg'
                }
            ],
            total_pages: 1
        }),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

test('renders Movies component', () => {
    render(<Router><Movies /></Router>);
    const linkElement = screen.getByText(/Popular Movies/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders movie cards when data is fetched', async () => {
    render(<Router><Movies /></Router>);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText('Test Movie')).toBeInTheDocument());
});

test('fetches movies when search query changes', async () => {
    render(<Router><Movies /></Router>);
    fireEvent.change(screen.getByPlaceholderText(/Search for movies/i), { target: { value: 'Test' } });
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
});