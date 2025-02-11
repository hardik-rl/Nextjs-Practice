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

const ProductList = () => {
  const formatTime = (time) => {
    if (!time) return "Not Set";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes}${period}`;
  };

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  const fetchPosts = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`);
    const postsData = await response.json();
    setPosts(postsData);
  };

  const handleOpenModal = () => {
    // setFormData({ title: "", content: "" });
    router.push("/product/new");
  };

  const deletePost = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.statusText}`);
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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
              <TableCell>Time</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  {post.inTime && post.outTime
                    ? `${formatTime(post.inTime)} - ${formatTime(post.outTime)}`
                    : "Not Set"}
                </TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell>

                  {post.fileData ? (
                    <img src={post.fileData.fileData} alt={post.title} style={{ width: 100, height: 100, objectFit: "cover" }} />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
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

      {/* Delete Confirmation Modal */}
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
