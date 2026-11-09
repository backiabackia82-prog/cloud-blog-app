'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        setError(error.message);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

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
      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>Error loading posts: {error}</p>}
      
      <div style={{ marginTop: '1rem' }}>
        {!loading && posts.length === 0 ? (
          <p>No posts found. Create your first post!</p>
        ) : (
          posts.map((post: any) => (
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