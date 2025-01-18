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
import { Box, TextField, Typography } from "@mui/material";
import apiCall from "@/api/ApiCalling";

export default function About() {
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
