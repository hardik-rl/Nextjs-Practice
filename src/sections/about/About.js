"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import apiCall from "@/api/ApiCalling";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";

const About = () => {
    const router = useRouter();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState({ products: [], total: 0 });
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setPage(0);
    };

    const fetchProducts = async () => {
        try {
            const offset = page * rowsPerPage;
            const query = searchQuery ? `search?q=${encodeURIComponent(searchQuery)}` : "";
            const products = await apiCall(
                `/products/${query}?limit=${rowsPerPage}&skip=${offset}`,
                "GET"
            );
            setData(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleEdit = async (id) => {
        // const products = await apiCall(
        //     `/products/${id}`,
        //     "PUT"
        // );
        router.push(`/about/${id}`);
        // Add your edit logic here
    };

    const handleDelete = async (id) => {
        console.log("Delete record with ID:", id);
        try {
            await apiCall(`/products/${id}`, "DELETE");
            fetchProducts(); // Refresh the data after deletion
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    React.useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [page, rowsPerPage, searchQuery]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    mb: 4,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h5">Stock Market</Typography>
                <TextField
                    id="search"
                    label="Search"
                    variant="standard"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search products"
                />
            </Box>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 420 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" style={{ fontWeight: 600 }}>
                                    Title
                                </TableCell>
                                <TableCell align="left" style={{ fontWeight: 600 }}>
                                    Description
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: 600 }}>
                                    Price
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: 600 }}>
                                    Rating
                                </TableCell>
                                <TableCell align="right" style={{ fontWeight: 600 }}>
                                    Quantity
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: 600 }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.products?.map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.rating}</TableCell>
                                    <TableCell align="right">{row.stock}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: "flex" }}>

                                            <IconButton color="info" onClick={() => handleEdit(row.id)} aria-label="edit">
                                                <VisibilityIcon />
                                            </IconButton>

                                            <IconButton color="error" onClick={() => handleDelete(row.id)} aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default About
