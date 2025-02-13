"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import apiCall from "@/api/ApiCalling";

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
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();
  const componentRef = useRef();

  const fetchPosts = async () => {
    try {
      const response = await apiCall("/posts", "GET" );
        setPosts(response);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleOpenModal = () => {
    router.push("/product/new");
  };

  const deletePost = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${deleteId}`,
        { method: "DELETE" }
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
      <Box display="flex" marginBottom={4} justifyContent="space-between" alignItems="center">
        <h1>Product List</h1>
        <Box>
          <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginRight: 2 }}>
            Add New Product
          </Button>
          {/* <Button variant="contained" color="secondary" onClick={handlePrint}>
            View PDF
          </Button> */}
        </Box>
      </Box>
      <TableContainer component={Paper} ref={componentRef}>
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
                  <Button variant="outlined" color="primary" onClick={() => router.push(`/product/${post.id}`)} sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => setDeleteId(post.id)}>
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
