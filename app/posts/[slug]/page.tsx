import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 16-ku params-a await pannanum
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    return (
      <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2>Post not found</h2>
        <Link href="/">← Back to Home</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Link href="/">← Back to Home</Link>
      <h1 style={{ marginTop: '1rem' }}>{post.title}</h1>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Slug: {post.slug}</p>
      <hr style={{ margin: '1rem 0' }} />
      <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
        {post.content || post.markdown}
      </div>
    </main>
  );
}