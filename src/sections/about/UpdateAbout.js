"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import apiCall from "@/api/ApiCalling";

const UpdateAbout = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    quantity: "",
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await apiCall(`/products/${id}`);
        setFormData({
          title: response.title || "",
          description: response.description || "",
          price: response.price || "",
          rating: response.rating || "",
          quantity: response.quantity || "",
        });
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await apiCall(`/products/${id}`, "PUT", formData);
      console.log("Form Data Submitted:", updatedProduct);
      router.push("/about");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
        Update Product Form
      </Typography>

      <Grid container spacing={2}>
        {/* Title Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>

        {/* Description Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
        </Grid>

        {/* Price Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            inputProps={{ step: "0.01" }}
          />
        </Grid>

        {/* Rating Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            inputProps={{ min: 0, max: 5, step: "0.1" }}
          />
        </Grid>

        {/* Quantity Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            required
            inputProps={{ min: 0 }}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UpdateAbout;
