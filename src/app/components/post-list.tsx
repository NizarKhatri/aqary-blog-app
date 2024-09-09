import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Post } from '../models/post';
import Link from 'next/link';

export default async function PostList() {
  const res = await fetch(`${process.env.BASE_URL}/posts`);
  const posts: Post[] = await res.json();

  return (
    <Card>
      <CardHeader className="bg-muted/50">
        <div className="grid gap-0.5 justify-center">
          <CardTitle className="group flex items-center gap-2 text-xl uppercase tracking-wide">
            Posts List
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden font-bold font-lg sm:table-cell">Title & Body</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} className="cursor-pointer">
                <TableCell>
                  <Link href={`/posts/${post.id}`}>
                    <div className="font-medium text-lg">{post.title}</div>
                  </Link>
                  <div className="hidden text-base text-muted-foreground md:inline">
                    {post.body}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
