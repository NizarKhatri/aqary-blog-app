import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Comment } from '@/app/models/comment';
import { Post } from '@/app/models/post';
import PostDetails from '@/app/components/post-detail';

global.fetch = jest.fn();

const mockPost: Post = {
  id: 1,
  title: 'Post Title 1',
  body: 'This is the body of the post 1.',
  userId: 1,
};

const mockComments: Comment[] = [
  {
    id: 1,
    name: 'Nizar 1',
    email: 'nizar@test.com',
    body: 'This is a nizar comment.',
    postId: 1,
  },
  {
    id: 2,
    name: 'Nizar 2',
    email: 'nizar2@test.com',
    body: 'This is nizar2 comment.',
    postId: 1,
  },
];

beforeEach(() => {
  (fetch as jest.Mock).mockImplementation((url: string) => {
    if (url.includes('/comments')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockComments),
      });
    } else {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPost),
      });
    }
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Post Details page', () => {
  test('renders post details and comments', async () => {
    const params = { id: '1' };
    const jsx = await PostDetails({ params });
    render(jsx);

    await waitFor(() => {
      expect(screen.getByText('Post Title 1')).toBeInTheDocument();
      expect(screen.getByText('This is the body of the post 1.')).toBeInTheDocument();

      expect(screen.getByText('Nizar 1')).toBeInTheDocument();
      expect(screen.getByText('nizar@test.com')).toBeInTheDocument();
      expect(screen.getByText('This is a nizar comment.')).toBeInTheDocument();

      expect(screen.getByText('Nizar 2')).toBeInTheDocument();
      expect(screen.getByText('nizar2@test.com')).toBeInTheDocument();
      expect(screen.getByText('This is nizar2 comment.')).toBeInTheDocument();
    });
  });

  test('handles fetch error', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    const params = { id: '1' };
    const jsx = await PostDetails({ params });
    render(jsx);

    await waitFor(() => {
      expect(screen.getByText('Error: Unable to fetch post details.')).toBeInTheDocument();
    });
  });
});
