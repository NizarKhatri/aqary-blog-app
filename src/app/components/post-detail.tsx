import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Comment } from '../models/comment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts List',
};

async function fetchPostDetails(id: string) {
  try {
    const postRes = await fetch(`${process.env.BASE_URL}/posts/${id}`);
    if (!postRes.ok) throw new Error('Failed to fetch post');

    const post = await postRes.json();

    const commentsRes = await fetch(`${process.env.BASE_URL}/posts/${id}/comments`);
    if (!commentsRes.ok) throw new Error('Failed to fetch comments');

    const comments = await commentsRes.json();

    return { post, comments };
  } catch (error) {
    console.error('Error fetching post details:', error);
    return { post: null, comments: [] };
  }
}
export default async function PostDetails({ params }: { params: { id: string } }) {
  const { post, comments } = await fetchPostDetails(params.id);

  if (!post) {
    return <div>Error: Unable to fetch post details.</div>;
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="grid justify-center">
            <CardTitle className="group flex items-center gap-2 text-xl uppercase tracking-wide">
              Post Details
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-6 text-base">
          <div className="grid">
            <div className="font-semibold">Post Title</div>
            <div>{post.title}</div>

            <div className="font-semibold mt-4">Post Body</div>
            <div>{post.body}</div>

            <Separator className="my-4" />

            <div className="font-semibold mb-3">Post Comments</div>
            <ul className="grid gap-3">
              {comments.map((comment: Comment) => (
                <li key={comment.id} className="border p-3 rounded-md">
                  <div className="font-semibold">{comment.name}</div>
                  <p className="text-muted-foreground text-sm">{comment.email}</p>
                  <p className="mt-2">{comment.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
