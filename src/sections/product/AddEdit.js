"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { TextField, Button, Paper } from "@mui/material";

const ProductAddEdit = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const params = useParams();
  
  const isEditMode = !!params?.id;  

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${params.id}`);
          const product = await response.json();
          setValue("title", product.title);
          setValue("content", product.content);
          setValue("inTime", product.inTime || "");
          setValue("outTime", product.outTime || "");
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    }
  }, [isEditMode, params?.id, setValue]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => setPreview(reader.result);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const url = isEditMode
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${params.id}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;
      const method = isEditMode ? "PUT" : "POST";

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("inTime", data.inTime);
      formData.append("outTime", data.outTime);

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const payload = {
            fileName: file.name,
            fileType: file.type,
            fileData: reader.result,
          };

          const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, fileData: payload }),
          });

          if (response.ok) {
            alert(isEditMode ? "Product updated successfully!" : "Product added successfully!");
            router.push("/product");
          } else {
            alert("Failed to save the product.");
          }
        };
      } else {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert(isEditMode ? "Product updated successfully!" : "Product added successfully!");
          router.push("/product");
        } else {
          alert("Failed to save the product.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 4, margin: "auto", maxWidth: 600 }}>
      <h1>{isEditMode ? "Edit Product" : "Add Product"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
          margin="normal"
        />

        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          {...register("content", { required: "Content is required" })}
          error={!!errors.content}
          helperText={errors.content?.message}
          margin="normal"
        />

        {/* In Time Field */}
        <TextField
          fullWidth
          label="In Time"
          type="time"
          InputLabelProps={{ shrink: true }}
          {...register("inTime", { required: "In Time is required" })}
          error={!!errors.inTime}
          helperText={errors.inTime?.message}
          sx={{ mb: 2 }}
        />

        {/* Out Time Field */}
        <TextField
          fullWidth
          label="Out Time"
          type="time"
          InputLabelProps={{ shrink: true }}
          {...register("outTime", {
            required: "Out Time is required",
            validate: (value) => {
              const inTime = watch("inTime");
              if (inTime && value <= inTime) {
                return "Out Time must be after In Time";
              }
              return true;
            },
          })}
          error={!!errors.outTime}
          helperText={errors.outTime?.message}
          sx={{ mb: 2 }}
        />

        {/* File Upload */}
        <input type="file" onChange={handleFileChange} accept="image/*,video/*" />
        {preview && (
          <div>
            <p>Preview:</p>
            {file?.type?.startsWith("image/") ? (
              <img src={preview} alt="Preview" style={{ width: "200px" }} />
            ) : (
              <video src={preview} controls style={{ width: "200px" }} />
            )}
          </div>
        )}

        <Button variant="contained" color="primary" type="submit" disabled={loading} sx={{ marginTop: 2 }}>
          {loading ? "Saving..." : isEditMode ? "Save Changes" : "Add Product"}
        </Button>
      </form>
    </Paper>
  );
};

export default ProductAddEdit;
