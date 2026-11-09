import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function Home() {
  // Fetch all posts from Supabase database
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Cloud Blog</h1>
        <Link 
          href="/create" 
          style={{ padding: '0.5rem 1rem', background: '#0070f3', color: 'white', borderRadius: '4px', textDecoration: 'none' }}
        >
          Create Post
        </Link>
      </div>
      
      <h2 style={{ marginTop: '1.5rem', fontSize: '1.2rem', color: '#555' }}>Latest Blog Posts</h2>
      
      <hr style={{ margin: '1rem 0' }} />

      {posts && posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {posts?.map((post) => (
            <div key={post.id} style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '1rem' }}>
              {/* Clickable Title pointing to dynamic slug page */}
              <Link href={`/posts/${post.slug}`} style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0070f3', textDecoration: 'none' }}>
                {post.title}
              </Link>
              <p style={{ marginTop: '0.5rem', color: '#333' }}>
                {post.content || post.markdown}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}