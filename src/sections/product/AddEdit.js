"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { TextField, Button, Paper } from "@mui/material";

const ProductAddEdit = () => {
  const [formData, setFormData] = useState({ title: "", content: "", uploads: [] });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${params.id}`);
        const product = await response.json();
        setFormData({ title: product.title, content: product.content, uploads: product.uploads || [] });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (params?.id) fetchProduct();
  }, [params?.id]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("content", formData.content);

      // Convert file to base64 format
      let fileData = null;
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          fileData = reader.result;

          // Prepare payload to send to backend
          const payload = {
            fileName: file.name,
            fileType: file.type,
            fileData: fileData,
          };

          try {
            const response = await fetch(`http://localhost:5000/posts/${params.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...formData,
                fileData: payload,
              }),
            });

            if (response.ok) {
              alert("Product updated successfully!");
              router.push("/product");
            } else {
              alert("Failed to update the product.");
            }
          } catch (error) {
            console.error("Error updating product:", error);
            alert("An error occurred. Please try again.");
          }
        };
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
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
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
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Paper>
  );
};

export default ProductAddEdit;
