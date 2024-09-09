import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Post } from '@/app/models/post';
import PostList from '@/app/components/post-list';

global.fetch = jest.fn();

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Title Post 1',
    body: 'This is a title post body post 1.',
    userId: 1,
  },
  {
    id: 2,
    title: 'Title Post 2',
    body: 'This is a title post body post 2.',
    userId: 1,
  },
];

beforeEach(() => {
  (fetch as jest.Mock).mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockPosts),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Post List page', () => {
  test('renders list of posts', async () => {
    const jsx = await PostList();
    render(jsx);

    await waitFor(() => {
      expect(screen.getByText('Title Post 1')).toBeInTheDocument();
      expect(screen.getByText('This is a title post body post 1.')).toBeInTheDocument();

      expect(screen.getByText('Title Post 2')).toBeInTheDocument();
      expect(screen.getByText('This is a title post body post 2.')).toBeInTheDocument();
    });
  });

  test('handles fetch error', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve([]),
      })
    );

    const jsx = await PostList();
    render(jsx);

    await waitFor(() => {
      expect(screen.queryByText('Title Post 1')).toBeNull();
      expect(screen.queryByText('Title Post 2')).toBeNull();
    });
  });
});
