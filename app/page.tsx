import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // <-- Ithu thaan antha prerender error-a fix pannum!

export default async function Home() {
  const { data: posts, error } = await supabase.from('posts').select('*');
  const typedPosts = (posts || []) as any[];

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>My Cloud Blog</h1>
        <Link 
          href="/create" 
          style={{ background: '#0070f3', color: '#fff', padding: '0.5rem 1rem', borderRadius: '5px', textDecoration: 'none' }}
        >
          Create Post
        </Link>
      </div>

      <h2>Latest Blog Posts</h2>
      {error && <p style={{ color: 'red' }}>Error loading posts: {error.message}</p>}
      
      <div style={{ marginTop: '1rem' }}>
        {typedPosts.length === 0 ? (
          <p>No posts found. Create your first post!</p>
        ) : (
          typedPosts.map((post: any) => (
            <div key={post.id} style={{ border: '1px solid #eaeaea', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <h3>
                <Link href={`/posts/${post.slug}`} style={{ color: '#0070f3', textDecoration: 'none' }}>
                  {post.title}
                </Link>
              </h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Slug: {post.slug}</p>
              <p style={{ marginTop: '0.5rem' }}>{post.content || post.markdown}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}