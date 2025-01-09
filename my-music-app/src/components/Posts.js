import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: '', // Remplace par un ID utilisateur valide
  });
  const [error, setError] = useState(null);

  // Charger toutes les publications
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/posts');
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      } else {
        setError(data.message || 'Failed to fetch posts');
      }
    } catch (err) {
      setError('An error occurred while fetching posts');
    }
  };

  // Créer une nouvelle publication
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const newPost = await response.json();
      if (response.ok) {
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setFormData({ title: '', body: '', userId: '' }); // Réinitialiser le formulaire
      } else {
        setError(newPost.message || 'Failed to create post');
      }
    } catch (err) {
      setError('An error occurred while creating the post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Formulaire pour ajouter une publication */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="block border p-2 mb-2 w-full"
          required
        />
        <textarea
          placeholder="Body"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          className="block border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="User ID"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          className="block border p-2 mb-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Post
        </button>
      </form>

      {/* Liste des publications */}
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="border p-4 mb-2">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.body}</p>
              <p className="text-gray-500">
                <strong>User ID:</strong> {post.userId ? post.userId._id : 'N/A'}
              </p>
            </div>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
