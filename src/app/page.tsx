import PostList from './components/post-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts List',
};
export default function Home() {
  return <PostList />;
}
