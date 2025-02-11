"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { TextField, Button, Paper } from "@mui/material";

const ProductAddEdit = () => {
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const router = useRouter();
  const params = useParams();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    uploads: [],
    inTime: "",
    outTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${params.id}`);
        const product = await response.json();
        setFormData({
          title: product.title,
          content: product.content,
          uploads: product.uploads || [],
          inTime: product.inTime || "",
          outTime: product.outTime || "",
        });
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

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", data.title);
      form.append("content", data.content);
      form.append("inTime", data.inTime);
      form.append("outTime", data.outTime);

      let fileData = null;
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          fileData = reader.result;

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
                ...data,
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
      } else {
        const response = await fetch(`http://localhost:5000/posts/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("Product updated successfully!");
          router.push("/product");
        } else {
          alert("Failed to update the product.");
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
      <h1>Edit Product</h1>
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
              const inTime = watch("inTime"); // ✅ Watch inTime dynamically
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
