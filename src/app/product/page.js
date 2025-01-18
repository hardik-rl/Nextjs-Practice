"use client";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function Product() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [editingPost, setEditingPost] = useState(null);

  // Fetch posts
  const fetchPosts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);
    const postsData = await response.json();
    setPosts(postsData);
  };

  // Add a new post
  const addPost = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    const addedPost = await response.json();
    setPosts((prevPosts) => [...prevPosts, addedPost]);
    setNewPost({ title: '', content: '' }); // Reset form
  };

  // Edit a post
  const editPost = (post) => {
    setEditingPost(post);
    setNewPost({ title: post.title, content: post.content });
  };

  // Save edited post
  const saveEdit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${editingPost.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    const updatedPost = await response.json();
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setNewPost({ title: '', content: '' }); // Reset form
    setEditingPost(null);
  };

  // Delete a post
  const deletePost = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Product Page</h1>

      <form onSubmit={editingPost ? saveEdit : addPost}>
        <div>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            required
            margin="normal"
          />

        </div>
        <div>
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            required
            margin="normal"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          {editingPost ? 'Save Changes' : 'Add Product'}
        </Button>
      </form>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => editPost(post)}
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                <button onClick={() => editPost(post)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
