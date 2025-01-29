"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import apiCall from "@/api/ApiCalling";

const ProductList = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  const fetchPosts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);
    const postsData = await response.json();
    setPosts(postsData);
  };

  const handleOpenModal = () => {
    setFormData({ title: "", content: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", content: "" });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add product");

      const newProduct = await response.json();
      setPosts((prevPosts) => [newProduct, ...prevPosts]);
      handleCloseModal();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };

  const deletePost = async () => {
    if (!deleteId) return;

    await apiCall(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${deleteId}`, {
      method: "DELETE",
    });

    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deleteId));
    setDeleteId(null);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Box display={"flex"} marginBottom={4} justifyContent="space-between" alignItems={"center"}>
        <h1>Product List</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
        >
          Add New Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
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
                    onClick={() => router.push(`/product/${post.id}`)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setDeleteId(post.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddProduct}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              margin="normal"
            />
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleCloseModal} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={deletePost} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
