import PostDetails from '@/app/components/post-detail';

export default async function PostDetailsPage({ params }: { params: { id: string } }) {
  return <PostDetails params={params} />;
}
